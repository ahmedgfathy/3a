import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{t('title')}</h1>
                <div className="max-w-3xl mx-auto text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                    <p>{t('content')}</p>
                </div>
            </div>
        </div>
    );
}
