'use client';

import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapModal = dynamic(() => import('./MapModal'), {
    ssr: false,
    loading: () => <div>Loading map...</div>
});

interface LocationPickerProps {
    value: string;
    onChange: (address: string, lat?: number, lng?: number) => void;
    placeholder: string;
    icon?: 'pickup' | 'destination';
}

export default function LocationPicker({ value, onChange, placeholder, icon = 'pickup' }: LocationPickerProps) {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleUseCurrentLocation = () => {
        setIsLoadingLocation(true);

        if (!('geolocation' in navigator)) {
            alert('Geolocation is not supported by your browser.');
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Reverse geocode to get address
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                    );
                    const data = await response.json();
                    const address = data.display_name || `${latitude}, ${longitude}`;
                    onChange(address, latitude, longitude);
                } catch (error) {
                    console.error('Geocoding error:', error);
                    onChange(`${latitude}, ${longitude}`, latitude, longitude);
                }
                setIsLoadingLocation(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                setIsLoadingLocation(false);

                // Provide specific error messages
                let errorMessage = 'Unable to get your location. ';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please allow location access in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out. Please try again.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred. Note: Location services require HTTPS in production.';
                }

                alert(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <>
            <div className="relative">
                {/* Icon indicator */}
                <div className={`absolute top-3.5 left-4 w-2 h-2 rounded-full shadow-[0_0_8px_#FFD700] ${icon === 'pickup' ? 'bg-[#FFD700]' : 'bg-white border border-zinc-500'
                    }`} />

                {/* Connector Line (only for pickup) */}
                {icon === 'pickup' && (
                    <div className="absolute top-6 left-[1.2rem] w-[1px] h-8 bg-zinc-700" />
                )}

                {/* Input Field */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-24 py-3 bg-black/60 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700] transition-all text-sm"
                />

                {/* Action Buttons */}
                <div className="absolute right-2 top-2 flex gap-1">
                    {/* Current Location Button */}
                    <button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        disabled={isLoadingLocation}
                        className="p-2 bg-zinc-800 hover:bg-[#FFD700] hover:text-black rounded-lg transition-all disabled:opacity-50"
                        title="Use current location"
                    >
                        <Navigation size={16} className={isLoadingLocation ? 'animate-pulse' : ''} />
                    </button>

                    {/* Map Button */}
                    <button
                        type="button"
                        onClick={() => setIsMapOpen(true)}
                        className="p-2 bg-zinc-800 hover:bg-[#FFD700] hover:text-black rounded-lg transition-all"
                        title="Select from map"
                    >
                        <MapPin size={16} />
                    </button>
                </div>
            </div>

            {/* Map Modal */}
            {isMapOpen && (
                <MapModal
                    onClose={() => setIsMapOpen(false)}
                    onSelectLocation={(address, lat, lng) => {
                        onChange(address, lat, lng);
                        setIsMapOpen(false);
                    }}
                    initialValue={value}
                />
            )}
        </>
    );
}
