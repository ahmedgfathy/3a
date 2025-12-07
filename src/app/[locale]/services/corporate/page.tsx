import { useTranslations } from 'next-intl';
import { Building2, CheckCircle2, Bus, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function CorporatePage() {
    const t = useTranslations('ServiceDetails.corporate');

    return (
        <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-12 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/corporate.png"
                            alt={t('heroImageAlt')}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
                        </div>
                    </div>

                    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
                        {t('description')}
                    </p>

                    {/* Key Features */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Building2 className="w-6 h-6" />
                            Key Features
                        </h2>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {(t.raw('features') as string[]).map((feature, i) => (
                                <li key={i} className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-lg text-zinc-700 dark:text-zinc-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Why Partner */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Briefcase className="w-6 h-6" />
                                {t('whyPartner.title')}
                            </h2>
                            <ul className="space-y-4">
                                {(t.raw('whyPartner.items') as string[]).map((item, i) => (
                                    <li key={i} className="flex items-start space-x-3 rtl:space-x-reverse">
                                        <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full mt-2.5 flex-shrink-0" />
                                        <span className="text-zinc-600 dark:text-zinc-400">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Fleet */}
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Bus className="w-6 h-6" />
                                {t('fleet.title')}
                            </h2>
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                {t('fleet.description')}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl text-center">
                                    <span className="block font-bold text-lg">Sedans</span>
                                    <span className="text-sm text-zinc-500">4 Passengers</span>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl text-center">
                                    <span className="block font-bold text-lg">Microbuses</span>
                                    <span className="text-sm text-zinc-500">14 Passengers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
