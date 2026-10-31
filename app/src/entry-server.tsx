import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.tsx'
import { PAGES, headTags } from '@/lib/seo'
import { pageJsonLd } from '@/lib/structured-data'

/** Build-time renderer used by scripts/prerender.mjs: one HTML page per dimension. */
export const routes = PAGES.map((p) => p.path)

export function render(url: string) {
  const page = PAGES.find((p) => p.path === url) ?? PAGES[0]
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: headTags(page.dim, pageJsonLd(page.dim)) }
}
