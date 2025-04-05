import createNextIntlPlugin from 'next-intl/plugin';

// Use the correct path to the i18n request configuration
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
