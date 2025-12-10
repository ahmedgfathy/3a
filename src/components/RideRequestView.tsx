'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { X, Car, MapPin, Navigation2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Custom car icon for captain
const carIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#FFD700" opacity="0.3"/>
      <circle cx="20" cy="20" r="12" fill="#FFD700"/>
      <path d="M20 10 L25 20 L20 18 L15 20 Z" fill="#000"/>
    </svg>
  `),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const pickupIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface RideRequestViewProps {
    pickup: string;
    destination: string;
    pickupCoords?: { lat: number; lng: number };
    destinationCoords?: { lat: number; lng: number };
    onClose: () => void;
}

function MapController({ bounds }: { bounds: LatLng[] }) {
    const map = useMap();

    useEffect(() => {
        if (bounds.length > 0) {
            const latLngs = bounds.map(b => [b.lat, b.lng] as [number, number]);
            map.fitBounds(latLngs, { padding: [50, 50] });
        }
    }, [bounds, map]);

    return null;
}

function AnimatedCaptain({ route, speed = 50 }: { route: LatLng[], speed?: number }) {
    const [position, setPosition] = useState(0);
    const [currentPos, setCurrentPos] = useState(route[0]);

    useEffect(() => {
        if (position >= route.length - 1) return;

        const timer = setInterval(() => {
            setPosition(prev => {
                const next = prev + 1;
                if (next < route.length) {
                    setCurrentPos(route[next]);
                    return next;
                }
                return prev;
            });
        }, speed);

        return () => clearInterval(timer);
    }, [position, route, speed]);

    return <Marker position={currentPos} icon={carIcon} />;
}

export default function RideRequestView({
    pickup,
    destination,
    pickupCoords,
    destinationCoords,
    onClose
}: RideRequestViewProps) {
    const [isAnimating, setIsAnimating] = useState(true);

    // Default to Cairo if no coords provided
    const pickupLatLng = pickupCoords
        ? new LatLng(pickupCoords.lat, pickupCoords.lng)
        : new LatLng(30.0444, 31.2357);

    const destinationLatLng = destinationCoords
        ? new LatLng(destinationCoords.lat, destinationCoords.lng)
        : new LatLng(30.0626, 31.2497);

    // Generate route points (simple interpolation for demo)
    const generateRoute = (start: LatLng, end: LatLng, points: number = 20): LatLng[] => {
        const route: LatLng[] = [];
        for (let i = 0; i <= points; i++) {
            const ratio = i / points;
            const lat = start.lat + (end.lat - start.lat) * ratio;
            const lng = start.lng + (end.lng - start.lng) * ratio;
            route.push(new LatLng(lat, lng));
        }
        return route;
    };

    const route = generateRoute(pickupLatLng, destinationLatLng);
    const bounds = [pickupLatLng, destinationLatLng];

    return (
        <div className="fixed inset-0 z-50 bg-black flex animate-in fade-in duration-500">
            {/* Left Panel - Ride Info */}
            <div className="w-full md:w-[400px] bg-zinc-900 border-r border-[#FFD700]/30 flex flex-col animate-in slide-in-from-left duration-700">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-[#FFD700] text-2xl font-bold">Finding Captain</h2>
                        <p className="text-zinc-400 text-sm mt-1">Please wait...</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-zinc-400" />
                    </button>
                </div>

                {/* Route Details */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {/* Pickup */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700]" />
                            <div className="w-[2px] h-16 bg-gradient-to-b from-[#FFD700] to-zinc-700" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-zinc-500 mb-1">PICKUP</p>
                            <p className="text-white font-medium">{pickup || 'Current Location'}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-white border-2 border-zinc-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-zinc-500 mb-1">DESTINATION</p>
                            <p className="text-white font-medium">{destination || 'Select destination'}</p>
                        </div>
                    </div>

                    {/* Estimated Info */}
                    <div className="mt-8 p-4 bg-black/40 rounded-xl border border-zinc-800">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">ESTIMATED TIME</p>
                                <p className="text-[#FFD700] font-bold text-lg">12 min</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">DISTANCE</p>
                                <p className="text-[#FFD700] font-bold text-lg">5.2 km</p>
                            </div>
                        </div>
                    </div>

                    {/* Captain Info (Simulated) */}
                    <div className="p-4 bg-black/40 rounded-xl border border-zinc-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                                <Car size={24} className="text-black" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-bold">Captain Ahmed</p>
                                <p className="text-zinc-400 text-sm">Toyota Corolla • ABC 1234</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[#FFD700] font-bold">4.8 ★</p>
                                <p className="text-zinc-500 text-xs">2 min away</p>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3 p-4 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/30">
                        <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
                        <p className="text-[#FFD700] font-medium">Captain is on the way to pickup location</p>
                    </div>
                </div>

                {/* Cancel Button */}
                <div className="p-6 border-t border-zinc-800">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all"
                    >
                        Cancel Ride
                    </button>
                </div>
            </div>

            {/* Right Panel - Map */}
            <div className="flex-1 relative animate-in fade-in slide-in-from-right duration-700 delay-300">
                <MapContainer
                    center={pickupLatLng}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Route Line */}
                    <Polyline
                        positions={route.map(p => [p.lat, p.lng])}
                        color="#FFD700"
                        weight={4}
                        opacity={0.8}
                    />

                    {/* Pickup Marker */}
                    <Marker position={pickupLatLng} icon={pickupIcon} />

                    {/* Destination Marker */}
                    <Marker position={destinationLatLng} icon={pickupIcon} />

                    {/* Animated Captain */}
                    <AnimatedCaptain route={route} speed={100} />

                    {/* Auto-fit bounds */}
                    <MapController bounds={bounds} />
                </MapContainer>

                {/* Map Overlay Info */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#FFD700]/30">
                        <p className="text-[#FFD700] font-bold text-sm">Live Tracking</p>
                        <p className="text-white text-xs mt-1">Captain moving to pickup</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
