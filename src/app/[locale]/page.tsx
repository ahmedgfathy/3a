import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Car, Key, Building2 } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const tAbout = useTranslations('About');
  const tServices = useTranslations('Services');
  const tWhy = useTranslations('WhyChooseUs');

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold tracking-tighter">{t('brand')}</div>
        <div className="space-x-4 rtl:space-x-reverse font-medium">
          <Link href="/" locale="en" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">EN</Link>
          <Link href="/" locale="ar" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">AR</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[85vh] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 overflow-hidden pt-24 pb-12 md:py-0">
        {/* Abstract Background (Mobile Only) */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-950 opacity-50 md:hidden" />

        {/* Video Background (Desktop Only) */}
        <div className="absolute inset-0 hidden md:block z-0 overflow-hidden">
          <iframe
            className="w-full h-full object-cover scale-150 pointer-events-none"
            src="https://www.youtube.com/embed/7HaJArMDKgI?autoplay=1&mute=1&controls=0&loop=1&playlist=7HaJArMDKgI&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
            allow="autoplay; encrypted-media"
            title="Background Video"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="max-w-xl space-y-6 text-center md:text-left">
            {/* Mobile: Simple Greeting / Tagline */}
            <h1 className="block md:hidden text-3xl font-bold leading-tight tracking-tighter">
              {t('title')}
            </h1>

            {/* Desktop: Full Title & Description */}
            <h1 className="hidden md:block text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
              {t('title')}
            </h1>
            <p className="hidden md:block text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 font-light">
              {tAbout('description')}
            </p>
          </div>

          {/* Booking Widget (Uber-style) */}
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl md:text-2xl font-bold mb-6">{tServices('rideHailing.title')}</h2>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute top-3 left-4 w-3 h-3 bg-black dark:bg-white rounded-full" />
                <input
                  type="text"
                  placeholder="Current Location"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm md:text-base"
                  disabled
                />
                {/* Connector Line */}
                <div className="absolute top-7 left-[1.35rem] w-0.5 h-8 bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="relative">
                <div className="absolute top-3 left-4 w-3 h-3 bg-black dark:bg-white rounded-none" />
                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm md:text-base"
                  disabled
                />
              </div>
              <button className="w-full py-3 md:py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-base md:text-lg rounded-lg hover:opacity-90 transition-opacity mt-4">
                Request Ride
              </button>
            </div>

            {/* Mobile Action Grid (Inside Widget or Just Below) */}
            <div className="mt-8 grid grid-cols-3 gap-4 md:hidden">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-black dark:text-white">
                  <Car size={24} />
                </div>
                <span className="text-xs font-medium">Ride</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-black dark:text-white">
                  <Key size={24} />
                </div>
                <span className="text-xs font-medium">Lease</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-black dark:text-white">
                  <Building2 size={24} />
                </div>
                <span className="text-xs font-medium">Corp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Desktop Only) */}
      <section className="hidden md:block py-24 bg-zinc-50 dark:bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center tracking-tight">{tServices('title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ride Hailing Card */}
            <div className="group p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-full mb-6 flex items-center justify-center text-white dark:text-black font-bold text-xl">
                <Car size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tServices('rideHailing.title')}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {tServices('rideHailing.description')}
              </p>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-500">
                {(tServices.raw('rideHailing.points') as string[]).map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>

            {/* Leasing Card */}
            <div className="group p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-full mb-6 flex items-center justify-center text-white dark:text-black font-bold text-xl">
                <Key size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tServices('leasing.title')}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {tServices('leasing.description')}
              </p>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-500">
                {(tServices.raw('leasing.points') as string[]).map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>

            {/* Corporate Card */}
            <div className="group p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-full mb-6 flex items-center justify-center text-white dark:text-black font-bold text-xl">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tServices('corporate.title')}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {tServices('corporate.description')}
              </p>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-500">
                {(tServices.raw('corporate.points') as string[]).map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 tracking-tight">{tWhy('title')}</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {(tWhy.raw('points') as string[]).map((point, i) => (
                <div key={i} className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                  <div className="w-6 h-6 mr-4 rtl:ml-4 rtl:mr-0 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-lg font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4">3a Transportation</h3>
          <p className="text-zinc-400">© {new Date().getFullYear()} 3a Transportation. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
