# DocuTutor

DocuTutor is a learning assistant web application built with Angular 21 for the frontend. It is designed to work with a .NET 10 backend, and it integrates AI-powered document understanding with subscription billing through Stripe.

## What this project does

DocuTutor helps users:

- Sign in, sign up, reset passwords, and manage account access.
- Upload documents and view them in a personal workspace.
- Ask AI questions about a document and receive answers with citations.
- Review quick summaries and quiz-style interactions for fast learning.
- Choose a subscription plan and complete payment through Stripe.

The frontend is the main repository here, and it calls a backend API hosted at `https://docututor.runasp.net/api` in development mode.

## Main features

- **Authentication:** login, register, forgot password, reset password, verify email, and auth guard protection.
- **Document management:** upload documents, list files, open document details, and work with document-specific AI chat.
- **AI workspace:** chat, summary, and quiz panels for each document.
- **Subscription flow:** pricing page, Stripe checkout session creation, customer portal support, and billing result pages.
- **Localization:** multi-language support with NgRx-managed language state.
- **Theming and responsiveness:** light/dark theme switch and responsive layout for desktop and mobile.

## Project structure

The project follows a scalable **Feature-Based Architecture** inspired by enterprise Angular applications.

```text
src/app
│
├── core
│   ├── services
│   ├── guards
│   ├── interceptors
│   ├── infrastructure
│   ├── store
│   ├── constants
│   ├── models
│   ├── types
│   └── utils
│
├── shared
│   ├── components
│   ├── directives
│   ├── pipes
│   ├── validators
│   ├── animations
│   ├── interfaces
│   └── types
│
├── layouts
│   ├── app-layout
│   ├── auth-layout
│   └── dashboard-layout
│
├── features
    ├── authentication
    ├── dashboard
    ├── documents
    ├── workspace
    ├── subscription
    └── settings


```

The architecture keeps business logic isolated inside each feature while reusable functionality lives inside **Core** and **Shared**.


The app is organized into clear feature areas:

- `src/app/app.ts`, `app.html`, `app.css`, `app.routes.ts`
  - The root application shell and routing setup.

- `src/app/core`
  - Shared services, guards, interceptors, language/theme helpers, and authentication state. Language state is managed with NgRx and the app supports localization.

- `src/app/layouts`
  - Layout components for the public app, auth pages, and dashboard pages.

- `src/app/features/authentication`
  - All authentication pages, request models, and auth services.

- `src/app/features/documents`
  - Document upload/list/detail pages, document APIs, chat logic, and upload services.

- `src/app/features/workspace`
  - Workspace page with chat, summary, and quiz panels for loaded documents.

- `src/app/features/subscription`
  - Pricing, billing success/cancel pages, and Stripe-backed subscription services.

- `src/app/shared`
  - Reusable UI pieces like buttons, cards, inputs, badges, theme toggle, language switcher, icons, pipes, and validators.

- `src/environments`
  - Environment configuration for development and production API endpoints.

## Backend and integrations

This frontend is intended to work with a `.NET 10` backend API. The backend is expected to handle:

- user authentication,
- document upload and retrieval,
- AI chat requests,
- subscription plan management,
- Stripe checkout and portal sessions.

The app is also designed for AI flow integration. The AI service can be deployed through a Hugging Face-hosted workflow or a similar AI pipeline, with the backend forwarding chat requests to that flow.

## Tech stack

- Angular 21
- TypeScript
- Tailwind CSS
- NgRx (for language state)
- .NET 10 backend (API)
- Hugging Face AI flow integration
- Stripe subscription billing
