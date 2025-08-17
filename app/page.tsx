'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Wallet as WalletIcon,
  Coins,
  Lock,
  Send,
  Download,
  TrendingUp,
  Key,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: 'easeOut' } }),
}

export default function LandingPage() {
  const activityRows = [
    { t: 'Received', a: '+$210.00', c: 'success' as const },
    { t: 'Sent', a: '-$92.49', c: 'primary' as const },
    { t: 'Remittance', a: '-$500.00', c: 'accent' as const },
  ]

  const badgeBgByColor: Record<typeof activityRows[number]['c'], string> = {
    success: 'bg-success/20',
    primary: 'bg-primary-500/20',
    accent: 'bg-accent-500/20',
  }

  // Transfer calculator state
  const [sendAmount, setSendAmount] = useState<string>('500')
  const [destCurrency, setDestCurrency] = useState<'PHP' | 'CAD'>('PHP')
  const [network, setNetwork] = useState<'Polygon' | 'Ethereum'>('Polygon')
  const [heroTab, setHeroTab] = useState<'transfer' | 'create'>('transfer')
  const [seed, setSeed] = useState<string[]>([])
  const [seedRevealed, setSeedRevealed] = useState<boolean>(false)
  const [seedCopied, setSeedCopied] = useState<boolean>(false)
  const [ackSaved, setAckSaved] = useState<boolean>(false)
  const [creating, setCreating] = useState<boolean>(false)
  const [createdSuccess, setCreatedSuccess] = useState<boolean>(false)

  const rates = { PHP: 55.2, CAD: 1.35 } as const
  const partnerFeePercent = 0.005 // 0.5%
  const networkFeeUSDC = network === 'Polygon' ? 0.02 : 0.2

  const parsedAmount = Number(sendAmount.replace(/[^0-9.]/g, '')) || 0
  const partnerFee = parsedAmount * partnerFeePercent
  const totalFeeUSDC = partnerFee + networkFeeUSDC
  const netUSDC = Math.max(parsedAmount - totalFeeUSDC, 0)
  const receiveFiat = netUSDC * rates[destCurrency]
  const limitOk = parsedAmount <= 8000

  function generateSeed() {
    const demoWordlist = [
      'abandon','ability','able','about','above','absent','absorb','abstract','absurd','abuse','access','accident',
      'account','accuse','achieve','acoustic','acquire','across','act','action','actor','actress','actual','adapt',
      'add','addict','address','adjust','admit','adult','advance','advice'
    ]
    const words: string[] = []
    for (let i = 0; i < 12; i++) {
      const idx = Math.floor(Math.random() * demoWordlist.length)
      words.push(demoWordlist[idx])
    }
    setSeed(words)
    setSeedRevealed(false)
    setAckSaved(false)
    setSeedCopied(false)
    setCreating(false)
    setCreatedSuccess(false)
  }

  function handleCopySeed() {
    navigator.clipboard.writeText(seed.join(' '))
    setSeedCopied(true)
    setTimeout(() => setSeedCopied(false), 2000)
  }

  function handleCreateWallet() {
    setCreating(true)
    setTimeout(() => {
      setCreating(false)
      setCreatedSuccess(true)
    }, 900)
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary-500/25 to-secondary-500/25 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-accent-500/25 to-primary-500/25 blur-3xl animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-secondary-500/10 to-accent-500/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5"
      >
        <div className="flex items-center space-x-3">
          <div className="glow flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight gradient-text">CryptoWallet</div>
            <div className="text-xs text-dark-300">Philippines–Canada remittance</div>
          </div>
        </div>
        <div className="hidden items-center space-x-6 md:flex">
          <a href="#features" className="text-sm text-dark-300 hover:text-white transition-colors">Features</a>
          <a href="#remittance" className="text-sm text-dark-300 hover:text-white transition-colors">Remittance</a>
          <a href="#security" className="text-sm text-dark-300 hover:text-white transition-colors">Security</a>
          <a href="#faq" className="text-sm text-dark-300 hover:text-white transition-colors">FAQ</a>
        </div>
        <motion.a href="#onboarding" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => setHeroTab('create')}
          className="btn-primary rounded-xl px-5 py-2 text-sm font-semibold">
          Create Wallet
        </motion.a>
      </motion.nav>

      {/* Hero */}
      <header className="relative z-10 mx-auto mt-6 max-w-7xl px-6 pb-12 pt-4 md:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-3 inline-flex items-center space-x-2 rounded-full bg-white/5 px-3 py-1 text-xs text-dark-200 ring-1 ring-white/10">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-success" />
              <span>Non‑custodial wallet • Web3‑native • USDC‑first</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
              <span className="gradient-text">The Web3 wallet</span> for Philippines–Canada transfers
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="mb-7 max-w-xl text-base text-dark-200 md:text-lg">
              Create or import a non‑custodial wallet, move USDC with confidence, and convert to PHP or CAD through trusted partners. Ultra‑modern UI. Secure by default.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-3">
              <motion.a
                href="#get-started"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="btn-secondary flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#onboarding"
                onClick={() => setHeroTab('create')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="glass text-dark-100 hover:text-white rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Create Wallet
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="mt-8 flex items-center gap-6 text-xs text-dark-300">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-success" /> AES‑256 local encryption</div>
              <div className="hidden items-center gap-2 md:flex"><Lock className="h-4 w-4 text-primary-400" /> Biometric ready (WebAuthn)</div>
            </motion.div>
          </div>

          {/* Transfer Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div id="onboarding" className="glow shimmer relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-dark-900/60 to-dark-800/60 p-6 shadow-2xl backdrop-blur-md">
              {/* Segmented control */}
              <div className="mb-4 flex rounded-xl bg-dark-900/60 p-1 ring-1 ring-white/10">
                {(['transfer','create'] as const).map((tab) => (
                  <button key={tab}
                    onClick={() => {
                      setHeroTab(tab)
                      if (tab === 'create' && seed.length === 0) generateSeed()
                    }}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                      heroTab === tab ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'text-dark-300 hover:text-white'
                    }`}
                  >
                    {tab === 'transfer' ? 'Transfer' : 'Create Wallet'}
                  </button>
                ))}
              </div>

              {heroTab === 'transfer' ? (
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Start a Transfer</div>
                        <div className="text-xs text-dark-300">USDC → {destCurrency}</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-success/10 px-3 py-1 text-[10px] font-semibold text-success ring-1 ring-success/20">3–5 days</div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs text-dark-300">You send (USDC)</label>
                      <div className="flex items-center gap-3">
                        <input
                          inputMode="decimal"
                          className="input-focus w-full rounded-xl border border-white/10 bg-dark-900/60 px-4 py-3 text-sm placeholder:text-dark-400"
                          placeholder="0.00"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-2 block text-xs text-dark-300">Destination</label>
                        <select
                          className="input-focus w-full rounded-xl border border-white/10 bg-dark-900/60 px-4 py-3 text-sm"
                          value={destCurrency}
                          onChange={(e) => setDestCurrency(e.target.value as 'PHP' | 'CAD')}
                        >
                          <option value="PHP">PHP (Philippine Peso)</option>
                          <option value="CAD">CAD (Canadian Dollar)</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-dark-300">Network</label>
                        <select
                          className="input-focus w-full rounded-xl border border-white/10 bg-dark-900/60 px-4 py-3 text-sm"
                          value={network}
                          onChange={(e) => setNetwork(e.target.value as 'Polygon' | 'Ethereum')}
                        >
                          <option value="Polygon">Polygon (low fees)</option>
                          <option value="Ethereum">Ethereum</option>
                        </select>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-2xl bg-dark-800/60 p-4 ring-1 ring-white/5">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-dark-300">Rate</span>
                        <span>1 USDC ≈ {destCurrency === 'PHP' ? '₱' : '$'}{rates[destCurrency].toFixed(2)} {destCurrency}</span>
                      </div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-dark-300">Partner fee (0.5%)</span>
                        <span>{partnerFee.toFixed(2)} USDC</span>
                      </div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-dark-300">Network fee ({network})</span>
                        <span>{networkFeeUSDC.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-300">You receive (est.)</span>
                        <span className="font-semibold">{destCurrency === 'PHP' ? '₱' : '$'}{receiveFiat.toLocaleString(undefined, { maximumFractionDigits: 2 })} {destCurrency}</span>
                      </div>
                    </div>

                    {!limitOk && (
                      <div className="rounded-xl bg-error/10 px-4 py-2 text-xs text-error ring-1 ring-error/20">Exceeds $8,000 CAD limit. Please lower the amount.</div>
                    )}

                    <div className="flex items-center gap-3">
                      <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="btn-primary flex-1 rounded-xl px-5 py-3 text-sm font-bold">
                        Connect Wallet
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        disabled={!parsedAmount || !limitOk}
                        className="btn-secondary flex-1 rounded-xl px-5 py-3 text-sm font-bold disabled:opacity-60"
                      >
                        Start Transfer
                      </motion.button>
                    </div>
                    <div className="text-[10px] text-dark-400">Rates indicative. Final amount confirmed after on-chain confirmation and partner quote.</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                        <Key className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Create a Wallet</div>
                        <div className="text-xs text-dark-300">Keys stored locally. We never see them.</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-primary-500/10 px-3 py-1 text-[10px] font-semibold text-primary-300 ring-1 ring-primary-500/20">Non‑custodial</div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-dark-800/60 p-4 ring-1 ring-white/5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold">Seed phrase</div>
                        <button
                          onClick={() => {
                            if (seed.length === 0) generateSeed()
                            setSeedRevealed((v) => !v)
                          }}
                          className="text-xs text-primary-300 hover:text-primary-200"
                        >
                          {seedRevealed ? (
                            <span className="inline-flex items-center gap-1"><EyeOff className="h-3.5 w-3.5" /> Hide</span>
                          ) : (
                            <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> Reveal</span>
                          )}
                        </button>
                      </div>

                      {seedRevealed ? (
                        <div className="grid grid-cols-3 gap-2">
                          {seed.map((w, i) => (
                            <div key={`${w}-${i}`} className="rounded-lg bg-dark-900/70 p-2 text-center">
                              <div className="text-[10px] text-dark-400">{i + 1}</div>
                              <div className="font-mono text-xs">{w}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-dark-900/60 p-4 text-xs text-dark-300">Hidden for your security. Click Reveal to view.</div>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <button onClick={handleCopySeed} disabled={!seedRevealed} className="text-xs text-dark-200 hover:text-white disabled:opacity-50">
                          <span className="inline-flex items-center gap-1"><Copy className="h-3.5 w-3.5" /> {seedCopied ? 'Copied' : 'Copy phrase'}</span>
                        </button>
                        <button onClick={generateSeed} className="text-xs text-dark-200 hover:text-white">Regenerate</button>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-dark-200">
                      <input type="checkbox" checked={ackSaved} onChange={(e) => setAckSaved(e.target.checked)} />
                      I have securely backed up my seed phrase. I understand it cannot be recovered if lost.
                    </label>

                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        disabled={!ackSaved || !seedRevealed || creating}
                        onClick={handleCreateWallet}
                        className="btn-primary flex-1 rounded-xl px-5 py-3 text-sm font-bold disabled:opacity-60"
                      >
                        {creating ? 'Creating…' : 'Create Wallet'}
                      </motion.button>
                      <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="glass flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-dark-100 hover:text-white">
                        Set up biometrics
                      </motion.button>
                    </div>

                    {createdSuccess && (
                      <div className="flex items-center justify-between rounded-xl bg-success/10 p-3 text-xs text-success ring-1 ring-success/20">
                        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Wallet created</span>
                        <a href="#" className="text-success hover:underline">Go to App</a>
                      </div>
                    )}

                    <div className="text-[10px] text-dark-400">
                      We never store your keys or seed phrase. All key material is generated and encrypted locally on your device.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Partners */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 text-center text-xs uppercase tracking-wider text-dark-400">Trusted integrations</div>
        <div className="mx-auto grid max-w-4xl grid-cols-2 items-center gap-6 opacity-70 md:grid-cols-4">
          {['Ethereum', 'Polygon', 'Solana', 'WalletConnect'].map((n, i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-3 text-center text-sm">
              {n}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center text-3xl font-extrabold">Ultra‑Modern Web3, Thoughtful UX</motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: <Shield className="h-5 w-5" />, title: 'Non‑Custodial by Design', desc: 'Your keys, your coins. Seed phrase backup, encrypted locally.' },
            { icon: <Zap className="h-5 w-5" />, title: 'Fast & Affordable', desc: 'USDC on Ethereum and Polygon for lower fees and speed.' },
            { icon: <Globe className="h-5 w-5" />, title: 'Philippines–Canada remittance', desc: 'Send USDC and settle to PHP or CAD via trusted partners.' },
            { icon: <TrendingUp className="h-5 w-5" />, title: 'Clean Insights', desc: 'Beautiful analytics and clear transaction history.' },
            { icon: <Lock className="h-5 w-5" />, title: 'Biometric Ready', desc: 'WebAuthn and hardware wallet integrations planned.' },
            { icon: <WalletIcon className="h-5 w-5" />, title: 'Simple Wallet UX', desc: 'Create, import, send, receive — without the clutter.' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="card-hover group rounded-2xl border border-white/10 bg-gradient-to-br from-dark-900/60 to-dark-800/60 p-6 ring-1 ring-white/5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                {f.icon}
              </div>
              <div className="mb-1 text-lg font-semibold">{f.title}</div>
              <div className="text-sm text-dark-300">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Remittance Highlight */}
      <section id="remittance" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="mb-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">Remittance v2</div>
            <h3 className="mb-3 text-3xl font-extrabold">PH ↔️ Canada Transfers</h3>
            <p className="mb-6 max-w-xl text-dark-200">Send USDC and receive PHP or CAD in 3–5 business days. Limits up to $8,000 CAD. Managed via partners to launch fast.</p>
            <ul className="mb-6 space-y-2 text-sm text-dark-200">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary-400" /> Manual processing, transparent status</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary-400" /> USD↔PHP/CAD conversion with clear rates</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent-400" /> Future: MoonPay/Transak or direct rails</li>
            </ul>
            <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="btn-secondary rounded-xl px-6 py-3 text-sm font-bold">
              Learn More
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="glow rounded-3xl border border-white/10 bg-gradient-to-br from-dark-900/60 to-dark-800/60 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-dark-800/60 p-4">
                  <div className="text-xs text-dark-300">PHP Rate</div>
                  <div className="mt-1 text-2xl font-bold">₱55.20</div>
                </div>
                <div className="rounded-xl bg-dark-800/60 p-4">
                  <div className="text-xs text-dark-300">CAD Rate</div>
                  <div className="mt-1 text-2xl font-bold">$1.35</div>
                </div>
                <div className="rounded-xl bg-dark-800/60 p-4">
                  <div className="text-xs text-dark-300">Processing</div>
                  <div className="mt-1 text-2xl font-bold">3–5 days</div>
                </div>
                <div className="rounded-xl bg-dark-800/60 p-4">
                  <div className="text-xs text-dark-300">Limit</div>
                  <div className="mt-1 text-2xl font-bold">$8,000</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 p-8 ring-1 ring-white/10">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-extrabold">Security, by default</h3>
              <p className="mb-4 text-dark-200">Keys never leave your device. We use modern Web Crypto, AES‑256 local encryption, and plan biometric authentication.</p>
              <div className="flex flex-wrap gap-3 text-xs text-dark-200">
                <div className="glass rounded-full px-3 py-1">AES‑256</div>
                <div className="glass rounded-full px-3 py-1">BIP39 • BIP44</div>
                <div className="glass rounded-full px-3 py-1">WebAuthn</div>
                <div className="glass rounded-full px-3 py-1">Hardware Wallets</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ t: 'Local Encryption', i: Shield }, { t: 'Biometric Ready', i: Lock }, { t: 'Multi‑Chain', i: Globe }, { t: 'Trusted Partners', i: Zap }].map((s, i) => (
                <div key={i} className="card-hover flex items-center gap-3 rounded-xl bg-dark-900/60 p-4 ring-1 ring-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                    <s.i className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="glow overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 p-[1px]">
          <div className="rounded-3xl bg-dark-950/70 p-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <div className="text-sm text-dark-300">Get early access</div>
                <h4 className="mt-1 text-2xl font-extrabold">Be first to try the wallet + remittance</h4>
              </div>
              <div className="flex w-full max-w-md items-center gap-3">
                <input className="input-focus w-full rounded-xl border border-white/10 bg-dark-900/60 px-4 py-3 text-sm placeholder:text-dark-400" placeholder="Enter your email" />
                <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="btn-primary rounded-xl px-5 py-3 text-sm font-bold">
                  Notify Me
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-dark-950/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-dark-400 md:flex-row">
          <div>© {new Date().getFullYear()} CryptoWallet. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
