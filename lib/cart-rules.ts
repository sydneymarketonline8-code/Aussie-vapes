/**
 * Shopfront-wide cart and checkout rules.
 *
 * MIN_ORDER_AUD is the strict minimum cart subtotal before checkout is
 * allowed. The client disables the proceed-to-checkout buttons below this
 * value; the server action enforces the same check so the rule can't be
 * bypassed by manipulating the client.
 *
 * Hardcoded, NOT env-driven — a stale NEXT_PUBLIC_MIN_ORDER_AUD in the host
 * would silently override a change made here.
 */

export const MIN_ORDER_AUD = 200

// Deliberately equal to the minimum: every order that can check out ships free.
export const FREE_SHIPPING_THRESHOLD_AUD = 200

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
