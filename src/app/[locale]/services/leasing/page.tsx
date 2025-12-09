import { useTranslations } from 'next-intl';
import { Key, CheckCircle2, User, CarFront } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function LeasingPage() {
    const t = useTranslations('ServiceDetails.leasing');

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <Navbar />
            <div className="pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Hero Section */}
                        <div className="mb-12 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/leasing.png"
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
                                <Key className="w-6 h-6" />
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

                        {/* For Owners & Renters Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* For Owners */}
                            <div className="p-8 bg-black text-white rounded-3xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{t('forOwners.title')}</h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {t('forOwners.content')}
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800 rounded-full blur-3xl opacity-50 -mr-16 -mt-16" />
                            </div>

                            {/* For Renters */}
                            <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CarFront className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('forRenters.title')}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {t('forRenters.content')}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
