import fs from 'node:fs'
import path from 'node:path'

const src = fs.readFileSync('lib/i18n.ts', 'utf8')
const m = src.match(/const koTranslations[^=]+=\s*\{([\s\S]*?)\n\}/)
if (!m) {
  console.error('ko block not found')
  process.exit(1)
}
const body = m[1]
const keyRe = /'([^']+)':/g
const ko = new Set()
let x
while ((x = keyRe.exec(body))) ko.add(x[1])

const packDirs = path.join('lib', 'i18n', 'packs')
const langs = ['en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'hi', 'vi', 'th']
let failed = false
for (const lang of langs) {
  const en = new Set()
  for (const suf of ['a', 'b', 'c', 'd']) {
    const f = path.join(packDirs, `${lang}-${suf}.ts`)
    if (!fs.existsSync(f)) {
      console.error('missing file', f)
      failed = true
      continue
    }
    const t = fs.readFileSync(f, 'utf8')
    keyRe.lastIndex = 0
    while ((x = keyRe.exec(t))) en.add(x[1])
  }
  const missing = [...ko].filter((k) => !en.has(k))
  const extra = [...en].filter((k) => !ko.has(k))
  if (missing.length || extra.length) {
    console.error(lang, 'ko', ko.size, 'pack', en.size, 'missing', missing, 'extra', extra)
    failed = true
  } else {
    console.log(lang, 'OK', en.size)
  }
}
process.exit(failed ? 1 : 0)
