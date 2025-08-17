'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Eye, EyeOff, Copy, Check, Shield, AlertTriangle } from 'lucide-react'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'import'
}

export default function WalletModal({ isOpen, onClose, mode }: WalletModalProps) {
  const [step, setStep] = useState(1)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copied, setCopied] = useState(false)
  const [seedPhrase] = useState(['abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadSeedPhrase = () => {
    const blob = new Blob([seedPhrase.join(' ')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'seed-phrase.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass rounded-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {mode === 'create' ? 'Create Wallet' : 'Import Wallet'}
                  </h2>
                  <p className="text-dark-400 text-sm">Step {step} of 3</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-dark-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Security First</h3>
                    <p className="text-dark-300 text-sm">
                      Your seed phrase is the key to your wallet. Write it down and keep it safe.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-dark-300 text-sm">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>Never share your seed phrase</span>
                    </div>
                    <div className="flex items-center space-x-2 text-dark-300 text-sm">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>Store it in a secure location</span>
                    </div>
                    <div className="flex items-center space-x-2 text-dark-300 text-sm">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>You'll need it to recover your wallet</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full btn-primary py-3 rounded-xl text-white font-semibold"
                  >
                    I Understand, Continue
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Your Seed Phrase</h3>
                    <p className="text-dark-300 text-sm">
                      Write down these 12 words in order and keep them safe
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-300 text-sm">Seed Phrase</span>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                          className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          {showSeedPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          <span className="text-sm">{showSeedPhrase ? 'Hide' : 'Show'}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(seedPhrase.join(' '))}
                          className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                        </motion.button>
                      </div>
                    </div>

                    {showSeedPhrase && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-3 gap-2"
                      >
                        {seedPhrase.map((word, index) => (
                          <div key={index} className="bg-dark-800 rounded-lg p-2 text-center">
                            <span className="text-xs text-dark-400">{index + 1}.</span>
                            <div className="text-sm font-mono text-white">{word}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadSeedPhrase}
                      className="w-full flex items-center justify-center space-x-2 bg-dark-800 hover:bg-dark-700 py-3 rounded-xl text-white font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download as Text File</span>
                    </motion.button>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(1)}
                      className="flex-1 bg-dark-800 hover:bg-dark-700 py-3 rounded-xl text-white font-medium transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(3)}
                      className="flex-1 btn-primary py-3 rounded-xl text-white font-semibold"
                    >
                      Continue
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Wallet Created!</h3>
                    <p className="text-dark-300 text-sm">
                      Your wallet has been successfully created and is ready to use.
                    </p>
                  </div>

                  <div className="bg-dark-800/50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-sm text-dark-400 mb-1">Wallet Address</div>
                      <div className="font-mono text-white text-sm break-all">
                        0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full btn-primary py-3 rounded-xl text-white font-semibold"
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
