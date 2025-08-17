import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoWallet - PH ↔️ Canada Remittance',
  description: 'Ultra-modern Web3 crypto wallet with remittance features for Philippines and Canada',
  keywords: ['crypto', 'wallet', 'web3', 'remittance', 'philippines', 'canada', 'usdc'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
          {/* Web3 animated background */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <div className="absolute inset-0">
            {/* Dynamic canvas particles */}
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
