This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Next.js 15 Multilingual Starter

This project is a Next.js 15 starter with:

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [next-intl](https://next-intl-docs.vercel.app/) for internationalization
- Support for three languages: English, French, and Dutch

## Internationalization Features

- Route-based language switching (`/en`, `/fr`, `/nl`)
- Language switcher component
- Localized messages for UI content
- Automatic language detection based on browser preferences
- SEO-friendly with proper language attributes

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You'll be automatically redirected to your default language (e.g., [http://localhost:3000/en](http://localhost:3000/en)).

## Project Structure

- `/src/app/[locale]` - App router pages with locale parameter
- `/src/messages` - Translation files for each language
- `/src/components` - Reusable components including LanguageSwitcher
- `/src/middleware.ts` - Handles language detection and routing
- `/src/i18n.ts` - Internationalization configuration

## Adding New Languages

To add a new language:

1. Create a new translation file in `/src/messages/[language-code]/index.json`
2. Add the language code to the `locales` array in `/src/middleware.ts`
3. Add the language option to the `LanguageSwitcher` component

## Learn More

To learn more about Next.js and next-intl, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [next-intl Documentation](https://next-intl-docs.vercel.app/) - learn about next-intl features.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
