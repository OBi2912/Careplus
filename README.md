# Careplus

A comprehensive healthcare services platform built with React and modern web technologies. Careplus provides an integrated ecosystem for medical insurance, consultations, pharmacy services, surgeries, and specialist directory access.

## Features

- **Medical Insurance**: Comprehensive plans covering national and international healthcare needs
- **Specialized Consultations**: Access to over 500 certified specialists across 30+ medical areas
- **24/7 Pharmacy**: Round-the-clock medication services with home delivery
- **Advanced Surgical Center**: State-of-the-art facilities with minimally invasive technology
- **Specialists Directory**: Find and book appointments with certified medical professionals
- **Multi-language Support**: Available in English and Spanish
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Linting**: ESLint

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd careplus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.jsx        # Landing page hero section
│   ├── Services.jsx    # Services overview
│   ├── Plans.jsx       # Subscription plans
│   ├── Navbar.jsx      # Navigation component
│   └── ...             # Other components
├── context/            # React context providers
│   ├── LanguageContext.jsx  # Multi-language support
│   └── ModalContext.jsx     # Modal state management
├── data/
│   └── translations.js # Multilingual content
└── assets/             # Static assets
```

## Contributing

Contributions are welcome! Please ensure code quality by running the linter before submitting pull requests.

## License

All rights reserved by OBi.