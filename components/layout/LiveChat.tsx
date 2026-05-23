'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

/**
 * Tawk.to live chat widget.
 *
 * Loads the bundled Tawk.to script when both env vars are present, otherwise
 * renders nothing (so dev works without an account). Hidden on admin pages
 * and the checkout-success page where the chat would be intrusive.
 *
 * Setup:
 *   1. Sign up at https://www.tawk.to (free, unlimited agents).
 *   2. Dashboard → Administration → Property Settings → copy the
 *      Property ID and Widget ID from the embed snippet.
 *   3. Set in Vercel env vars (and .env.local for dev):
 *        NEXT_PUBLIC_TAWK_PROPERTY_ID=xxxxxxxxxxxxxxxxxxxxx
 *        NEXT_PUBLIC_TAWK_WIDGET_ID=xxxxxxxxx
 *   4. Redeploy.
 *
 * To swap providers (Crisp, Intercom, etc.) replace the <Script> block —
 * the path-based hide logic stays the same.
 */
export default function LiveChat() {
  const pathname = usePathname()
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID

  if (!propertyId || !widgetId) return null

  // Skip on routes where the floating widget would obscure UI or distract
  // the user. Admin pages run on a separate auth context and the sales team
  // doesn't need to chat with themselves; checkout-success has the payment
  // instructions which need full attention.
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/checkout/success')
  ) {
    return null
  }

  const src = `https://embed.tawk.to/${propertyId}/${widgetId}`

  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      // We bypass next/script's src prop because Tawk.to's loader expects
      // global Tawk_API/Tawk_LoadStart setup before the external script
      // executes, which is easier to express inline.
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function() {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = ${JSON.stringify(src)};
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  )
}
