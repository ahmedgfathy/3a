import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Car, Key, Info, Target, Mail, CheckCircle2, User, CarFront } from 'lucide-react';
import Image from 'next/image';

const CARS = [
    { id: 1, name: 'Toyota Corolla', type: 'Sedan', price: '800 EGP', image: '/images/corolla.png' },
    { id: 2, name: 'Hyundai Elantra', type: 'Sedan', price: '900 EGP', image: '/images/elantra.png' },
    { id: 3, name: 'Kia Cerato', type: 'Sedan', price: '850 EGP', image: '/images/cerato.png' },
    { id: 4, name: 'Nissan Sunny', type: 'Sedan', price: '700 EGP', image: '/images/sunny.png' },
    { id: 5, name: 'Mercedes C180', type: 'Luxury', price: '2500 EGP', image: '/images/mercedes.png' },
    { id: 6, name: 'BMW 320i', type: 'Luxury', price: '2800 EGP', image: '/images/bmw.png' },
    { id: 7, name: 'Toyota HiAce', type: 'Van', price: '1500 EGP', image: '/images/hiace.png' },
    { id: 8, name: 'Mitsubishi Xpander', type: 'MPV', price: '1200 EGP', image: '/images/xpander.png' },
];

export default function LeasingPage() {
    const t = useTranslations('Services.leasing');
    const tNavbar = useTranslations('Navbar');
    const tFooter = useTranslations('Footer');

    return (
        <main className="h-screen w-full bg-black text-white overflow-hidden flex flex-col relative">

            {/* Video Background (Same as Home) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <iframe
                    className="w-full h-full object-cover scale-150 pointer-events-none"
                    src="https://www.youtube.com/embed/7HaJArMDKgI?autoplay=1&mute=1&controls=0&loop=1&playlist=7HaJArMDKgI&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
                    allow="autoplay; encrypted-media"
                    title="Background Video"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70 z-10" />
            </div>

            {/* Navigation (Absolute Top - Matching Home) */}
            <nav className="absolute top-0 w-full p-4 md:p-6 z-50 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative h-12 w-12 flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="3a"
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                        priority
                    />
                </Link>

                {/* Navbar Service Icons (Center) */}
                <div className="flex items-center gap-6 md:gap-10">

                    {/* 1. Ride - Hailing (Back to Home) */}
                    <Link href="/" className="group flex flex-col items-center gap-1 relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/60 backdrop-blur-sm border border-zinc-700 group-hover:border-[#FFD700] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <Car size={18} className="text-zinc-400 group-hover:text-[#FFD700] transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[#FFD700] uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
                            {tNavbar('rideHailing')}
                        </span>
                    </Link>

                    {/* 2. Leasing (Active) */}
                    <Link href="/services/leasing" className="group flex flex-col items-center gap-1 relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-[#FFD700] flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.2)] scale-110 transition-all duration-300">
                            <Key size={18} className="text-[#FFD700]" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[#FFD700] uppercase opacity-100 absolute -bottom-5">
                            {tNavbar('leasing')}
                        </span>
                    </Link>
                </div>

                {/* Language Switcher with Flags */}
                <div className="flex items-center gap-3">
                    <Link href="/services/leasing" locale="en" className="group relative w-8 h-6 overflow-hidden rounded shadow-sm hover:ring-2 hover:ring-[#FFD700] transition-all duration-300">
                        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                            <g fillRule="evenodd">
                                <path fill="#bd3d44" d="M640 480H0V0h640z" />
                                <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 424h640" />
                                <path fill="#192f5d" d="M0 0h249.8v258.5H0z" />
                                <marker id="a" markerHeight="13" markerWidth="13" refX="6.5" refY="6.5">
                                    <path fill="#fff" d="M12.9 6.5L0 12.9V0z" />
                                </marker>
                                <path fill="#fff" d="M41.5 14.3l9.8 28.1-24.3-17.2h29.2L31.8 14.3z" transform="translate(14)" />
                                <use href="#b" width="13" height="13" transform="rotate(72 179.6 150.3)" />
                                <path id="b" fill="#fff" d="M41.5 14.3l9.8 28.1-24.3-17.2h29.2L31.8 14.3z" transform="translate(25 24)" />
                                <use href="#b" width="13" height="13" x="42" y="-12" />
                                <use href="#b" width="13" height="13" x="84" />
                                <use href="#b" width="13" height="13" x="126" y="-12" />
                                <use href="#b" width="13" height="13" x="168" />
                                <use href="#b" width="13" height="13" y="44" />
                                <use href="#b" width="13" height="13" x="42" y="32" />
                                <use href="#b" width="13" height="13" x="84" y="44" />
                                <use href="#b" width="13" height="13" x="126" y="32" />
                                <use href="#b" width="13" height="13" x="168" y="44" />
                                <use href="#b" width="13" height="13" y="88" />
                                <use href="#b" width="13" height="13" x="42" y="76" />
                                <use href="#b" width="13" height="13" x="84" y="88" />
                                <use href="#b" width="13" height="13" x="126" y="76" />
                                <use href="#b" width="13" height="13" x="168" y="88" />
                                <use href="#b" width="13" height="13" y="132" />
                                <use href="#b" width="13" height="13" x="42" y="120" />
                                <use href="#b" width="13" height="13" x="84" y="132" />
                                <use href="#b" width="13" height="13" x="126" y="120" />
                                <use href="#b" width="13" height="13" x="168" y="132" />
                            </g>
                        </svg>
                    </Link>

                    <Link href="/services/leasing" locale="ar" className="group relative w-8 h-6 overflow-hidden rounded shadow-sm hover:ring-2 hover:ring-[#FFD700] transition-all duration-300">
                        <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
                            <path fill="#CE1126" d="M0 0h900v200H0z" />
                            <path fill="#FFF" d="M0 200h900v200H0z" />
                            <path fill="#000" d="M0 400h900v200H0z" />
                            <g transform="translate(400 250) scale(0.15)">
                                <path fill="#C09300" d="M0 0h666v200H0z" />
                            </g>
                        </svg>
                    </Link>
                </div>
            </nav>

            {/* Main Content Area: Scrollable Car Grid */}
            <div className="container mx-auto px-6 pt-48 relative z-10 flex flex-col h-screen">

                {/* Header */}
                <div className="text-center mb-4 shrink-0">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight text-[#FFD700] uppercase">{t('title')}</h1>
                    <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto">{t('description')}</p>
                </div>

                {/* Content Area: Car Grid */}
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {CARS.map((car) => (
                            <div key={car.id} className="group bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-[#FFD700] rounded-xl p-3 flex flex-col items-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] cursor-pointer">
                                {/* Car Icon Placeholder (using Lucide as we don't have real images yet) */}
                                <div className="w-full aspect-[4/3] bg-black/40 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                    <CarFront className="text-zinc-600 group-hover:text-[#FFD700] transition-colors w-12 h-12" />
                                    {/* Badge */}
                                    <div className="absolute top-2 right-2 bg-[#FFD700] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        {car.type}
                                    </div>
                                </div>

                                <h3 className="text-white font-bold text-sm mb-1">{car.name}</h3>
                                <p className="text-[#FFD700] text-xs font-semibold mb-3">{car.price} / Day</p>

                                <button className="w-full py-2 bg-white text-black text-xs font-bold rounded hover:bg-[#FFD700] transition-colors">
                                    Rent Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Section */}
            <div className="relative z-20 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-light tracking-wide bg-gradient-to-t from-black via-black/80 to-transparent">

                <div className="flex gap-6">
                    <Link href="/vision-mission" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                        <Target size={14} />
                        <span>{tFooter('visionMission')}</span>
                    </Link>
                    <Link href="/about" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                        <Info size={14} />
                        <span>{tFooter('aboutUs')}</span>
                    </Link>
                    <Link href="/contact" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                        <Mail size={14} />
                        <span>{tFooter('contactUs')}</span>
                    </Link>
                </div>

                <div className="opacity-50">
                    © 2026 3a Transportation.
                </div>
            </div>
        </main>
    );
}
