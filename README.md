# LinkHub - Modern Link Manager

![LinkHub Logo](public/logo.png) <!-- Make sure to have a logo in the public folder -->

LinkHub is a modern web application for managing and organizing important links. Built with React, TypeScript and TailwindCSS.

Discover your personalized digital space! Centralize all your social media accounts in a single link:

- **Custom profile: Choose your perfect photo and write a description that reflects your essence.
- **Unlimited links: Add and organize all your social profiles so your followers can easily find you.
- **Modern and fast design: Intuitive interface created with React, React Router, and Vite.
- **Robust backend: Server built with Node.js, Express, and a MongoDB database.
- **Image optimization: Fast storage and delivery thanks to Cloudinary.
- **Safe typing: Developed in TypeScript for more reliable and maintainable code.

Take your online presence to the next level with our complete and scalable solution!

## 🚀 Key Features

- **Link management** with drag and drop (using @dnd-kit)
- **User authentication**
- **Advanced link search**
- **Responsive and accessible** interface
- **Notifications** with sonner
- **Forms** with react-hook-form
- **State management** with React Query

## 🛠 Technologies Used

- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS
- **Icons**: Heroicons and Font Awesome
- **Routing**: React Router DOM
- **Drag & Drop**: @dnd-kit
- **Forms**: react-hook-form
- **State management**: @tanstack/react-query
- **Notifications**: sonner
- **Build Tool**: Vite

## 📦 Main Dependencies

```json
"dependencies": {
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@fortawesome/fontawesome-svg-core": "^6.7.2",
  "@headlessui/react": "^2.2.0",
  "@heroicons/react": "^2.2.0",
  "@tanstack/react-query": "^5.68.0",
  "axios": "^1.8.2",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.3.0",
  "sonner": "^2.0.1"
}
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/fer8614/frontend_LinkHub.git
cd frontend_LinkHub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file based on `.env.example`

4. **Run in development mode**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 📂 Project Structure

```
frontend_LinkHub/
├── public/            # Static files
├── src/
│   ├── components/    # Reusable components
│   ├── views/         # Main views
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   ├── api/           # API configuration
│   └── App.tsx        # Root component
├── .env.local         # Environment variables
├── package.json       # Dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

MIT © Yesid Fernando Cepeda B. 2025

## 🔗 Related Links

- [LinkHub Backend](https://github.com/fer8614/frontend_LinkHub)

---

💻 Developed by Yesid Fernando Cepeda B.
