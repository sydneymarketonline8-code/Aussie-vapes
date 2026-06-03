'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

/**
 * Crisp live chat widget.
 *
 * Loads the Crisp loader when NEXT_PUBLIC_CRISP_WEBSITE_ID is set,
 * otherwise renders nothing (so dev works without an account). Hidden
 * on admin pages and the checkout-success page where the chat would
 * be intrusive.
 *
 * Setup:
 *   1. Sign up at https://crisp.chat (free plan available).
 *   2. Settings → Website Settings → Setup Instructions → copy the
 *      Website ID (UUID) from the snippet: CRISP_WEBSITE_ID = "<id>".
 *   3. Set in Vercel env vars (and .env.local for dev):
 *        NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *   4. Redeploy.
 */
export default function LiveChat() {
  const pathname = usePathname()
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

  if (!websiteId) return null

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/checkout/success')
  ) {
    return null
  }

  return (
    <Script
      id="crisp-chat"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = ${JSON.stringify(websiteId)};
          (function() {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  )
}
