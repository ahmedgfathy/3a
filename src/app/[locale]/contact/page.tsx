import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
    const t = useTranslations('ContactPage');

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <Navbar />
            <div className="pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{t('title')}</h1>
                    <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                        <p>{t('content')}</p>
                        <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-2xl space-y-4">
                            <p className="font-medium">{t('email')}</p>
                            <p className="font-medium">{t('phone')}</p>
                            <p className="font-medium">{t('address')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
