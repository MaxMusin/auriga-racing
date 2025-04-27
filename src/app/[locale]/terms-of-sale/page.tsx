import Header from '@/components/Header';
import { useTranslations } from 'next-intl';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function TermsOfSalePage() {
  const t = useTranslations('termsOfSale');

  // Fonction pour rendre le contenu Markdown avec des styles personnalisés
  const renderMarkdownContent = (content: string) => {
    return (
      <div className="markdown-content text-white/80 dark:text-gray-300">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen px-8 pb-20 gap-8 sm:px-12 font-[family-name:var(--font-geist-sans)] bg-card pt-[144px]">
      <main className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
        <div className="text-center">
          <Header title={t('hero.title')} subtitle={t('hero.subtitle')} centered />
        </div>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article1.title')}
          </h2>
          {renderMarkdownContent(t('sections.article1.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article2.title')}
          </h2>
          {renderMarkdownContent(t('sections.article2.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article3.title')}
          </h2>
          {renderMarkdownContent(t('sections.article3.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article4.title')}
          </h2>
          {renderMarkdownContent(t('sections.article4.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article5.title')}
          </h2>
          {renderMarkdownContent(t('sections.article5.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article6.title')}
          </h2>
          {renderMarkdownContent(t('sections.article6.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article7.title')}
          </h2>
          {renderMarkdownContent(t('sections.article7.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article8.title')}
          </h2>
          {renderMarkdownContent(t('sections.article8.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article9.title')}
          </h2>
          {renderMarkdownContent(t('sections.article9.content'))}
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t('sections.article10.title')}
          </h2>
          {renderMarkdownContent(t('sections.article10.content'))}
        </section>
      </main>
    </div>
  );
}
