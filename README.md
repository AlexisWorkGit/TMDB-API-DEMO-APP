# TMDB API DEMO APP

This is a demo app to connect to the TMDB api.

## Technologies used

- ⚡ [Next.js](https://nextjs.org) with App Router support
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com)
- ✅ Strict Mode for TypeScript and React 18
- ⌨️ Form handling with React Hook Form
- 📏 Linter with [ESLint](https://eslint.org) (default Next.js, Next.js Core Web Vitals, Tailwind CSS and Antfu configuration)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🚓 Lint git commit with Commitlint
- 🚨 Error Monitoring with [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)
- 🗂 VSCode configuration: Debug, Settings, Tasks and Extensions
- 💡 Absolute Imports using `@` prefix

## Technologies planned (future dev)

- 🔒 Authentication with [Clerk](https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate): Sign up, Sign in, Sign out, Forgot password, Reset password, and more.
- ☂️ Code coverage with [Codecov](https://about.codecov.io/codecov-free-trial/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)
- 📦 Type-safe ORM with DrizzleORM, compatible with PostgreSQL, SQLite, and MySQL
- 🎁 Automatic changelog generation with Semantic Release
- 🔴 Validation library with Zod
- Supabase database to store user favorites, etc.
- 🦺 Unit Testing with Vitest and React Testing Library
- 🧪 Integration and E2E Testing with Playwright
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development

# PRE-REQUISITES

## Sentry.io

Get api key from Sentry. You will need Key and token.
Also get your DSN address. You'll need that to update a few sentry files.

## TMDB

You need TMDB api keys and access token

# SETUP

## run install

run `npm install`

## setup environment file

create a `.env.local` file and place your API values from TMDB and Sentry. You'll also be adding your sentry DSN.

- `TMDB_API_KEY`
- `TMDB_ACCESS_TOKEN`
- `SENTRY_AUTH_TOKEN`
- `NEXT_PUBLIC_SENTRY_DSN`

# NEXTJS (to run the project locally)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# TODOS AND FUTURE FEATURES

## Implement unit tests and E2E testing

Need to add basic unit tests, probably with Jest or vitest. Playwright is another option for E2E tests. There are also some other options for doing visual testing as well like Percy.

## Clerk

Want to implement Clerk for user authentication and management

## Supabase

Supabase is a postgres based opensource firebase alternative. Would like to use it for its database feature for storing user selections like favorites or collections.

Another feature of Supabase is that it has the ability to work as a vector database, which might come in handy for AI related movie suggestions or reviews.

## Storybook

Add storybook so there are component documentation

## Electron

Potentially add ability to build as electron app
