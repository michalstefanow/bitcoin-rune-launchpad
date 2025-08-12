# Bitcoin Rune Launchpad

A TypeScript-based launchpad platform for Bitcoin Rune tokens. This project provides a secure and efficient way to launch and manage Rune token projects.

## Features

- Project Management
  - Create and manage Rune token projects
  - Set project parameters (total supply, initial price, etc.)
  - Track project status and contributions
  - End projects and distribute tokens

- Contribution System
  - Set minimum and maximum contribution limits
  - Track contributions in real-time
  - Automatic token distribution
  - Contribution history

- Security Features
  - Input validation
  - Rate limiting
  - Error handling
  - Transaction verification

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Web3 provider (e.g., Infura)
- Telegram Bot Token (for notifications)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/michalstefanow/bitcoin-rune-launchpad.git
cd bitcoin-rune-launchpad
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
- MongoDB connection string
- Web3 provider URL
- JWT secret
- Telegram bot token
- Other configuration values

## Development

1. Start the development server:
```bash
npm run dev
```

2. Build the project:
```bash
npm run build
```

3. Start the production server:
```bash
npm start
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all active projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `POST /api/projects/:id/contribute` - Contribute to project
- `POST /api/projects/:id/end` - End project

## Project Structure

```
bitcoin-rune-launchpad/
├── src/
│   ├── index.ts              # Main entry point
│   ├── app.ts                # Express application setup
│   │   └── config.ts         # Configuration management
│   ├── controllers/
│   │   └── project.ts        # Project management
│   ├── models/
│   │   └── project.ts        # Project model
│   ├── routes/
│   │   └── project.ts        # Project routes
│   ├── middleware/
│   │   ├── errorHandler.ts   # Error handling
│   │   └── validateRequest.ts # Request validation
│   └── utils/
│       └── logger.ts         # Logging utility
├── test/                     # Test files
├── .env.example             # Environment variables example
├── package.json             # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## Security Considerations

1. **Transaction Security**
   - Contribution validation
   - Token distribution verification
   - Project status verification

2. **Platform Security**
   - Rate limiting
   - Input validation
   - Error handling
   - Data validation

## Monitoring

1. **System Monitoring**
   - Error tracking
   - Performance metrics
   - User activity
   - Transaction success rates

2. **Business Monitoring**
   - Project statistics
   - User participation
   - Revenue tracking
   - Success rates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact
- Telegram [@michalstefanow](https://t.me/mylord1_1)
- Twitter [@michalstefanow](https://x.com/michalstefanow)

