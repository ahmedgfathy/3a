'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { X, Search, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapModalProps {
    onClose: () => void;
    onSelectLocation: (address: string, lat: number, lng: number) => void;
    initialValue?: string;
}

function LocationMarker({ position, setPosition, setAddress }: any) {
    const map = useMapEvents({
        click(e) {
            const newPos = e.latlng;
            setPosition(newPos);

            // Reverse geocode
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPos.lat}&lon=${newPos.lng}&addressdetails=1`)
                .then(res => res.json())
                .then(data => {
                    setAddress(data.display_name || `${newPos.lat}, ${newPos.lng}`);
                })
                .catch(() => {
                    setAddress(`${newPos.lat}, ${newPos.lng}`);
                });
        },
    });

    return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

function MapController({ center }: { center: LatLng }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
}

export default function MapModal({ onClose, onSelectLocation, initialValue }: MapModalProps) {
    const [position, setPosition] = useState<LatLng | null>(null);
    const [address, setAddress] = useState(initialValue || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [mapCenter, setMapCenter] = useState<LatLng>(new LatLng(30.0444, 31.2357)); // Cairo default

    useEffect(() => {
        // Get user's current location on mount
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newCenter = new LatLng(pos.coords.latitude, pos.coords.longitude);
                    setMapCenter(newCenter);
                    setPosition(newCenter);

                    // Get address for current location
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&addressdetails=1`)
                        .then(res => res.json())
                        .then(data => {
                            setAddress(data.display_name || '');
                        });
                },
                () => {
                    // Default to Cairo if geolocation fails
                    console.log('Using default location: Cairo');
                }
            );
        }
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const newPos = new LatLng(parseFloat(result.lat), parseFloat(result.lon));
                setPosition(newPos);
                setMapCenter(newPos);
                setAddress(result.display_name);
            } else {
                alert('Location not found. Please try a different search.');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed. Please try again.');
        }
        setIsSearching(false);
    };

    const handleConfirm = () => {
        if (position && address) {
            onSelectLocation(address, position.lat, position.lng);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-4xl h-[80vh] bg-zinc-900 rounded-2xl border border-[#FFD700]/30 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black/50">
                    <h3 className="text-[#FFD700] font-bold text-lg flex items-center gap-2">
                        <MapPin size={20} />
                        Select Location
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-zinc-400" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-zinc-800 bg-black/30">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-3 text-zinc-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Search for an address..."
                                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700] transition-all text-sm"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="px-6 py-2.5 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFC000] transition-all disabled:opacity-50"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>

                {/* Map */}
                <div className="flex-1 relative">
                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        className="z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                        <MapController center={mapCenter} />
                    </MapContainer>
                </div>

                {/* Selected Address Display */}
                {address && (
                    <div className="p-4 border-t border-zinc-800 bg-black/50">
                        <p className="text-sm text-zinc-400 mb-1">Selected Address:</p>
                        <p className="text-white font-medium">{address}</p>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="p-4 border-t border-zinc-800 flex gap-3 bg-black/50">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!position || !address}
                        className="flex-1 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFC000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm Location
                    </button>
                </div>
            </div>
        </div>
    );
}
