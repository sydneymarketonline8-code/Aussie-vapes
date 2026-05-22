/**
 * Shopfront-wide cart and checkout rules.
 *
 * MIN_ORDER_AUD is the strict minimum cart subtotal before checkout is
 * allowed. The client disables the proceed-to-checkout buttons below this
 * value; the server action enforces the same check so the rule can't be
 * bypassed by manipulating the client.
 *
 * Configurable per-environment via NEXT_PUBLIC_MIN_ORDER_AUD (defaults to
 * 250). NEXT_PUBLIC_ prefix is intentional — the client needs to read it
 * to disable buttons and show progress.
 */

export const MIN_ORDER_AUD = Number(process.env.NEXT_PUBLIC_MIN_ORDER_AUD ?? '250')

export const FREE_SHIPPING_THRESHOLD_AUD = 300

/** Helper for messaging: "Add $X more to checkout" / "Minimum met" */
export function minimumOrderState(subtotal: number) {
  const remaining = Math.max(0, MIN_ORDER_AUD - subtotal)
  return {
    minimum: MIN_ORDER_AUD,
    met: subtotal >= MIN_ORDER_AUD,
    remaining,
    progress: Math.min(100, (subtotal / MIN_ORDER_AUD) * 100),
  }
}
