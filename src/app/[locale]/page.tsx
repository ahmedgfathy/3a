'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Car, Key, Building2, Info, Target, Mail } from 'lucide-react';
import Image from 'next/image';
import LocationPicker from '@/components/LocationPicker';
import dynamic from 'next/dynamic';

const RideRequestView = dynamic(() => import('@/components/RideRequestView'), { ssr: false });

export default function HomePage() {
  const t = useTranslations('Navbar');
  const tServices = useTranslations('Services');
  const tFooter = useTranslations('Footer');

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number }>();
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number }>();
  const [isRideRequested, setIsRideRequested] = useState(false);

  const handleRequestRide = () => {
    if (!pickup || !destination) {
      alert('Please select both pickup and destination locations');
      return;
    }
    setIsRideRequested(true);
  };

  return (
    <main className="h-screen w-full bg-black text-white overflow-hidden flex flex-col relative">

      {/* Video Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <iframe
          className="w-full h-full object-cover scale-150 pointer-events-none"
          src="https://www.youtube.com/embed/7HaJArMDKgI?autoplay=1&mute=1&controls=0&loop=1&playlist=7HaJArMDKgI&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
          allow="autoplay; encrypted-media"
          title="Background Video"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Navigation (Absolute Top) */}
      <nav className="absolute top-0 w-full p-4 md:p-6 z-50 flex items-center justify-between">
        {/* Logo - Gold Symbol */}
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

        {/* Navbar Service Icons (Center - Smaller & Pushed Up) */}
        <div className="flex items-center gap-6 md:gap-10">

          {/* 1. Ride - Hailing */}
          <Link href="/" className="group flex flex-col items-center gap-1 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-[#FFD700] flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.2)] group-hover:scale-110 transition-all duration-300">
              <Car size={18} className="text-[#FFD700]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#FFD700] uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              {t('rideHailing')}
            </span>
          </Link>

          {/* 2. Leasing */}
          <Link href="/services/leasing" className="group flex flex-col items-center gap-1 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/60 backdrop-blur-sm border border-zinc-700 group-hover:border-[#FFD700] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Key size={18} className="text-zinc-400 group-hover:text-[#FFD700] transition-colors" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#FFD700] uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              {t('leasing')}
            </span>
          </Link>

        </div>

        {/* Language Switcher */}
        <div className="space-x-4 rtl:space-x-reverse font-bold text-sm tracking-widest">
          <Link href="/" locale="en" className="hover:text-[#FFD700] transition-colors duration-300">EN</Link>
          <span className="text-[#FFD700] mx-2">|</span>
          <Link href="/" locale="ar" className="hover:text-[#FFD700] transition-colors duration-300">AR</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4">

        {/* Restored Booking Widget (Matches Mobile Branding) */}
        <div className="w-full max-w-[400px] bg-zinc-900/90 backdrop-blur-xl p-6 rounded-3xl border border-[#FFD700]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-[#FFD700] text-xl font-bold mb-6 text-center uppercase tracking-widest">
            {tServices('rideHailing.title')}
          </h2>

          <div className="space-y-4">
            {/* Pickup */}
            <LocationPicker
              value={pickup}
              onChange={(address, lat, lng) => {
                setPickup(address);
                if (lat && lng) setPickupCoords({ lat, lng });
              }}
              placeholder="Pickup Location"
              icon="pickup"
            />

            {/* Destination */}
            <LocationPicker
              value={destination}
              onChange={(address, lat, lng) => {
                setDestination(address);
                if (lat && lng) setDestinationCoords({ lat, lng });
              }}
              placeholder="Destination"
              icon="destination"
            />

            {/* Request Button */}
            <button
              onClick={handleRequestRide}
              className="w-full py-4 bg-[#FFD700] text-black font-bold text-lg rounded-xl hover:bg-[#FFC000] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all mt-4 uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <span>Request Captain</span>
              <Car size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Section */}
      <div className="relative z-20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-light tracking-wide bg-gradient-to-t from-black via-black/80 to-transparent">

        <div className="flex gap-8">
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

      {/* Ride Request View Overlay */}
      {isRideRequested && (
        <RideRequestView
          pickup={pickup}
          destination={destination}
          pickupCoords={pickupCoords}
          destinationCoords={destinationCoords}
          onClose={() => setIsRideRequested(false)}
        />
      )}
    </main>
  );
}
