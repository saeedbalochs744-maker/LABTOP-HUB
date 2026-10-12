import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

/*
  LAPTOPHUB VIP PRO MAX navbar  ("The Blue Coin")
   1. A blue ticker runs across the very top of the page.
   2. A full-width navy bar with a blue edge that lights up under the cursor.
   3. The logo is a real coin hanging off the bar. Hover it and it flips.
   4. The Service menu opens as a wide panel with a mini VIP member card.
   5. On phones and tablets the menu opens as a full-screen "lounge" with huge links.
  All motion switches off for visitors who prefer reduced motion.
  Palette: navy #050a1c, blue #2f7bff, ice #cfe0ff, deep blue #1e3a8a
  Type: Barlow Condensed (falls back to Arial Narrow / system condensed)
*/

/* ============ SETTINGS ============ */
const BRAND = {
  name: 'LAPTOPHUB',
  nameA: 'LAPTOP', // first part of the logo text (silver shine)
  nameB: 'HUB', // second part of the logo text (blue glow)
  cta: 'Join VIP',
  badge: 'VIP MEMBER',
  ticker: [
    'Genuine laptops with warranty',
    'Free shipping on selected models',
    'Expert support, any time',
    'Join VIP today',
  ],
}
/* ================================== */

const leftLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
const rightLinks = [
  { to: '/service', label: 'Service', menu: true },
  { to: '/signin', label: 'Sign In' },
]
const allLinks = [...leftLinks, ...rightLinks]

const services = [
  { to: '/service#consultation', title: 'Laptop consultation', desc: 'We help you pick the right laptop.', d: 'M3 5h18v12H3zM8 21h8M12 17v4' },
  { to: '/service#warranty', title: 'Warranty', desc: 'Clear coverage on every laptop.', d: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z' },
  { to: '/service#support', title: 'Priority support', desc: 'Direct line to our team, any time.', d: 'M4 13v-1a8 8 0 0116 0v1M4 13h3v5H4zM17 13h3v5h-3zM17 18c0 2-2 3-5 3' },
]

const notifications = [
  { id: 1, text: 'Welcome to LaptopHub. Finish setting up your profile.' },
  { id: 2, text: 'New gaming laptops just arrived.' },
]

const searchItems = [
  ...allLinks.map(({ to, label }) => ({ to, label })),
  ...services.map(({ to, title }) => ({ to, label: title })),
  { to: '/service#gaming', label: 'Gaming laptops' },
  { to: '/service#business', label: 'Business laptops' },
  { to: '/service#student', label: 'Student laptops' },
  { to: '/signup', label: BRAND.cta },
]

const ICONS = {
  search: 'M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z',
  bell: 'M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevron: 'M6 9l6 6 6-6',
  crown: 'M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z',
  menu: 'M4 7h16M4 12h10M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
}

const Icon = ({ d, className = 'h-4 w-4', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

const cut = (n) =>
  `polygon(${n}px 0,calc(100% - ${n}px) 0,100% ${n}px,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,${n}px 100%,0 calc(100% - ${n}px),0 ${n}px)`
const BLUE_BTN = 'linear-gradient(180deg,#6fa0ff,#2f7bff 55%,#1d4ed8)'
const BLUE_FOIL = 'linear-gradient(115deg,#1e3a8a,#6fa0ff 35%,#2f7bff 55%,#1e3a8a)'
const SLANT = 'polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)'

const BAR_BIG = 80
const BAR_SMALL = 60

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&display=swap');
.vip { font-family: 'Barlow Condensed', 'Arial Narrow', 'Roboto Condensed', system-ui, sans-serif; }
.vip-grad-text { background-image: linear-gradient(180deg,#e6efff,#2f7bff 55%,#1d4ed8); }
.vip-link::after { content:''; position:absolute; left:1.1rem; right:1.1rem; bottom:1.15rem; height:2px; background:#2f7bff; box-shadow:0 0 12px 1px rgba(47,123,255,.85); transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(.22,1,.36,1) }
.vip-link:hover::after, .vip-link[aria-current='page']::after { transform:scaleX(1) }
.vip-marquee { animation: vip-marquee 38s linear infinite }
.vip-rim { animation: vip-spin 9s linear infinite }
.vip-pop { animation: vip-pop .22s ease-out }
.vip-cta:hover .vip-sheen { animation: vip-shine .8s ease }
.vip-word { transition: letter-spacing .5s cubic-bezier(.22,1,.36,1) }
.vip-word:hover { letter-spacing: .24em }
.vip-word-a, .vip-word-b { background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: vip-wordshine 4.5s ease-in-out infinite }
.vip-word-a { background-image: linear-gradient(110deg,#aebfe0 0%,#dbe7ff 38%,#ffffff 50%,#dbe7ff 62%,#aebfe0 100%) }
.vip-word-b { background-image: linear-gradient(110deg,#1d4ed8 0%,#2f7bff 38%,#d6e4ff 50%,#2f7bff 62%,#1d4ed8 100%); filter: drop-shadow(0 0 9px rgba(47,123,255,.65)); animation-delay: .25s }
.vip-word-line { position:absolute; left:0; right:0; bottom:-7px; height:2px; background: linear-gradient(90deg, transparent, #2f7bff 30%, #9fc0ff 50%, #2f7bff 70%, transparent); opacity:.85; transform-origin:left; animation: vip-wordline 4.5s ease-in-out infinite }
@keyframes vip-wordshine { 0%, 15% { background-position: 100% 0 } 55%, 100% { background-position: 0 0 } }
@keyframes vip-wordline { 0%, 15% { transform: scaleX(.25); opacity:.4 } 55%, 100% { transform: scaleX(1); opacity:.9 } }
.vip-shimmer { animation: vip-shimmer 5.5s ease-in-out infinite }
.vip-halo { animation: vip-halo 3s ease-out infinite }
@keyframes vip-shimmer { 0% { transform: translateX(-120%) } 100% { transform: translateX(420%) } }
@keyframes vip-halo { 0% { transform: scale(.95); opacity: .7 } 100% { transform: scale(1.5); opacity: 0 } }
@keyframes vip-marquee { to { transform: translateX(-25%) } }
@keyframes vip-spin { to { transform: rotate(360deg) } }
@keyframes vip-pop { from { opacity:0; transform: translateY(6px) } to { opacity:1; transform:none } }
@keyframes vip-shine { from { transform: translateX(-130%) skewX(-22deg) } to { transform: translateX(380%) skewX(-22deg) } }
@media (prefers-reduced-motion: reduce) { .vip-marquee, .vip-rim, .vip-pop, .vip-shimmer, .vip-halo, .vip-word-a, .vip-word-b, .vip-word-line, .vip-cta:hover .vip-sheen { animation: none } .vip-link::after { transition: none } }
`

/* Crest on the coin: an "L" for LaptopHub */
const Crest = ({ className = 'h-8 w-7' }) => (
  <svg viewBox="0 0 40 44" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="vipg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e6efff" />
        <stop offset=".55" stopColor="#2f7bff" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    <path d="M20 1l17 6v17c0 9-7 16-17 19C10 40 3 33 3 24V7z" fill="#050a1c" stroke="url(#vipg)" strokeWidth="2" />
    <path d="M14 12v19h13" fill="none" stroke="url(#vipg)" strokeWidth="3.4" strokeLinecap="square" />
  </svg>
)

/* The coin logo: milled edge, shimmering rim, flips on hover */
const Coin = ({ scrolled, top }) => (
  <div className="pointer-events-none absolute left-1/2 z-30 h-[92px] w-[92px] -translate-x-1/2 transition-[top] duration-500" style={{ top }}>
    <Link
      to="/"
      aria-label="LaptopHub home"
      className="group pointer-events-auto block h-full w-full rounded-full transition-transform duration-500 [perspective:700px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfe0ff]"
      style={{ transform: scrolled ? 'scale(.78)' : 'scale(1)' }}
    >
      <span className="vip-halo pointer-events-none absolute inset-0 rounded-full border border-[#2f7bff]/60" aria-hidden="true" />
      <span className="relative block h-full w-full rounded-full drop-shadow-[0_10px_18px_rgba(47,123,255,0.5)] transition-transform duration-[900ms] ease-out group-hover:[transform:rotateY(360deg)]">
        <span className="vip-rim absolute inset-0 rounded-full" style={{ backgroundImage: 'conic-gradient(#e6efff,#2f7bff,#1e3a8a,#2f7bff,#e6efff,#2f7bff,#1e3a8a,#2f7bff,#e6efff)' }} />
        <span className="absolute inset-0 rounded-full" style={{ backgroundImage: 'repeating-conic-gradient(rgba(0,0,0,0.5) 0 1.6deg, transparent 1.6deg 6deg)' }} />
        <span className="absolute inset-[7px] rounded-full" style={{ backgroundImage: 'linear-gradient(145deg,#e6efff,#2f7bff 45%,#1e3a8a)' }} />
        <span className="absolute inset-[11px] rounded-full bg-[#050a1c]" />
        <span className="absolute inset-[15px] rounded-full border border-[#2f7bff]/60" />
        <span className="absolute inset-0 flex items-center justify-center"><Crest /></span>
      </span>
    </Link>
  </div>
)

/* Blue ticker strip */
const Ticker = () => (
  <div className="group overflow-hidden text-white" style={{ backgroundImage: 'linear-gradient(90deg,#1e3a8a,#2563eb 25%,#2f7bff 50%,#2563eb 75%,#1e3a8a)' }}>
    <div className="vip-marquee flex w-max group-hover:[animation-play-state:paused]">
      {[0, 1, 2, 3].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
          {BRAND.ticker.map((text) => (
            <span key={text} className="flex items-center whitespace-nowrap py-1.5 pl-6 text-[14px] font-bold tracking-wide">
              {text}
              <span className="ml-6 h-1.5 w-1.5 rotate-45 bg-white/70" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)

/* Stylish logo text: silver part + glowing blue part, a light sweep, a growing underline.
   Change the words in BRAND.nameA and BRAND.nameB at the top of the file. */
const Wordmark = ({ className = 'text-[26px]' }) => (
  <span className={`vip-word relative inline-flex items-baseline font-extrabold uppercase leading-none tracking-[0.16em] ${className}`}>
    <span className="vip-word-a">{BRAND.nameA}</span>
    <span className="vip-word-b">{BRAND.nameB}</span>
    <span className="vip-word-line" aria-hidden="true" />
  </span>
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
  const [progress, setProgress] = useState(0)
  const [lounge, setLounge] = useState(false)
  const [menu, setMenu] = useState(false)
  const [bell, setBell] = useState(false)
  const [unread, setUnread] = useState(notifications.length)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const barRef = useRef(null)
  const bellRef = useRef(null)
  const closeTimer = useRef(null)
  const ctaBox = useRef(null)

  const barH = scrolled ? BAR_SMALL : BAR_BIG

  const showMenu = () => { clearTimeout(closeTimer.current); setMenu(true) }
  const hideMenu = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMenu(false), 180) }

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
    e.currentTarget.style.transform = `translate(${(e.clientX - (b.left + b.width / 2)) * 0.22}px, ${(e.clientY - (b.top + b.height / 2)) * 0.32}px)`
  }
  const ctaLeave = (e) => { e.currentTarget.style.transform = '' }

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 16)
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
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
    onScroll()
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

  useEffect(() => {
    setLounge(false)
    setMenu(false)
    setBell(false)
    setSearchOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = lounge ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lounge])

  useEffect(() => setActive(0), [query, searchOpen])

  const results = searchItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
  const go = (to) => {
    setSearchOpen(false)
    setQuery('')
    navigate(to)
  }
  const onSearchKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[active]) go(results[active].to)
  }

  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7bff]'
  const linkClass = ({ isActive }) =>
    `vip-link relative flex items-center gap-1.5 px-[1.1rem] text-[17px] font-semibold tracking-wide transition-colors duration-300 ${focusRing} ${
      isActive ? 'text-[#cfe0ff]' : 'text-zinc-400 hover:text-white'
    }`
  const iconBtn = `relative flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-[#2f7bff]/70 hover:text-[#cfe0ff] ${focusRing}`
  const panel = 'border border-[#2f7bff]/30 bg-[#070d1f] shadow-[0_28px_60px_-10px_rgba(0,0,0,1)]'
  const panelLine = <div className="h-[2px] bg-gradient-to-r from-transparent via-[#2f7bff] to-transparent" />

  const renderLink = ({ to, label, menu: hasMenu }) => (
    <div
      key={to}
      className="flex self-stretch"
      onMouseEnter={hasMenu ? showMenu : undefined}
      onMouseLeave={hasMenu ? hideMenu : undefined}
      onFocus={hasMenu ? showMenu : undefined}
      onBlur={hasMenu ? (e) => !e.currentTarget.contains(e.relatedTarget) && hideMenu() : undefined}
    >
      <NavLink to={to} end={to === '/'} className={linkClass}>
        {label}
        {hasMenu && <Icon d={ICONS.chevron} className={`h-3.5 w-3.5 transition-transform duration-300 ${menu ? 'rotate-180 text-[#2f7bff]' : ''}`} />}
      </NavLink>
    </div>
  )

  return (
    <header className="vip sticky top-0 z-50">
      <style>{css}</style>

      {/* TICKER: folds away on scroll */}
      <div className={`overflow-hidden transition-all duration-500 ${scrolled ? 'max-h-0' : 'max-h-9'}`} aria-hidden={scrolled}>
        <Ticker />
      </div>

      {/* MAIN BAR */}
      <div ref={barRef} className="relative" onMouseMove={onBarMove} onMouseLeave={onBarLeave}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050a1c] shadow-[0_22px_40px_-14px_rgba(0,0,0,0.75)]" aria-hidden="true">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.022)_0_2px,transparent_2px_4px)]" />
          <StreakBackground />
          <div className="absolute -left-24 top-0 h-full w-80 bg-[radial-gradient(closest-side,rgba(47,123,255,0.18),transparent)]" />
          <div className="absolute -right-24 top-0 h-full w-80 bg-[radial-gradient(closest-side,rgba(47,123,255,0.18),transparent)]" />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: 'var(--so, 0)', backgroundImage: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(47,123,255,0.22), transparent 65%)' }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2f7bff]/80 to-transparent" />
          <div className="vip-shimmer absolute bottom-0 left-0 h-[2px] w-1/4 bg-gradient-to-r from-transparent via-[#9fc0ff] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#1e3a8a] via-[#2f7bff] to-[#9fc0ff] shadow-[0_0_10px_rgba(47,123,255,0.9)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav aria-label="Main" className="relative mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-stretch px-3 transition-[height] duration-500 sm:px-8" style={{ height: barH }}>
          {/* LEFT */}
          <div className="flex items-center gap-3 xl:gap-8">
            <button type="button" onClick={() => setLounge(true)} aria-label="Open menu" className={`${iconBtn} h-11 w-11 text-[#cfe0ff] xl:hidden`}>
              <Icon d={ICONS.menu} className="h-5 w-5" />
            </button>
            <Link to="/" aria-label={`${BRAND.name} home`} className={`hidden pb-2 sm:block ${focusRing}`}>
              <Wordmark />
            </Link>
            <div className="hidden self-stretch xl:flex">{leftLinks.map(renderLink)}</div>
          </div>

          {/* CENTER: space for the coin */}
          <div className="w-24" aria-hidden="true" />

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden self-stretch xl:flex">{rightLinks.map(renderLink)}</div>
            <span className="mx-2 hidden h-6 w-px bg-white/15 xl:block" aria-hidden="true" />

            <button type="button" onClick={() => setSearchOpen(true)} title="Search (Ctrl K)" aria-label="Search" className={iconBtn}>
              <Icon d={ICONS.search} className="h-[18px] w-[18px]" />
            </button>

            <div className="relative hidden xl:block" ref={bellRef}>
              <button type="button" aria-label="Notifications" aria-expanded={bell} onClick={() => { setBell((v) => !v); setUnread(0) }} className={iconBtn}>
                <Icon d={ICONS.bell} className="h-[18px] w-[18px]" />
                {unread > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center bg-[#2f7bff] px-1 text-[11px] font-bold text-white">{unread}</span>}
              </button>
              {bell && (
                <div className="vip-pop absolute right-0 top-full z-40 w-72 pt-4">
                  <div className={panel}>
                    {panelLine}
                    <div className="p-2">
                      {notifications.map((n) => (
                        <p key={n.id} className="p-3 text-[15px] leading-snug text-zinc-300 hover:bg-white/[0.06]">{n.text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/signup"
              onMouseEnter={ctaEnter}
              onMouseMove={ctaMove}
              onMouseLeave={ctaLeave}
              className={`vip-cta group relative ml-1 hidden overflow-hidden px-7 py-2.5 text-[17px] font-extrabold tracking-wide text-white transition-transform duration-200 ease-out xl:block ${focusRing}`}
              style={{ clipPath: SLANT, backgroundImage: BLUE_BTN }}
            >
              <span className="vip-sheen pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <span className="relative flex items-center gap-2">
                <Icon d={ICONS.crown} fill="currentColor" className="h-4 w-4" />
                {BRAND.cta}
              </span>
            </Link>
            <Link to="/signup" aria-label={BRAND.cta} className={`flex h-11 w-11 items-center justify-center text-white xl:hidden ${focusRing}`} style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)', backgroundImage: BLUE_BTN }}>
              <Icon d={ICONS.crown} fill="currentColor" className="h-5 w-5" />
            </Link>
          </div>
        </nav>

        <Coin scrolled={scrolled} top={barH - 52} />

        {/* SERVICE PANEL (desktop) */}
        {menu && (
          <div className="pointer-events-none absolute inset-x-0 top-full z-40 hidden xl:block">
            <div className="mx-auto flex max-w-[1400px] justify-end px-8">
              <div className="vip-pop pointer-events-auto w-[540px] pt-3" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
                <div className={panel}>
                  {panelLine}
                  <div className="grid grid-cols-[1.2fr_1fr] gap-2 p-2">
                    <div>
                      {services.map((s) => (
                        <Link key={s.to} to={s.to} className={`group/item flex items-start gap-3 p-3 transition hover:bg-white/[0.06] ${focusRing}`}>
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[#2f7bff]/50 text-[#2f7bff] transition group-hover/item:bg-[#2f7bff] group-hover/item:text-white">
                            <Icon d={s.d} className="h-[18px] w-[18px]" />
                          </span>
                          <span>
                            <span className="block text-[17px] font-bold leading-tight text-white">{s.title}</span>
                            <span className="mt-0.5 block text-sm leading-snug text-zinc-400">{s.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link to="/signup" className={`group/feat relative flex flex-col justify-end overflow-hidden border border-[#2f7bff]/40 bg-[repeating-linear-gradient(135deg,rgba(47,123,255,0.08)_0_2px,transparent_2px_9px)] p-4 ${focusRing}`}>
                      <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#2f7bff]/25 blur-2xl transition group-hover/feat:bg-[#2f7bff]/40" />
                      <span
                        className="relative mb-4 flex h-[72px] w-32 -rotate-3 flex-col justify-between p-2.5 text-white shadow-[0_10px_24px_-6px_rgba(47,123,255,0.55)] transition-transform duration-500 group-hover/feat:rotate-0 group-hover/feat:scale-105"
                        style={{ clipPath: cut(9), backgroundImage: BLUE_FOIL }}
                        aria-hidden="true"
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-[13px] font-extrabold leading-none tracking-[0.2em]">{BRAND.name}</span>
                          <Icon d={ICONS.crown} fill="currentColor" className="h-4 w-4" />
                        </span>
                        <span className="text-[12px] font-bold leading-none tracking-[0.18em]">{BRAND.badge}</span>
                      </span>
                      <span className="relative text-xl font-extrabold leading-tight text-[#cfe0ff]">Skip the queue</span>
                      <span className="relative mt-1 text-sm leading-snug text-zinc-400">Priority support and early access to new laptop drops.</span>
                      <span className="relative mt-3 flex items-center gap-1.5 text-[15px] font-bold text-white">
                        {BRAND.cta} <Icon d={ICONS.arrow} className="h-4 w-4 transition-transform duration-300 group-hover/feat:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN LOUNGE MENU (phones and tablets) */}
      <div
        className="fixed inset-0 z-[70] overflow-y-auto bg-[#050a1c] text-white"
        style={{
          clipPath: lounge ? 'circle(150% at 44px 48px)' : 'circle(0px at 44px 48px)',
          visibility: lounge ? 'visible' : 'hidden',
          transition: `clip-path .75s cubic-bezier(.77,0,.18,1), visibility 0s linear ${lounge ? '0s' : '.75s'}`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!lounge}
      >
        <div className="pointer-events-none fixed inset-0" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(47,123,255,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0_2px,transparent_2px_4px)]" />
          <span className="absolute -bottom-4 left-0 whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-[0.06em] text-white/[0.03]">{BRAND.name}</span>
        </div>

        <div className="relative flex min-h-full flex-col px-5 pb-10 pt-3 sm:px-14">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setLounge(false)} aria-label="Close menu" className={`${iconBtn} h-11 w-11 text-[#cfe0ff]`}>
              <Icon d={ICONS.close} className="h-5 w-5" />
            </button>
            <span className="pb-2"><Wordmark className="text-[20px]" /></span>
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className={iconBtn}>
              <Icon d={ICONS.search} className="h-[18px] w-[18px]" />
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
                    `group flex items-center gap-4 py-1 text-[clamp(2.6rem,9vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight transition-colors duration-300 ${focusRing} ${
                      isActive ? 'text-[#cfe0ff]' : 'text-zinc-600 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`h-[3px] bg-[#2f7bff] shadow-[0_0_12px_rgba(47,123,255,0.85)] transition-all duration-500 ${isActive ? 'w-10 sm:w-16' : 'w-0 group-hover:w-10 sm:group-hover:w-16'}`} />
                      {label}
                    </>
                  )}
                </NavLink>
                {hasMenu && (
                  <div className="mb-2 flex flex-wrap gap-2 pl-1 pt-1">
                    {services.map((s) => (
                      <Link key={s.to} to={s.to} className={`border border-[#2f7bff]/50 px-4 py-1.5 text-lg font-semibold text-[#6fa0ff] transition hover:bg-[#2f7bff] hover:text-white ${focusRing}`}>
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
            <Link to="/signup" className={`flex items-center justify-center gap-2 px-10 py-4 text-2xl font-extrabold tracking-wide text-white sm:w-auto ${focusRing}`} style={{ clipPath: 'polygon(14px 0,100% 0,calc(100% - 14px) 100%,0 100%)', backgroundImage: BLUE_BTN }}>
              <Icon d={ICONS.crown} fill="currentColor" className="h-6 w-6" />
              {BRAND.cta}
            </Link>
            <span className="text-lg font-semibold text-zinc-500">{BRAND.ticker[0]}</span>
          </div>
        </div>
      </div>

      {/* SEARCH PALETTE (Ctrl+K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/80 px-4 pt-[15vh] backdrop-blur-sm" onClick={() => setSearchOpen(false)} role="dialog" aria-modal="true" aria-label="Search">
          <div className={`vip-pop w-full max-w-lg ${panel}`} onClick={(e) => e.stopPropagation()}>
            {panelLine}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 text-zinc-400">
              <Icon d={ICONS.search} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKey}
                placeholder="Search pages, laptops and services"
                className="w-full bg-transparent text-lg text-white outline-none placeholder:text-zinc-600"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 && <p className="p-4 text-base text-zinc-500">No results for "{query}".</p>}
              {results.map((r, i) => (
                <button key={r.to + r.label} type="button" onMouseEnter={() => setActive(i)} onClick={() => go(r.to)} className={`flex w-full items-center justify-between px-4 py-3 text-left text-lg font-semibold transition ${i === active ? 'bg-white/[0.08] text-[#cfe0ff]' : 'text-zinc-300'}`}>
                  {r.label}
                  <Icon d={ICONS.arrow} className={`h-4 w-4 ${i === active ? 'text-[#2f7bff]' : 'opacity-30'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
