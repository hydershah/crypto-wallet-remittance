# Crypto Wallet + Remittance Platform

A modern, secure Web3 crypto wallet with remittance features for Philippines ↔️ Canada USDC transfers.

## 🚀 Features

### Wallet Module (Version 1)
- **Non-custodial wallet** creation and management
- **Multi-chain support** (Ethereum, Polygon)
- **Secure key management** with AES-256 encryption
- **Transaction signing** and broadcasting
- **Real-time balance** tracking
- **Transaction history** with detailed analytics

### Remittance Module (Version 2)
- **USDC transfers** between Philippines and Canada
- **Fiat conversion** (USDC ↔ PHP/CAD)
- **Transfer limits** and compliance features
- **Manual processing** workflow
- **Partner integration** for settlements

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with React 18 and TypeScript
- **Tailwind CSS** for modern, responsive design
- **Framer Motion** for smooth animations
- **Ethers.js** for blockchain interactions
- **React Query** for state management

### Backend
- **Node.js** with Express.js
- **PostgreSQL** for relational data
- **Redis** for caching and sessions
- **JWT** for authentication
- **Web3.js** for blockchain operations

### Blockchain
- **Ethereum Mainnet** (USDC)
- **Polygon** (USDC) - for lower fees
- **Hardware wallet** support (MetaMask, WalletConnect)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crypto-wallet-remittance.git
   cd crypto-wallet-remittance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_ETHEREUM_RPC_URL=your_ethereum_rpc_url
   NEXT_PUBLIC_POLYGON_RPC_URL=your_polygon_rpc_url
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── wallet/         # Wallet-related components
│   ├── remittance/     # Remittance components
│   ├── common/         # Shared components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── services/           # API and blockchain services
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## 🔐 Security Features

- **AES-256 encryption** for private key storage
- **BIP39 mnemonic** seed phrase generation
- **WebAuthn** biometric authentication
- **Hardware wallet** integration
- **Rate limiting** and DDoS protection
- **Input validation** and sanitization

## 📊 Database Schema

The application uses PostgreSQL with the following core tables:
- `users` - User accounts and profiles
- `wallets` - Wallet addresses and encrypted keys
- `transactions` - Blockchain transaction history
- `transfers` - Remittance transfer records

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm run start`

## 📈 Monitoring

- **Error Tracking**: Sentry integration
- **Performance**: Vercel Analytics
- **Uptime**: UptimeRobot monitoring
- **Logs**: LogRocket for user sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Technical Solution](TECHNICAL_SOLUTION.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/crypto-wallet-remittance/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/crypto-wallet-remittance/discussions)

## ⚠️ Disclaimer

This software is for educational and development purposes. Users are responsible for their own security and compliance with local regulations. Always test with small amounts before using with real funds.

---

Built with ❤️ for the crypto community
