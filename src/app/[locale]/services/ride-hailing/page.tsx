import { useTranslations } from 'next-intl';
import { Car, CheckCircle2, Phone, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function RideHailingPage() {
    const t = useTranslations('ServiceDetails.rideHailing');

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <Navbar />
            <div className="pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Hero Section */}
                        <div className="mb-12 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/ride-hailing.png"
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
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Car className="w-6 h-6" />
                                    Key Features
                                </h2>
                                <ul className="space-y-4">
                                    {(t.raw('features') as string[]).map((feature, i) => (
                                        <li key={i} className="flex items-center space-x-3 rtl:space-x-reverse">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-lg text-zinc-700 dark:text-zinc-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits */}
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Shield className="w-6 h-6" />
                                    {t('benefits.title')}
                                </h2>
                                <ul className="space-y-4">
                                    {(t.raw('benefits.items') as string[]).map((item, i) => (
                                        <li key={i} className="flex items-center space-x-3 rtl:space-x-reverse">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                            <span className="text-lg text-zinc-700 dark:text-zinc-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-center">{t('howItWorks.title')}</h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                {(t.raw('howItWorks.steps') as string[]).map((step, i) => (
                                    <div key={i} className="relative p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-4xl font-bold text-zinc-200 dark:text-zinc-800 mb-4">0{i + 1}</div>
                                        <p className="font-medium text-zinc-800 dark:text-zinc-200">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
