import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dir, '..', 'public', 'levels', 'emblems')
mkdirSync(outDir, { recursive: true })

const TIERS = {
  master: {
    glow: '#fbbf24',
    laurel: ['#b8860b', '#ffd700', '#daa520'],
    gem: '#2563eb',
    emblem: 'hexSun',
  },
  sage: {
    glow: '#3b82f6',
    laurel: ['#475569', '#94a3b8', '#e2e8f0'],
    gem: '#2563eb',
    emblem: 'hexStar',
  },
  reader: {
    glow: '#ea580c',
    laurel: ['#9a3412', '#c2410c', '#fdba74'],
    gem: '#7c3aed',
    emblem: 'hexStarBronze',
  },
  explorer: {
    glow: '#a855f7',
    laurel: ['#6b21a8', '#9333ea', '#d8b4fe'],
    gem: '#9333ea',
    emblem: 'compass',
  },
  trainee: {
    glow: '#ec4899',
    laurel: ['#be185d', '#ec4899', '#fbcfe8'],
    gem: '#d946ef',
    emblem: 'crystalPink',
  },
  beginner: {
    glow: '#22d3ee',
    laurel: ['#0e7490', '#06b6d4', '#a5f3fc'],
    gem: '#06b6d4',
    emblem: 'crystalCyan',
  },
}

function leafPath() {
  return 'M0,0 C-5,6 -6,14 -4,20 C-2,24 0,26 2,24 C4,20 5,12 3,6 C2,2 0,0 0,0 Z'
}

function laurelLeaves(side, colors, id) {
  const cx = 100
  const cy = 138
  const r = 62
  const count = 16
  let out = ''
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    let angle
    if (side === 'left') {
      angle = Math.PI * (0.72 + t * 0.48)
    } else {
      angle = Math.PI * (0.28 - t * 0.48)
    }
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    const deg = (angle * 180) / Math.PI + (side === 'left' ? -75 : 75)
    const grad = side === 'left' ? colors[0] : colors[2]
    const mid = colors[1]
    out += `
      <g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${deg.toFixed(1)}) scale(1.15)">
        <path d="${leafPath()}" fill="url(#${id}-leaf-${side})" stroke="${grad}" stroke-width="0.35" opacity="${(0.92 - i * 0.02).toFixed(2)}"/>
        <path d="M0,2 C-2,8 -2,14 0,18" fill="none" stroke="#fff" stroke-width="0.6" opacity="0.35"/>
      </g>`
  }
  return out
}

function defs(id, tier) {
  const c = TIERS[id]
  const [d0, d1, d2] = c.laurel
  return `
  <defs>
    <radialGradient id="${id}-bloom" cx="50%" cy="42%" r="50%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${c.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-leaf-left" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${d2}"/><stop offset="50%" stop-color="${d1}"/><stop offset="100%" stop-color="${d0}"/>
    </linearGradient>
    <linearGradient id="${id}-leaf-right" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${d2}"/><stop offset="50%" stop-color="${d1}"/><stop offset="100%" stop-color="${d0}"/>
    </linearGradient>
    <linearGradient id="${id}-metal" x1="10%" y1="5%" x2="90%" y2="95%">
      <stop offset="0%" stop-color="#fff"/><stop offset="25%" stop-color="${d2}"/><stop offset="55%" stop-color="${c.glow}"/><stop offset="100%" stop-color="${d0}"/>
    </linearGradient>
    <radialGradient id="${id}-face" cx="38%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${d2}"/><stop offset="70%" stop-color="${c.glow}"/><stop offset="100%" stop-color="${d0}"/>
    </radialGradient>
    <linearGradient id="${id}-shine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.95"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${id}-cA" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.95"/><stop offset="40%" stop-color="${d2}"/><stop offset="100%" stop-color="${d0}"/>
    </linearGradient>
    <linearGradient id="${id}-cB" x1="80%" y1="0%" x2="20%" y2="100%">
      <stop offset="0%" stop-color="${d2}"/><stop offset="100%" stop-color="${c.glow}"/>
    </linearGradient>
    <linearGradient id="${id}-cC" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.85"/><stop offset="50%" stop-color="${c.glow}" stop-opacity="0.75"/><stop offset="100%" stop-color="${d0}"/>
    </linearGradient>
    <filter id="${id}-fx" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.35"/>
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="${c.glow}" flood-opacity="0.55"/>
    </filter>
    <filter id="${id}-soft" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="10" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`
}

function hexEmblem(id, inner) {
  return `
  <g filter="url(#${id}-fx)" transform="translate(0,-8)">
    <polygon points="100,18 128,36 128,68 100,86 72,68 72,36" fill="url(#${id}-metal)" stroke="${TIERS[id].laurel[0]}" stroke-width="2"/>
    <polygon points="100,24 120,38 120,66 100,78 80,66 80,38" fill="url(#${id}-face)"/>
    <ellipse cx="100" cy="28" rx="26" ry="9" fill="url(#${id}-shine)" opacity="0.7"/>
    ${inner}
  </g>`
}

function emblems(id) {
  const type = TIERS[id].emblem
  if (type === 'hexSun') {
    return hexEmblem(
      id,
      `
    <circle cx="100" cy="52" r="22" fill="#fde047" stroke="#b45309" stroke-width="2"/>
    <circle cx="100" cy="52" r="17" fill="url(#${id}-face)"/>
    <circle cx="100" cy="52" r="11" fill="#fef08a" stroke="#f59e0b" stroke-width="1.2"/>
    <circle cx="100" cy="52" r="6" fill="#fbbf24"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const a = (i * 22.5 * Math.PI) / 180
      return `<line x1="${100 + 12 * Math.cos(a)}" y1="${52 + 12 * Math.sin(a)}" x2="${100 + 20 * Math.cos(a)}" y2="${52 + 20 * Math.sin(a)}" stroke="#fde047" stroke-width="1.6" opacity="0.9"/>`
    }).join('')}
    <ellipse cx="100" cy="42" rx="10" ry="4" fill="#fff" opacity="0.55"/>`
    )
  }
  if (type === 'hexStar' || type === 'hexStarBronze') {
    const starFill = type === 'hexStar' ? '#eff6ff' : '#ffedd5'
    return hexEmblem(
      id,
      `
    <polygon points="100,34 106,48 122,48 110,58 114,74 100,64 86,74 90,58 78,48 94,48" fill="${starFill}" stroke="${TIERS[id].laurel[0]}" stroke-width="1.6" stroke-linejoin="round"/>
    <polygon points="100,40 104,50 116,50 106,57 109,68 100,60 91,68 94,57 84,50 96,50" fill="${TIERS[id].glow}" opacity="0.45"/>
    <ellipse cx="100" cy="38" rx="12" ry="5" fill="#fff" opacity="0.5"/>`
    )
  }
  if (type === 'compass') {
    return `
    <g filter="url(#${id}-fx)" transform="translate(0,-8)">
      <circle cx="100" cy="52" r="30" fill="url(#${id}-metal)" stroke="#581c87" stroke-width="2"/>
      <circle cx="100" cy="52" r="24" fill="url(#${id}-face)"/>
      <polygon points="100,28 106,44 124,44 110,54 116,72 100,62 84,72 90,54 76,44 94,44" fill="#fde047" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/>
      <polygon points="100,34 104,44 118,44 108,51 112,64 100,56 88,64 92,51 82,44 96,44" fill="#fbbf24"/>
      <circle cx="100" cy="52" r="6" fill="#fef08a" stroke="#d97706" stroke-width="1"/>
      <ellipse cx="100" cy="36" rx="14" ry="5" fill="url(#${id}-shine)" opacity="0.65"/>
    </g>`
  }
  if (type === 'crystalPink' || type === 'crystalCyan') {
    const cx = 100
    const sc = 1.18
  const t = 8
  const b = 88
  const w = 34
    return `
    <g filter="url(#${id}-fx)" transform="translate(100,50) scale(${sc}) translate(-100,-50)">
      <polygon points="${cx},${t} ${cx - w},${b - 16} ${cx},${b}" fill="url(#${id}-cA)" stroke="${TIERS[id].laurel[0]}" stroke-width="1.2"/>
      <polygon points="${cx},${t} ${cx + w},${b - 16} ${cx},${b}" fill="url(#${id}-cB)" stroke="${TIERS[id].laurel[0]}" stroke-width="1.2"/>
      <polygon points="${cx - w * 0.5},${t + 12} ${cx + w * 0.5},${t + 12} ${cx + w * 0.38},${b - 14} ${cx - w * 0.38},${b - 14}" fill="url(#${id}-cC)" opacity="0.9"/>
      <polygon points="${cx - w * 0.62},${t + 18} ${cx},${t + 2} ${cx + w * 0.62},${t + 18} ${cx},${t + 28}" fill="#fff" opacity="0.82"/>
      <path d="M${cx - 8} ${t + 16} L${cx} ${t + 6} L${cx + 10} ${t + 24} L${cx} ${b - 30} L${cx - 12} ${t + 32} Z" fill="#fff" opacity="0.38"/>
      <line x1="${cx}" y1="${t}" x2="${cx}" y2="${b}" stroke="#fff" stroke-width="0.9" opacity="0.35"/>
      <line x1="${cx - w}" y1="${b - 16}" x2="${cx + w}" y2="${b - 16}" stroke="#fff" stroke-width="0.7" opacity="0.28"/>
      <polygon points="${cx - 10},${b - 22} ${cx},${b - 10} ${cx + 10},${b - 22}" fill="#fff" opacity="0.4"/>
      <ellipse cx="${cx}" cy="${t + 10}" rx="${w * 0.4}" ry="7" fill="url(#${id}-shine)" opacity="0.85"/>
      <ellipse cx="${cx - 6}" cy="${(t + b) / 2}" rx="5" ry="14" fill="#fff" opacity="0.22"/>
    </g>`
  }
  return ''
}

function baseGem(id) {
  const gem = TIERS[id].gem
  return `
  <g>
    <path d="M72 148 Q100 132 128 148 L100 162 Z" fill="url(#${id}-leaf-left)" opacity="0.85"/>
    <polygon points="100,150 108,156 100,162 92,156" fill="${gem}" stroke="#fff" stroke-width="0.8"/>
    <polygon points="100,151 105,155 100,159 95,155" fill="#fff" opacity="0.45"/>
    <ellipse cx="100" cy="154" rx="5" ry="3" fill="#fff" opacity="0.35"/>
  </g>`
}

function buildSvg(id) {
  const c = TIERS[id]
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" shape-rendering="geometricPrecision">
${defs(id, c)}
<ellipse cx="100" cy="55" rx="55" ry="48" fill="url(#${id}-bloom)" filter="url(#${id}-soft)" opacity="0.85"/>
${laurelLeaves('left', c.laurel, id)}
${laurelLeaves('right', c.laurel, id)}
${emblems(id)}
${baseGem(id)}
</svg>`
}

for (const id of Object.keys(TIERS)) {
  writeFileSync(join(outDir, `${id}.svg`), buildSvg(id), 'utf8')
  console.log('wrote', id)
}
