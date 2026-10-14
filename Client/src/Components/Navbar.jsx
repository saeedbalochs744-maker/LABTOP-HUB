import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

/*
  LAPTOPHUB navbar  -  v5 "Gamer"  (no extra packages: React, Tailwind, react-router-dom only)

  Gamer look: neon blue glow, sharp edges, RGB lighting, keyboard-key links, gamepad logo.
   1. A black status strip on top with a scrolling "//" ticker (folds away on scroll).
   2. A full-width black bar with scan lines, your animated blue mesh, and an RGB gaming-light strip on the
      bottom edge. A white slider on the strip shows how far you have scrolled.
   3. Hexagon gamepad logo with a colour-cycling RGB ring, a flickering HUB and a glitch effect on hover.
   4. Links are keyboard keys: they glow when you hover, and the page you are on is the key pressed down.
   5. Slanted JOIN VIP button with a pulsing glow. Sharp search box, bell and menu panels with cut corners.
   6. The Service menu has a VIP pass card that tilts toward your cursor.
   7. Phones and tablets get a full-screen menu with huge italic links.
   8. Smart header: hides when you scroll down, returns when you scroll up.
  The font is inherited from your site, so it matches the rest of the page.
  All motion switches off for visitors who prefer reduced motion.
  Tip: put id="main" on your page content so the "Skip to content" link has somewhere to jump.
*/

/* ============ SETTINGS ============ */
const BRAND = {
  name: 'LAPTOPHUB',
  nameA: 'LAPTOP', // white part of the logo
  nameB: 'HUB', // neon blue part of the logo
  cta: 'Join VIP',
  badge: 'VIP PASS',
  ticker: [
    'Genuine laptops with warranty',
    'Free shipping on selected models',
    'Expert support, any time',
    'Join VIP today',
  ],
}
const SETTINGS = {
  smartHide: true, // hide the header when scrolling down, show it when scrolling up
  recentKey: 'lh-recent-searches', // localStorage key for recent searches
}
/* ================================== */

const mainLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/service', label: 'Service', menu: true },
]
const signIn = { to: '/signin', label: 'Sign In' }
const allLinks = [...mainLinks, signIn]

const services = [
  { to: '/service#consultation', title: 'Laptop consultation', desc: 'We help you pick the right laptop.', d: 'M3 5h18v12H3zM8 21h8M12 17v4' },
  { to: '/service#warranty', title: 'Warranty', desc: 'Clear coverage on every laptop.', d: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z' },
  { to: '/service#support', title: 'Priority support', desc: 'Direct line to our team, any time.', d: 'M4 13v-1a8 8 0 0116 0v1M4 13h3v5H4zM17 13h3v5h-3zM17 18c0 2-2 3-5 3' },
]

const INITIAL_NOTES = [
  { id: 1, text: 'Welcome to LaptopHub. Finish setting up your profile.', time: 'Just now', read: false },
  { id: 2, text: 'New gaming laptops just arrived.', time: 'Today', read: false },
]

/* group order here is the order shown when the search box is empty */
const searchItems = [
  ...allLinks.map(({ to, label }) => ({ to, label, group: 'Pages' })),
  ...services.map(({ to, title }) => ({ to, label: title, group: 'Services' })),
  { to: '/service#gaming', label: 'Gaming laptops', group: 'Laptops' },
  { to: '/service#business', label: 'Business laptops', group: 'Laptops' },
  { to: '/service#student', label: 'Student laptops', group: 'Laptops' },
  { to: '/signup', label: BRAND.cta, group: 'Account' },
]

const ICONS = {
  search: 'M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z',
  bell: 'M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevron: 'M6 9l6 6 6-6',
  crown: 'M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z',
  menu: 'M4 7h16M4 12h10M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pad: 'M6 11h4M8 9v4M15 13h.01M18 11h.01M17.32 5H6.68a4 4 0 00-3.978 3.59C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 019.828 16h4.344a2 2 0 011.414.586L17 18c.5.5 1 1 2 1a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258A4 4 0 0017.32 5z',
}

const Icon = ({ d, className = 'h-4 w-4', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
    <path d={d} />
  </svg>
)

const NEON = '#3d8bff' // main neon blue
const ICE = '#8ab8ff' // bright highlight
const GLOW_TEXT = '[text-shadow:0_0_12px_rgba(47,123,255,0.9)]'
const BLUE_BTN = 'linear-gradient(180deg,#4d95ff,#1d5bff)'
const BLUE_PASS = 'linear-gradient(115deg,#1e3a8a,#5b95ff 35%,#2f7bff 55%,#1e3a8a)'
const NEON_GRAD = 'linear-gradient(135deg,#8ab8ff,#2f7bff 40%,#1e3a8a)'

const HEX = 'polygon(25% 4%,75% 4%,100% 50%,75% 96%,25% 96%,0 50%)'
const SLANT = 'polygon(14px 0,100% 0,calc(100% - 14px) 100%,0 100%)'
const cutPoly = (n) => `polygon(0 0,calc(100% - ${n}px) 0,100% ${n}px,100% 100%,${n}px 100%,0 calc(100% - ${n}px))`

const BAR_BIG = 72
const BAR_SMALL = 60

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || '')

/* ---------- search helpers ---------- */
const score = (label, q) => {
  const l = label.toLowerCase()
  if (!q) return 1
  if (l.startsWith(q)) return 4
  if (l.split(' ').some((w) => w.startsWith(q))) return 3
  if (l.includes(q)) return 2
  let i = 0
  for (const ch of l) if (ch === q[i]) i++
  return i === q.length ? 1 : 0
}

const Hl = ({ text, q }) => {
  const i = q ? text.toLowerCase().indexOf(q) : -1
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent text-[#8ab8ff] underline decoration-[#3d8bff] decoration-2 underline-offset-4">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

const loadRecent = () => {
  try {
    const v = JSON.parse(localStorage.getItem(SETTINGS.recentKey) || '[]')
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 3) : []
  } catch {
    return []
  }
}

const css = `
.gm-marquee { animation: gm-marquee 34s linear infinite }
.gm-pop { animation: gm-pop .22s ease-out }
.gm-cta:hover .gm-sheen { animation: gm-shine .8s ease }
.gm-shimmer { animation: gm-shimmer 4.5s ease-in-out infinite }
.gm-pulse { filter: drop-shadow(0 0 10px rgba(47,123,255,.6)); animation: gm-pulse 2.6s ease-in-out infinite }
.gm-flicker { animation: gm-flicker 7s linear infinite }
.gm-glitch { position: relative; display: inline-block }
.gm-glitch::before, .gm-glitch::after { content: attr(data-text); position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none; white-space: nowrap }
.gm-glitch::before { color: #6fa8ff }
.gm-glitch::after { color: #ffffff }
.gm-logo:hover .gm-glitch::before { opacity: .9; animation: gm-g1 .5s steps(2, end) infinite }
.gm-logo:hover .gm-glitch::after { opacity: .6; animation: gm-g2 .5s steps(2, end) infinite }
.gm-card { transform: rotate(-3deg) perspective(600px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)); transition: transform .15s ease-out }
.gm-feat:hover .gm-card { transform: rotate(0deg) perspective(600px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(1.05) }
.gm-glare { background: radial-gradient(120px circle at calc(50% + var(--ry,0deg) * -4) calc(50% + var(--rx,0deg) * 4), rgba(255,255,255,.35), transparent 70%); opacity: 0; transition: opacity .2s }
.gm-feat:hover .gm-glare { opacity: 1 }
.gm-rgb-bg { background-image: linear-gradient(90deg,#ff2d6f,#ffb02d,#2dff8a,#2dc8ff,#6a2dff,#ff2d6f); background-size: 200% 100%; animation: gm-rgb 4s linear infinite }
.gm-key { background: linear-gradient(180deg,#10224d,#091433); border: 1px solid #2a4a9a; border-bottom-width: 4px; border-bottom-color: #16296a; border-radius: 2px; box-shadow: inset 0 1px 0 rgba(255,255,255,.12); transition: transform .1s, border-color .2s, box-shadow .2s, background .2s, color .2s }
.gm-key:hover { border-color: #6fa8ff; border-bottom-color: #2a4a9a; box-shadow: 0 0 16px rgba(47,123,255,.6), inset 0 1px 0 rgba(255,255,255,.2); transform: translateY(-1px) }
.gm-key-on { background: linear-gradient(180deg,#2461f0,#1238a0); border-color: #8ab8ff; box-shadow: 0 0 22px rgba(47,123,255,.8), inset 0 0 12px rgba(255,255,255,.22) }
.gm-key:active, .gm-key-on, .gm-key-on:hover { border-bottom-width: 1px; transform: translateY(3px) }
@keyframes gm-rgb { to { background-position: 200% 0 } }
@keyframes gm-shimmer { 0% { transform: translateX(-120%) } 100% { transform: translateX(420%) } }
@keyframes gm-pulse { 0%, 100% { filter: drop-shadow(0 0 10px rgba(47,123,255,.55)) } 50% { filter: drop-shadow(0 0 22px rgba(47,123,255,1)) } }
@keyframes gm-flicker { 0%, 18%, 22%, 62%, 64%, 100% { opacity: 1 } 20%, 63% { opacity: .45 } 21% { opacity: .9 } }
@keyframes gm-g1 { 0% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 0) } 50% { clip-path: inset(55% 0 12% 0); transform: translate(3px, 0) } 100% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 0) } }
@keyframes gm-g2 { 0% { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0) } 50% { clip-path: inset(15% 0 55% 0); transform: translate(-3px, 0) } 100% { clip-path: inset(40% 0 30% 0); transform: translate(2px, 0) } }
@keyframes gm-marquee { to { transform: translateX(-25%) } }
@keyframes gm-pop { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
@keyframes gm-shine { from { transform: translateX(-130%) skewX(-22deg) } to { transform: translateX(380%) skewX(-22deg) } }
@media (prefers-reduced-motion: reduce) {
  .gm-marquee, .gm-pop, .gm-shimmer, .gm-pulse, .gm-flicker, .gm-rgb-bg, .gm-cta:hover .gm-sheen, .gm-logo:hover .gm-glitch::before, .gm-logo:hover .gm-glitch::after { animation: none }
  .gm-card { transition: none }
  .gm-card, .gm-feat:hover .gm-card { transform: rotate(-3deg) }
}
`

/* Small L-shaped corner marks, the HUD touch on sharp buttons */
const Ticks = () => (
  <>
    <span className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 border-l-2 border-t-2 border-[#8ab8ff]" aria-hidden="true" />
    <span className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b-2 border-r-2 border-[#8ab8ff]" aria-hidden="true" />
  </>
)

/* Panel with a neon outline and one cut corner top-right and bottom-left */
const Frame = ({ n = 14, className = '', children }) => (
  <div className={`drop-shadow-[0_0_18px_rgba(47,123,255,0.35)] ${className}`}>
    <div style={{ clipPath: cutPoly(n), backgroundImage: NEON_GRAD, padding: 1 }}>
      <div className="bg-[#04070f]" style={{ clipPath: cutPoly(n) }}>
        {children}
      </div>
    </div>
  </div>
)

/* Logo: glowing hexagon + italic black wordmark with a flickering HUB and a glitch on hover */
const Logo = ({ focusRing }) => (
  <Link to="/" aria-label={`${BRAND.name} home`} className={`gm-logo group flex items-center gap-3 ${focusRing}`}>
    <span className="drop-shadow-[0_0_12px_rgba(47,123,255,0.85)] transition-transform duration-300 group-hover:scale-110">
      <span className="gm-rgb-bg relative flex h-11 w-11 items-center justify-center" style={{ clipPath: HEX }}>
        <span className="absolute inset-[2px] flex items-center justify-center bg-[#04070f]" style={{ clipPath: HEX }}>
          <Icon d={ICONS.pad} className="h-5 w-5 text-[#8ab8ff]" />
        </span>
      </span>
    </span>
    <span className="hidden sm:block">
      <span className="gm-glitch text-[24px] font-black uppercase italic leading-none tracking-tight" data-text={BRAND.name}>
        <span className="text-white">{BRAND.nameA}</span>
        <span className={`gm-flicker text-[#3d8bff] ${GLOW_TEXT}`}>{BRAND.nameB}</span>
      </span>
    </span>
  </Link>
)

/* Black status strip with a "//" ticker */
const Ticker = () => (
  <div className="group overflow-hidden border-b border-[#2f7bff]/30 bg-[#02040b] text-[#6fa8ff]">
    <div className="gm-marquee flex w-max group-hover:[animation-play-state:paused]">
      {[0, 1, 2, 3].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
          {BRAND.ticker.map((text) => (
            <span key={text} className="flex items-center whitespace-nowrap py-1.5 pl-6 text-[12px] font-bold uppercase tracking-[0.18em]">
              {text}
              <span className={`ml-6 font-black text-[#3d8bff] ${GLOW_TEXT}`}>{'//'}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)

/* Network lines: a faint dark-blue mesh. Glowing streaks travel along its lines at a
   calm speed, entering from the left, right, top and bottom. */
const STREAK_COLORS = [[37, 99, 235], [67, 56, 202], [109, 40, 217], [3, 105, 161], [30, 64, 175]]
const CELL = 30 // mesh size in px (smaller = more triangles)
const BASE_ALPHA = 0.09 // faint mesh always visible, set 0 to hide it
const SPEED = [150, 260] // streak speed in px per second
const GAP = [0.8, 1.7] // seconds between new streaks
const MAX_STREAKS = 8
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]]

function StreakBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const still = reduceMotion()
    let w = 0, h = 0, raf = 0, prevTs = 0, nextSpawn = 0, visible = true
    let cols = 0, rows = 0
    let nodes = [], adj = [], edges = [], streaks = []
    const rand = (a, b) => a + Math.random() * (b - a)
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    const build = () => {
      cols = Math.max(3, Math.round(w / CELL))
      rows = Math.max(2, Math.round(h / CELL))
      const cw = w / cols
      const rh = h / rows
      nodes = []
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const edgeX = c === 0 || c === cols
          const edgeY = r === 0 || r === rows
          nodes.push([c * cw + (edgeX ? 0 : rand(-0.4, 0.4) * cw), r * rh + (edgeY ? 0 : rand(-0.4, 0.4) * rh)])
        }
      }
      const id = (r, c) => r * (cols + 1) + c
      adj = nodes.map(() => [])
      edges = []
      const link = (a, b) => { adj[a].push(b); adj[b].push(a); edges.push([a, b]) }
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          if (c < cols) link(id(r, c), id(r, c + 1))
          if (r < rows) link(id(r, c), id(r + 1, c))
          if (r < rows && c < cols) {
            if ((r + c) % 2 === 0) link(id(r, c), id(r + 1, c + 1))
            else link(id(r, c + 1), id(r + 1, c))
          }
        }
      }
    }

    const drawBase = () => {
      if (BASE_ALPHA <= 0) return
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(59,110,255,${BASE_ALPHA})`
      ctx.beginPath()
      for (const [a, b] of edges) {
        ctx.moveTo(nodes[a][0], nodes[a][1])
        ctx.lineTo(nodes[b][0], nodes[b][1])
      }
      ctx.stroke()
      ctx.fillStyle = `rgba(120,160,255,${BASE_ALPHA * 3})`
      ctx.beginPath()
      for (const n of nodes) {
        ctx.moveTo(n[0] + 1.1, n[1])
        ctx.arc(n[0], n[1], 1.1, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    const spawn = () => {
      const [dx, dy] = DIRS[Math.floor(Math.random() * 4)]
      const starts = []
      for (let i = 0; i < nodes.length; i++) {
        const r = Math.floor(i / (cols + 1))
        const c = i % (cols + 1)
        if ((dx === 1 && c === 0) || (dx === -1 && c === cols) || (dy === 1 && r === 0) || (dy === -1 && r === rows)) starts.push(i)
      }
      let cur = starts[Math.floor(Math.random() * starts.length)]
      const ids = [cur]
      let prev = -1
      const maxSteps = Math.round(rand(8, 22))
      for (let s = 0; s < maxSteps; s++) {
        const opts = []
        const wts = []
        for (const nb of adj[cur]) {
          if (nb === prev) continue
          const ex = nodes[nb][0] - nodes[cur][0]
          const ey = nodes[nb][1] - nodes[cur][1]
          const dot = (ex * dx + ey * dy) / (Math.hypot(ex, ey) || 1)
          opts.push(nb)
          wts.push(dot > 0.25 ? 4 : dot > -0.25 ? 1.2 : 0.15)
        }
        if (!opts.length) break
        let t = Math.random() * wts.reduce((a, b) => a + b, 0)
        let pick = opts[opts.length - 1]
        for (let k = 0; k < opts.length; k++) { t -= wts[k]; if (t <= 0) { pick = opts[k]; break } }
        prev = cur
        cur = pick
        ids.push(cur)
        const r = Math.floor(cur / (cols + 1))
        const c = cur % (cols + 1)
        const farSide = (dx === 1 && c === cols) || (dx === -1 && c === 0) || (dy === 1 && r === rows) || (dy === -1 && r === 0)
        if (farSide && ids.length >= 7) break
      }
      if (ids.length < 3) return
      const pts = ids.map((i) => nodes[i])
      const cum = [0]
      let total = 0
      for (let i = 1; i < pts.length; i++) {
        total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
        cum.push(total)
      }
      streaks.push({ pts, cum, total, s: 0, v: rand(SPEED[0], SPEED[1]), tail: rand(70, 160), c: STREAK_COLORS[Math.floor(Math.random() * STREAK_COLORS.length)], lw: rand(1.1, 1.8) })
    }

    const pointAt = (st, d) => {
      const dd = clamp(d, 0, st.total)
      let i = 1
      while (i < st.cum.length - 1 && st.cum[i] < dd) i++
      const seg = st.cum[i] - st.cum[i - 1] || 1
      const t = (dd - st.cum[i - 1]) / seg
      return [st.pts[i - 1][0] + (st.pts[i][0] - st.pts[i - 1][0]) * t, st.pts[i - 1][1] + (st.pts[i][1] - st.pts[i - 1][1]) * t]
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      streaks = []
      build()
      ctx.clearRect(0, 0, w, h)
      drawBase()
    }

    const loop = (ts) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) { prevTs = ts; return }
      const dt = Math.min(0.05, (ts - (prevTs || ts)) / 1000)
      prevTs = ts
      const t = ts / 1000

      if (t > nextSpawn && streaks.length < MAX_STREAKS && w > 0) {
        spawn()
        nextSpawn = t + rand(GAP[0], GAP[1])
      }

      ctx.clearRect(0, 0, w, h)
      drawBase()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      streaks = streaks.filter((st) => {
        st.s += st.v * dt
        const head = Math.min(st.s, st.total)
        const tail = Math.max(0, st.s - st.tail)
        if (tail >= st.total) return false
        if (head <= tail) return true

        const [r, g, b] = st.c
        const N = 18
        ctx.lineWidth = st.lw
        let prev = pointAt(st, tail)
        for (let k = 1; k <= N; k++) {
          const p = pointAt(st, tail + ((head - tail) * k) / N)
          ctx.strokeStyle = `rgba(${r},${g},${b},${(Math.pow(k / N, 2) * 0.95).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(prev[0], prev[1])
          ctx.lineTo(p[0], p[1])
          ctx.stroke()
          prev = p
        }

        if (st.s < st.total) {
          ctx.shadowBlur = 12
          ctx.shadowColor = `rgba(${r},${g},${b},1)`
          ctx.fillStyle = `rgb(${Math.min(255, r + 90)},${Math.min(255, g + 90)},${Math.min(255, b + 60)})`
          ctx.beginPath()
          ctx.arc(prev[0], prev[1], st.lw + 0.9, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
        return true
      })
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(canvas)
    resize()
    if (!still) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lounge, setLounge] = useState(false)
  const [menu, setMenu] = useState(false)
  const [bell, setBell] = useState(false)
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState(loadRecent)

  const barRef = useRef(null)
  const bellRef = useRef(null)
  const closeTimer = useRef(null)
  const ctaBox = useRef(null)
  const loungeRef = useRef(null)
  const loungeCloseRef = useRef(null)
  const menuBtnRef = useRef(null)
  const lastFocus = useRef(null)
  const live = useRef({ menu, bell, searchOpen, lounge })
  live.current = { menu, bell, searchOpen, lounge }

  const barH = scrolled ? BAR_SMALL : BAR_BIG
  const unread = notes.filter((n) => !n.read).length
  const q = query.trim().toLowerCase()

  const showMenu = () => { clearTimeout(closeTimer.current); setMenu(true) }
  const hideMenu = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMenu(false), 180) }

  const openSearch = () => {
    if (!live.current.searchOpen) lastFocus.current = document.activeElement
    setSearchOpen(true)
  }

  // cursor spotlight on the bar: writes CSS variables, no React re-render
  const onBarMove = (e) => {
    const el = barRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    el.style.setProperty('--so', '1')
  }
  const onBarLeave = () => barRef.current?.style.setProperty('--so', '0')

  // magnetic Join VIP button
  const ctaEnter = (e) => { ctaBox.current = e.currentTarget.getBoundingClientRect() }
  const ctaMove = (e) => {
    if (reduceMotion() || !ctaBox.current) return
    const b = ctaBox.current
    e.currentTarget.style.transform = `translate(${(e.clientX - (b.left + b.width / 2)) * 0.18}px, ${(e.clientY - (b.top + b.height / 2)) * 0.28}px)`
  }
  const ctaLeave = (e) => { e.currentTarget.style.transform = '' }

  // VIP pass card tilts toward the cursor (CSS variables only, no re-render)
  const tilt = (e) => {
    if (reduceMotion()) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--ry', `${(x * 22).toFixed(1)}deg`)
    e.currentTarget.style.setProperty('--rx', `${(-y * 22).toFixed(1)}deg`)
  }
  const untilt = (e) => {
    e.currentTarget.style.removeProperty('--ry')
    e.currentTarget.style.removeProperty('--rx')
  }

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      ticking = false
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 16)
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0)
      if (SETTINGS.smartHide) {
        const { menu: m, bell: b, searchOpen: s, lounge: l } = live.current
        const dy = y - lastY
        if (m || b || s || l || y < 120) setHidden(false)
        else if (dy > 6) setHidden(true)
        else if (dy < -6) setHidden(false)
      }
      lastY = y
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (live.current.searchOpen) setSearchOpen(false)
        else {
          lastFocus.current = document.activeElement
          setSearchOpen(true)
        }
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setBell(false)
        setMenu(false)
        setLounge(false)
      }
    }
    const onDown = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBell(false)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      clearTimeout(closeTimer.current)
    }
  }, [])

  // route change: close everything and make sure the header is visible
  useEffect(() => {
    setLounge(false)
    setMenu(false)
    setBell(false)
    setSearchOpen(false)
    setHidden(false)
  }, [location.pathname, location.hash])

  // /service#warranty: scroll to the section and leave room for the bar
  useEffect(() => {
    if (!location.hash) return
    const t = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - (BAR_SMALL + 24),
          behavior: reduceMotion() ? 'auto' : 'smooth',
        })
      }
    }, 120)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])

  // lock page scroll behind the lounge and the search palette
  useEffect(() => {
    document.body.style.overflow = lounge || searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lounge, searchOpen])

  // lounge: hide it from keyboard and screen readers when closed, focus it when open, restore focus after
  const loungeWasOpen = useRef(false)
  useEffect(() => {
    if (loungeRef.current) loungeRef.current.inert = !lounge
    if (lounge) {
      loungeWasOpen.current = true
      loungeCloseRef.current?.focus()
    } else if (loungeWasOpen.current) {
      loungeWasOpen.current = false
      menuBtnRef.current?.focus()
    }
  }, [lounge])

  // search: give focus back to whatever opened it
  const searchWasOpen = useRef(false)
  useEffect(() => {
    if (searchOpen) searchWasOpen.current = true
    else if (searchWasOpen.current) {
      searchWasOpen.current = false
      lastFocus.current?.focus?.()
    }
  }, [searchOpen])

  useEffect(() => setActive(0), [query, searchOpen])
  useEffect(() => {
    if (searchOpen) document.getElementById(`gm-opt-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, searchOpen])

  const results = useMemo(() => {
    if (!q) {
      const rec = recent.map((l) => searchItems.find((i) => i.label === l)).filter(Boolean).map((i) => ({ ...i, group: 'Recent' }))
      return [...rec, ...searchItems]
    }
    return searchItems
      .map((i) => ({ i, s: score(i.label, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.i)
  }, [q, recent])

  const go = (item) => {
    const next = [item.label, ...recent.filter((l) => l !== item.label)].slice(0, 3)
    setRecent(next)
    try { localStorage.setItem(SETTINGS.recentKey, JSON.stringify(next)) } catch { /* storage can be blocked, ignore */ }
    setSearchOpen(false)
    setQuery('')
    navigate(item.to)
  }
  const onSearchKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[active]) go(results[active])
  }

  const readOne = (id) => setNotes((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
  const readAll = () => setNotes((list) => list.map((n) => ({ ...n, read: true })))

  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d8bff]'
  const iconBtn = `group relative flex h-10 w-10 items-center justify-center border border-[#2f7bff]/40 bg-[#06102b] text-zinc-300 transition hover:border-[#8ab8ff] hover:text-white hover:shadow-[0_0_18px_rgba(47,123,255,0.55)] ${focusRing}`
  const panelLine = <div className="h-[2px] bg-gradient-to-r from-transparent via-[#3d8bff] to-transparent" />

  const renderLink = ({ to, label, menu: hasMenu }) => (
    <div
      key={to}
      className="flex"
      onMouseEnter={hasMenu ? showMenu : undefined}
      onMouseLeave={hasMenu ? hideMenu : undefined}
      onFocus={hasMenu ? showMenu : undefined}
      onBlur={hasMenu ? (e) => !e.currentTarget.contains(e.relatedTarget) && hideMenu() : undefined}
    >
      <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }) =>
          `gm-key relative flex items-center gap-1.5 px-5 py-2 text-[13px] font-black uppercase tracking-wider ${focusRing} ${
            isActive ? `gm-key-on text-white ${GLOW_TEXT}` : 'text-zinc-300 hover:text-white'
          }`
        }
        {...(hasMenu ? { 'aria-haspopup': 'true', 'aria-expanded': menu } : {})}
      >
        {label}
        {hasMenu && <Icon d={ICONS.chevron} className={`h-3.5 w-3.5 transition-transform duration-300 ${menu ? 'rotate-180 text-[#3d8bff]' : ''}`} />}
      </NavLink>
    </div>
  )

  return (
    <header
      className="sticky top-0 z-50 transition-transform duration-500 ease-out"
      style={{ transform: hidden ? 'translateY(calc(-100% - 24px))' : undefined }}
      onFocusCapture={() => setHidden(false)}
    >
      <style>{css}</style>

      <a
        href="#main"
        className="fixed left-3 top-3 z-[100] -translate-y-[200%] bg-[#3d8bff] px-4 py-2 text-base font-extrabold uppercase text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>

      {/* STATUS STRIP: folds away on scroll */}
      <div className={`overflow-hidden transition-all duration-500 ${scrolled ? 'max-h-0' : 'max-h-9'}`} aria-hidden={scrolled}>
        <Ticker />
      </div>

      {/* MAIN BAR */}
      <div ref={barRef} className="relative" onMouseMove={onBarMove} onMouseLeave={onBarLeave}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#03060f]/95 backdrop-blur-xl" aria-hidden="true">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0_1px,transparent_1px_3px)]" />
          <StreakBackground />
          <div className="absolute -left-24 top-0 h-full w-96 bg-[radial-gradient(closest-side,rgba(47,123,255,0.22),transparent)]" />
          <div className="absolute -right-24 top-0 h-full w-96 bg-[radial-gradient(closest-side,rgba(47,123,255,0.22),transparent)]" />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: 'var(--so, 0)', backgroundImage: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(47,123,255,0.24), transparent 65%)' }}
          />
        </div>

        {/* RGB gaming-light strip on the bottom edge, with a white slider that shows the scroll position */}
        <div className="gm-rgb-bg pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px] shadow-[0_0_14px_2px_rgba(61,139,255,0.7),0_6px_30px_rgba(47,123,255,0.3)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" aria-hidden="true">
          <span
            className="absolute -bottom-[3px] h-2 w-7 -translate-x-1/2 bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.8)] transition-[left] duration-150"
            style={{ left: `calc(14px + (100% - 28px) * ${progress / 100})` }}
          />
        </div>

        {/* corner brackets */}
        <span className="pointer-events-none absolute left-0 top-0 z-10 h-3 w-3 border-l-2 border-t-2 border-[#8ab8ff]" aria-hidden="true" />
        <span className="pointer-events-none absolute right-0 top-0 z-10 h-3 w-3 border-r-2 border-t-2 border-[#8ab8ff]" aria-hidden="true" />

        <nav aria-label="Main" className="relative mx-auto flex max-w-[1500px] items-center justify-between px-4 transition-[height] duration-500 sm:px-8 xl:grid xl:grid-cols-[1fr_auto_1fr]" style={{ height: barH }}>
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button ref={menuBtnRef} type="button" onClick={() => setLounge(true)} aria-label="Open menu" aria-expanded={lounge} className={`${iconBtn} text-[#cfe0ff] xl:hidden`}>
              <Icon d={ICONS.menu} className="h-5 w-5" />
              <Ticks />
            </button>
            <Logo focusRing={focusRing} />
          </div>

          {/* CENTER: links styled as keyboard keys */}
          <div className="hidden items-start gap-2 self-center xl:flex">
            {mainLinks.map(renderLink)}
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-2.5">
            <NavLink
              to={signIn.to}
              className={({ isActive }) =>
                `gm-key hidden self-center px-5 py-2 text-[13px] font-black uppercase tracking-wider xl:block ${focusRing} ${isActive ? `gm-key-on text-white ${GLOW_TEXT}` : 'text-zinc-300 hover:text-white'}`
              }
            >
              {signIn.label}
            </NavLink>

            {/* search: sharp box with the shortcut on desktop, icon on smaller screens */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className={`group relative hidden h-10 items-center gap-3 border border-[#2f7bff]/40 bg-[#06102b] pl-3 pr-2 text-[14px] font-bold uppercase tracking-wider text-zinc-400 transition hover:border-[#8ab8ff] hover:text-white hover:shadow-[0_0_18px_rgba(47,123,255,0.55)] xl:flex ${focusRing}`}
            >
              <Icon d={ICONS.search} className="h-[18px] w-[18px]" />
              <span className="pr-5">Search</span>
              <kbd className="border border-[#2f7bff]/50 bg-[#2f7bff]/10 px-1.5 py-0.5 text-[11px] font-black leading-none text-[#8ab8ff]">{IS_MAC ? '\u2318 K' : 'Ctrl K'}</kbd>
              <Ticks />
            </button>
            <button type="button" onClick={openSearch} aria-label="Search" className={`${iconBtn} xl:hidden`}>
              <Icon d={ICONS.search} className="h-[18px] w-[18px]" />
              <Ticks />
            </button>

            <div className="relative hidden xl:block" ref={bellRef}>
              <button
                type="button"
                aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
                aria-expanded={bell}
                onClick={() => setBell((v) => !v)}
                className={iconBtn}
              >
                <Icon d={ICONS.bell} className="h-[18px] w-[18px]" />
                <Ticks />
                {unread > 0 && <span className="absolute -right-1.5 -top-1.5 z-10 flex h-4 min-w-4 items-center justify-center bg-[#3d8bff] px-1 text-[11px] font-black text-white shadow-[0_0_10px_rgba(47,123,255,0.9)]">{unread}</span>}
              </button>
              {bell && (
                <div className="absolute right-0 top-full z-40 w-80 pt-3">
                  <Frame className="gm-pop">
                    {panelLine}
                    <div className="flex items-center justify-between px-4 pb-1 pt-3">
                      <span className="text-sm font-black uppercase tracking-wider text-white">Notifications</span>
                      <button
                        type="button"
                        onClick={readAll}
                        disabled={unread === 0}
                        className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#6fa8ff] transition hover:text-white disabled:cursor-default disabled:text-zinc-600 disabled:hover:text-zinc-600 ${focusRing}`}
                      >
                        <Icon d={ICONS.check} className="h-3.5 w-3.5" />
                        Mark all read
                      </button>
                    </div>
                    <div className="p-2 pb-4">
                      {notes.length === 0 && <p className="p-3 text-[15px] text-zinc-500">You're all caught up.</p>}
                      {notes.map((n) => (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => readOne(n.id)}
                          className={`flex w-full items-start gap-3 border-l-2 p-3 text-left transition hover:bg-[#2f7bff]/10 ${n.read ? 'border-transparent' : 'border-[#3d8bff]'} ${focusRing}`}
                        >
                          <span className="block">
                            <span className={`block text-[15px] leading-snug ${n.read ? 'text-zinc-500' : 'text-zinc-200'}`}>{n.text}</span>
                            <span className="mt-0.5 block text-xs font-bold uppercase tracking-wider text-zinc-600">{n.time}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </Frame>
                </div>
              )}
            </div>

            <Link to="/signup" onMouseEnter={ctaEnter} onMouseMove={ctaMove} onMouseLeave={ctaLeave} className={`gm-cta ml-1 hidden transition-transform duration-200 ease-out xl:block ${focusRing}`}>
              <span className="gm-pulse block">
                <span className="relative flex items-center gap-2 overflow-hidden px-8 py-3 text-[14px] font-black uppercase italic tracking-wider text-white" style={{ clipPath: SLANT, backgroundImage: BLUE_BTN }}>
                  <span className="gm-sheen pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  <Icon d={ICONS.crown} fill="currentColor" className="relative h-4 w-4" />
                  <span className="relative">{BRAND.cta}</span>
                </span>
              </span>
            </Link>
            <Link to="/signup" aria-label={BRAND.cta} className={`gm-pulse block xl:hidden ${focusRing}`}>
              <span className="flex h-10 w-11 items-center justify-center text-white" style={{ clipPath: SLANT, backgroundImage: BLUE_BTN }}>
                <Icon d={ICONS.crown} fill="currentColor" className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </nav>

        {/* SERVICE PANEL (desktop), centred under the links */}
        {menu && (
          <div className="pointer-events-none absolute left-1/2 top-full z-40 hidden -translate-x-1/2 xl:block">
            <div className="pointer-events-auto w-[600px] pt-3" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
              <Frame n={18} className="gm-pop">
                {panelLine}
                <div className="grid grid-cols-[1.2fr_1fr] gap-2 p-2 pb-4">
                  <div>
                    {services.map((s) => (
                      <Link key={s.to} to={s.to} className={`group/item flex items-start gap-3 border-l-2 border-transparent p-3 transition hover:border-[#3d8bff] hover:bg-[#2f7bff]/10 ${focusRing}`}>
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[#3d8bff]/50 bg-[#2f7bff]/10 text-[#6fa8ff] transition group-hover/item:bg-[#3d8bff] group-hover/item:text-white group-hover/item:shadow-[0_0_14px_rgba(47,123,255,0.8)]">
                          <Icon d={s.d} className="h-[18px] w-[18px]" />
                        </span>
                        <span>
                          <span className="block text-[15px] font-black uppercase leading-tight tracking-wide text-white">{s.title}</span>
                          <span className="mt-1 block text-sm leading-snug text-zinc-400">{s.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to="/signup"
                    onMouseMove={tilt}
                    onMouseLeave={untilt}
                    className={`gm-feat group/feat relative flex flex-col justify-end overflow-hidden border border-[#3d8bff]/40 bg-[#2f7bff]/[0.07] p-4 ${focusRing}`}
                  >
                    <Ticks />
                    <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#2f7bff]/30 blur-2xl transition group-hover/feat:bg-[#2f7bff]/50" />
                    <span className="drop-shadow-[0_0_14px_rgba(47,123,255,0.7)]">
                      <span
                        className="gm-card relative mb-4 flex h-[72px] w-32 flex-col justify-between overflow-hidden p-2.5 text-white"
                        style={{ clipPath: cutPoly(10), backgroundImage: BLUE_PASS }}
                        aria-hidden="true"
                      >
                        <span className="gm-glare pointer-events-none absolute inset-0" />
                        <span className="relative flex items-center justify-between">
                          <span className="text-[11px] font-black italic leading-none tracking-wider">{BRAND.name}</span>
                          <Icon d={ICONS.crown} fill="currentColor" className="h-4 w-4" />
                        </span>
                        <span className="relative text-[10px] font-black leading-none tracking-[0.2em]">{BRAND.badge}</span>
                      </span>
                    </span>
                    <span className="relative text-lg font-black uppercase italic leading-tight text-white">Skip the queue</span>
                    <span className="relative mt-1 text-sm leading-snug text-zinc-400">Priority support and early access to new laptop drops.</span>
                    <span className={`relative mt-3 flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-[#6fa8ff] ${GLOW_TEXT}`}>
                      {BRAND.cta} <Icon d={ICONS.arrow} className="h-4 w-4 transition-transform duration-300 group-hover/feat:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </Frame>
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN MENU (phones and tablets) */}
      <div
        ref={loungeRef}
        className="fixed inset-0 z-[70] overflow-y-auto bg-[#03060f] text-white"
        style={{
          clipPath: lounge ? 'circle(150% at 44px 52px)' : 'circle(0px at 44px 52px)',
          visibility: lounge ? 'visible' : 'hidden',
          transition: `clip-path .75s cubic-bezier(.77,0,.18,1), visibility 0s linear ${lounge ? '0s' : '.75s'}`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!lounge}
      >
        <div className="pointer-events-none fixed inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0_1px,transparent_1px_3px)]" />
          <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(47,123,255,0.3),transparent)]" />
          <div className="absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(47,123,255,0.18),transparent)]" />
          <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#8ab8ff]" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#8ab8ff]" />
        </div>

        <div className="relative flex min-h-full flex-col px-5 pb-10 pt-4 sm:px-14">
          <div className="flex items-center justify-between">
            <button ref={loungeCloseRef} type="button" onClick={() => setLounge(false)} aria-label="Close menu" className={`${iconBtn} text-[#cfe0ff]`}>
              <Icon d={ICONS.close} className="h-5 w-5" />
              <Ticks />
            </button>
            <span className="text-xl font-black uppercase italic tracking-tight">
              {BRAND.nameA}
              <span className={`text-[#3d8bff] ${GLOW_TEXT}`}>{BRAND.nameB}</span>
            </span>
            <button type="button" onClick={openSearch} aria-label="Search" className={iconBtn}>
              <Icon d={ICONS.search} className="h-[18px] w-[18px]" />
              <Ticks />
            </button>
          </div>

          <div className="mt-8 flex flex-1 flex-col justify-center gap-1">
            {allLinks.map(({ to, label, menu: hasMenu }, i) => (
              <div
                key={to}
                className={`transition-all duration-700 ease-out ${lounge ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: lounge ? `${250 + i * 80}ms` : '0ms' }}
              >
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 py-1 text-[clamp(2.4rem,9vw,5rem)] font-black uppercase italic leading-[1.05] tracking-tight transition-colors duration-300 ${focusRing} ${
                      isActive ? `text-[#3d8bff] ${GLOW_TEXT}` : 'text-zinc-600 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`overflow-hidden whitespace-nowrap text-[#3d8bff] transition-all duration-500 ${isActive ? 'w-[1.4em] opacity-100' : 'w-0 opacity-0 group-hover:w-[1.4em] group-hover:opacity-100'}`} aria-hidden="true">{'//'}</span>
                      {label}
                    </>
                  )}
                </NavLink>
                {hasMenu && (
                  <div className="mb-2 flex flex-wrap gap-2 pl-1 pt-1">
                    {services.map((s) => (
                      <Link key={s.to} to={s.to} className={`border border-[#3d8bff]/60 px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-[#6fa8ff] transition hover:bg-[#3d8bff] hover:text-white hover:shadow-[0_0_16px_rgba(47,123,255,0.8)] ${focusRing}`}>
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={`mt-10 flex flex-col gap-4 transition-all duration-700 ease-out sm:flex-row sm:items-center sm:justify-between ${lounge ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: lounge ? '650ms' : '0ms' }}
          >
            <Link to="/signup" className={`gm-pulse block ${focusRing}`}>
              <span className="flex items-center justify-center gap-2 px-12 py-4 text-xl font-black uppercase italic tracking-wider text-white" style={{ clipPath: SLANT, backgroundImage: BLUE_BTN }}>
                <Icon d={ICONS.crown} fill="currentColor" className="h-6 w-6" />
                {BRAND.cta}
              </span>
            </Link>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">{BRAND.ticker[0]}</span>
          </div>
        </div>
      </div>

      {/* SEARCH PALETTE (Ctrl/Cmd+K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/80 px-4 pt-[15vh] backdrop-blur-sm" onClick={() => setSearchOpen(false)} role="dialog" aria-modal="true" aria-label="Search">
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <Frame n={18} className="gm-pop">
              {panelLine}
              <div className="flex items-center gap-3 border-b border-[#2f7bff]/25 px-5 py-4 text-[#6fa8ff]">
                <Icon d={ICONS.search} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onSearchKey}
                  placeholder="SEARCH PAGES, LAPTOPS AND SERVICES"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="gm-results"
                  aria-activedescendant={results[active] ? `gm-opt-${active}` : undefined}
                  aria-autocomplete="list"
                  className="w-full bg-transparent text-base font-bold uppercase tracking-wider text-white outline-none placeholder:text-zinc-600"
                />
                <kbd className="hidden border border-[#2f7bff]/50 px-1.5 py-0.5 text-[11px] font-black leading-none text-[#8ab8ff] sm:block">Esc</kbd>
              </div>
              <div id="gm-results" role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="p-4 text-base text-zinc-500">
                    Nothing matches "{query}". Try "gaming", "warranty" or "support".
                  </p>
                )}
                {results.map((r, i) => (
                  <React.Fragment key={`${r.group}-${r.to}-${r.label}`}>
                    {!q && (i === 0 || results[i - 1].group !== r.group) && (
                      <p className="px-4 pb-1 pt-3 text-xs font-black uppercase tracking-[0.2em] text-[#3d8bff]/70" role="presentation">{r.group}</p>
                    )}
                    <button
                      id={`gm-opt-${i}`}
                      role="option"
                      aria-selected={i === active}
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                      className={`flex w-full items-center justify-between border-l-2 px-4 py-3 text-left text-base font-bold uppercase tracking-wide transition ${
                        i === active ? 'border-[#3d8bff] bg-[#2f7bff]/15 text-white' : 'border-transparent text-zinc-300'
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        <Hl text={r.label} q={q} />
                        {q && <span className="text-xs font-bold tracking-wider text-zinc-600">{r.group}</span>}
                      </span>
                      <Icon d={ICONS.arrow} className={`h-4 w-4 ${i === active ? 'text-[#3d8bff]' : 'opacity-30'}`} />
                    </button>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-4 border-t border-[#2f7bff]/25 px-5 py-2.5 pb-4 text-xs font-bold uppercase tracking-wider text-zinc-600" aria-hidden="true">
                <span><kbd className="mr-1 text-[#6fa8ff]">{'\u2191\u2193'}</kbd>move</span>
                <span><kbd className="mr-1 text-[#6fa8ff]">{'\u21B5'}</kbd>open</span>
                <span><kbd className="mr-1 text-[#6fa8ff]">Esc</kbd>close</span>
              </div>
            </Frame>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
