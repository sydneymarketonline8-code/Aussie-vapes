'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin-auth'

const BUCKET = 'product-images'

function safeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export async function uploadProductImage(productId: string, formData: FormData) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, error: 'No file provided' }
  }
  if (file.size > 10 * 1024 * 1024) {
    return { ok: false as const, error: 'Image must be 10 MB or smaller' }
  }

  const supabase = await createSupabaseServerClient()
  const path = `${productId}/${Date.now()}-${safeName(file.name)}`
  const { error: upError } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (upError) {
    console.error('[uploadProductImage] storage upload failed', upError)
    return { ok: false as const, error: upError.message }
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
  const publicUrl = pub.publicUrl

  // Append to the end of the position order
  const { data: existing } = await supabase
    .from('product_images')
    .select('position')
    .eq('product_id', productId)
    .order('position', { ascending: false })
    .limit(1)
  const nextPos = (existing?.[0]?.position ?? -1) + 1

  const { error: insertError } = await supabase.from('product_images').insert({
    product_id: productId,
    url: publicUrl,
    position: nextPos,
  })
  if (insertError) {
    // Roll back the upload so we don't orphan storage
    await supabase.storage.from(BUCKET).remove([path])
    console.error('[uploadProductImage] insert row failed', insertError)
    return { ok: false as const, error: insertError.message }
  }

  revalidatePathsForProduct(productId)
  return { ok: true as const, url: publicUrl }
}

export async function deleteProductImage(imageId: string) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { data: image } = await supabase
    .from('product_images')
    .select('url, product_id')
    .eq('id', imageId)
    .maybeSingle()
  if (!image) return { ok: false as const, error: 'Image not found' }

  const { error: delRowError } = await supabase.from('product_images').delete().eq('id', imageId)
  if (delRowError) {
    console.error('[deleteProductImage] delete row failed', delRowError)
    return { ok: false as const, error: delRowError.message }
  }

  // Best-effort storage cleanup. The URL looks like:
  //   https://<project>.supabase.co/storage/v1/object/public/product-images/<path>
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const idx = image.url.indexOf(marker)
  if (idx !== -1) {
    const path = image.url.slice(idx + marker.length)
    await supabase.storage.from(BUCKET).remove([path])
  }

  revalidatePathsForProduct(image.product_id)
  return { ok: true as const }
}

export async function setPrimaryProductImage(imageId: string) {
  if (!(await isAdmin())) return { ok: false as const, error: 'Not authorised' }

  const supabase = await createSupabaseServerClient()
  const { data: target } = await supabase
    .from('product_images')
    .select('id, product_id, position')
    .eq('id', imageId)
    .maybeSingle()
  if (!target) return { ok: false as const, error: 'Image not found' }

  // Bump every other image up by one, then set this one to position 0
  const { data: others } = await supabase
    .from('product_images')
    .select('id, position')
    .eq('product_id', target.product_id)
    .neq('id', imageId)
    .order('position', { ascending: true })

  const updates: { id: string; position: number }[] = [{ id: imageId, position: 0 }]
  ;(others ?? []).forEach((row, i) => {
    updates.push({ id: row.id, position: i + 1 })
  })

  // Update one by one — small N (a product rarely has >5 images)
  for (const u of updates) {
    const { error } = await supabase
      .from('product_images')
      .update({ position: u.position })
      .eq('id', u.id)
    if (error) {
      console.error('[setPrimaryProductImage] reorder failed', error)
      return { ok: false as const, error: error.message }
    }
  }

  revalidatePathsForProduct(target.product_id)
  return { ok: true as const }
}

function revalidatePathsForProduct(productId: string) {
  revalidatePath(`/admin/products/${productId}`)
  revalidatePath('/admin/products')
  revalidatePath('/admin/inventory')
  // Storefront product page path is keyed by slug; refresh listing too
  revalidatePath('/')
}
