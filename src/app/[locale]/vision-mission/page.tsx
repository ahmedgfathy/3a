import { useTranslations } from 'next-intl';

export default function VisionMissionPage() {
    const t = useTranslations('VisionMissionPage');

    return (
        <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t('title')}</h1>
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold mb-4">{t('visionTitle')}</h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {t('visionContent')}
                        </p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold mb-4">{t('missionTitle')}</h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {t('missionContent')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
