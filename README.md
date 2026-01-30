# Code Reviewer — AI-Powered Code Analysis Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A focused, production-ready full‑stack app that delivers instant, high-quality AI code reviews to help developers, teams, and hiring managers evaluate code quality and engineering judgment.

---

## Table of Contents

- [Summary](#summary)  
- [Why this project matters](#why-this-project-matters)  
- [Highlights for recruiters](#highlights-for-recruiters)  
- [Tech stack](#tech-stack)  
- [Quickstart](#quickstart)  
- [API & Key Files (open these)](#api--key-files-open-these)  
- [Project structure](#project-structure)  
- [Architecture & data flow](#architecture--data-flow)  
- [Run locally](#run-locally)  
- [Testing, security & performance](#testing-security--performance)  
- [Roadmap](#roadmap)  
- [Contact](#contact)

---

## Summary

Code Reviewer is a React + Node/Express app that sends user-submitted code to a generative AI model and returns a Markdown-formatted review. The UI includes a lightweight code editor, syntax highlighting, and a readable rendered response.

---

## Why this project matters

- Demonstrates full-stack engineering: client, server, API integration, env/config, and UX for developer tooling.
- Practical automation that can speed code review cycles and surface common issues.
- Easy to extend with multi-model support, persistence, or CI integration.

---

## Highlights for recruiters

- Clear separation of concerns (routes, controllers, services).
- Production-minded: rate limiting, CORS, env-based config, linting.
- UX-focused: minimal, accessible editor + Markdown rendering.
- Integrations: external AI provider SDK usage with error handling and retry/backoff considerations.

---

## Tech stack

Frontend: React, Vite, react-simple-code-editor, PrismJS, react-markdown, rehype-highlight, Axios  
Backend: Node.js, Express, @google/generative-ai (Gemini), express-rate-limit, dotenv, CORS

---

## Quickstart

1. Clone repository and install dependencies in both root folders.
2. Configure backend API key in `backend/.env`.
3. Start backend and frontend dev servers.

See [Run locally](#run-locally) for commands.

---

## API & Key Files (open these)

- Backend server entry: [backend/server.js](backend/server.js)  
- Express app & middleware: [backend/src/app.js](backend/src/app.js)  
- AI controller: [`aiController.getReview`](backend/src/controllers/ai.controller.js) — see [backend/src/controllers/ai.controller.js](backend/src/controllers/ai.controller.js)  
- AI service function: [`generateContent`](backend/src/services/ai.service.js) — see [backend/src/services/ai.service.js](backend/src/services/ai.service.js)  
- AI routes: [backend/src/routes/ai.routes.js](backend/src/routes/ai.routes.js)  
- Frontend entry: [Frontend/src/main.jsx](Frontend/src/main.jsx)  
- Frontend main UI: [`App` component](Frontend/src/App.jsx) — see [Frontend/src/App.jsx](Frontend/src/App.jsx)  
- Frontend API config: [`API_BASE`](Frontend/src/config.js) — see [Frontend/src/config.js](Frontend/src/config.js)  
- CSS / styling: [Frontend/src/index.css](Frontend/src/index.css) and [Frontend/src/App.css](Frontend/src/App.css)  
- Frontend HTML: [Frontend/index.html](Frontend/index.html)  
- Package manifests: [backend/package.json](backend/package.json) and [Frontend/package.json](Frontend/package.json)  
- Lint config: [Frontend/eslint.config.js](Frontend/eslint.config.js)  
- Vite config: [Frontend/vite.config.js](Frontend/vite.config.js)  
- Dotenv examples: [backend/.env](backend/.env) and [Frontend/.env](Frontend/.env)

---

## Project structure
```
code-reviewer/
│
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       │   └── ai.controller.js
│       ├── routes/
│       │   └── ai.routes.js
│       └── services/
│           └── ai.service.js
│
└── Frontend/
   ├── package.json
   ├── vite.config.js
   ├── eslint.config.js
   ├── index.html
   ├── public/
   └── src/
      ├── main.jsx
      ├── App.jsx
      ├── App.css
      ├── config.js
      ├── index.css
      └── assets/
```
---

## Architecture & data flow

1. User types code into the editor
2. User clicks “Review”
3. Frontend sends request:
   - `POST /ai/get-review`
   - `{ "code": "<your code>" }`
4. Backend processes code using AI
5. Backend responds with:
   - `{ "response": "<markdown text>" }`
6. Frontend displays the response beautifully using Markdown + syntax highlighting

---

## Run locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/code-reviewer.git
cd code-reviewer
```

### 2. Install dependencies

In both the `frontend` and `backend` directories:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend` directory based on the provided `.env.example`, and add your AI API key:

```
AI_KEY=your_api_key_here
PORT=3000
```

### 4. Start the development servers

In the `frontend` directory:

```bash
npm run dev
```

In the `backend` directory:

```bash
node server.js
```

The backend should be accessible at `http://localhost:3000`, and the frontend at `http://localhost:5173` (or the port shown in your terminal).

---

## Testing, security & performance

- **Testing**: Unit tests for critical functions, integration tests for API routes.
- **Security**: Rate limiting, CORS, environment variable management, input validation.
- **Performance**: Optimized API requests, efficient data handling, and rendering.

---

## Roadmap

- Dark/Light theme switch
- Support for multiple programming languages
- Better animations
- Save review history
- Shareable review links

---

## Contact

For questions or feedback, open an issue on GitHub or contact the maintainer:

- Your Name — [your.email@example.com](mailto:your.email@example.com)
- GitHub: [your-username](https://github.com/your-username)

---

## License

MIT License © 2025
