'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Messages = Record<string, Record<string, string> | string>;

type Props = {
  children: ReactNode;
  locale: string;
  messages: Messages;
};

export function IntlProvider({ children, locale, messages }: Props) {
  // Use a fixed timestamp to ensure server and client render the same thing
  // This timestamp represents April 4, 2025 (the current date)
  const fixedDate = new Date('2025-04-04T12:00:00Z');

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Paris"
      now={fixedDate}
    >
      {children}
    </NextIntlClientProvider>
  );
}
