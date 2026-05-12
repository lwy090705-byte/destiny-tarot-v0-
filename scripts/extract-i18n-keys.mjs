import fs from 'fs'
const src = fs.readFileSync('lib/i18n.ts', 'utf8')
const start = src.indexOf('const koTranslations')
const brace = src.indexOf('{', start)
let depth = 0
let i = brace
for (; i < src.length; i++) {
  const c = src[i]
  if (c === '{') depth++
  else if (c === '}') {
    depth--
    if (depth === 0) break
  }
}
const body = src.slice(brace + 1, i)
const re = /'([^']+)':\s*'((?:\\'|[^'])*)'/g
const keys = []
let m
while ((m = re.exec(body))) {
  keys.push({ key: m[1], ko: m[2].replace(/\\'/g, "'") })
}
console.log(JSON.stringify(keys, null, 0))
console.error('count', keys.length)
