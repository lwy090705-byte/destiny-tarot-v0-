import fs from 'node:fs'
import path from 'node:path'

const ADSENSE_SNIPPET =
  '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3800755907918334" crossorigin="anonymous"></script>'

const ADSENSE_CLIENT = 'ca-pub-3800755907918334'

const APP_HTML_ROOT = path.join(process.cwd(), '.next', 'server', 'app')

const ADSENSE_SCRIPT_VARIANT = new RegExp(
  `<script\\b[^>]*\\bsrc="https:\\/\\/pagead2\\.googlesyndication\\.com\\/pagead\\/js\\/adsbygoogle\\.js\\?client=${ADSENSE_CLIENT}"[^>]*(?:\\/>|>\\s*<\\/script>)`,
  'gi',
)

const ADSENSE_PRELOAD_PATTERN = new RegExp(
  `<link\\b[^>]*\\bhref="https:\\/\\/pagead2\\.googlesyndication\\.com\\/pagead\\/js\\/adsbygoogle\\.js\\?client=${ADSENSE_CLIENT}"[^>]*>`,
  'gi',
)

function walkHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, files)
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath)
    }
  }

  return files
}

function injectAdSenseIntoHtml(html) {
  const original = html
  let nextHtml = html.replace(ADSENSE_PRELOAD_PATTERN, '').replace(ADSENSE_SCRIPT_VARIANT, '')

  const headOpen = nextHtml.match(/<head[^>]*>/i)
  if (!headOpen) {
    return { html: original, changed: false }
  }

  const insertIndex = headOpen.index + headOpen[0].length
  const headClose = nextHtml.indexOf('</head>', insertIndex)
  const headEnd = headClose === -1 ? nextHtml.length : headClose
  const headContent = nextHtml.slice(insertIndex, headEnd).replaceAll(ADSENSE_SNIPPET, '')
  const newHtml =
    nextHtml.slice(0, insertIndex) + ADSENSE_SNIPPET + headContent + nextHtml.slice(headEnd)

  return { html: newHtml, changed: newHtml !== original }
}

function main() {
  const htmlFiles = walkHtmlFiles(APP_HTML_ROOT)

  if (htmlFiles.length === 0) {
    console.warn('[inject-adsense-head] No prerendered HTML files found under .next/server/app')
    process.exit(0)
  }

  let updatedCount = 0

  for (const filePath of htmlFiles) {
    const original = fs.readFileSync(filePath, 'utf8')
    const { html, changed } = injectAdSenseIntoHtml(original)

    if (changed) {
      fs.writeFileSync(filePath, html, 'utf8')
      updatedCount += 1
      console.log(`[inject-adsense-head] updated ${path.relative(process.cwd(), filePath)}`)
    }
  }

  console.log(`[inject-adsense-head] done (${updatedCount} file(s) updated)`)
}

main()
