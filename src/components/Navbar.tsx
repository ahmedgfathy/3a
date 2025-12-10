'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Home, Car, Key, Building2, Info, Target, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="3a Transportation"
              width={120}
              height={40}
              className="h-8 w-auto dark:invert"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              <Home size={20} />
              <span className="text-sm font-medium">{t('home')}</span>
            </Link>
            <Link href="/services/ride-hailing" className="flex items-center gap-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              <Car size={20} />
              <span className="text-sm font-medium">{t('rideHailing')}</span>
            </Link>
            <Link href="/services/leasing" className="flex items-center gap-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              <Key size={20} />
              <span className="text-sm font-medium">{t('leasing')}</span>
            </Link>
            <Link href="/about" className="flex items-center gap-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              <Info size={20} />
              <span className="text-sm font-medium">{t('about')}</span>
            </Link>
            <Link href="/vision-mission" className="flex items-center gap-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              <Target size={20} />
              <span className="text-sm font-medium">{t('vision')}</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              <Mail size={20} />
              <span className="text-sm font-medium">{t('contact')}</span>
            </Link>
          </div>

          {/* Mobile Navigation & Language Switcher */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="space-x-2 rtl:space-x-reverse font-medium text-sm">
              <Link href="/" locale="en" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">EN</Link>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <Link href="/" locale="ar" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">AR</Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Icons */}
        <div className="md:hidden pb-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            <Link href="/" className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Home size={20} />
              </div>
              <span className="text-xs font-medium">{t('home')}</span>
            </Link>
            <Link href="/services/ride-hailing" className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Car size={20} />
              </div>
              <span className="text-xs font-medium">{t('ride')}</span>
            </Link>
            <Link href="/services/leasing" className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Key size={20} />
              </div>
              <span className="text-xs font-medium">{t('lease')}</span>
            </Link>
            <Link href="/about" className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Info size={20} />
              </div>
              <span className="text-xs font-medium">{t('about')}</span>
            </Link>
            <Link href="/vision-mission" className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Target size={20} />
              </div>
              <span className="text-xs font-medium">{t('vision')}</span>
            </Link>
            <Link href="/contact" className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <span className="text-xs font-medium">{t('contact')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
