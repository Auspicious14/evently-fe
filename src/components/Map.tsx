"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IEvent } from "@/modules/events/model";

// Fix Leaflet default icon issue in Next.js
const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapProps = {
  events: IEvent[];
  center?: [number, number];
  zoom?: number;
  height?: string;
};

export default function Map({ 
  events, 
  center = [9.0820, 8.6753], // Nigeria center
  zoom = 6,
  height = '400px' 
}: MapProps) {
  
  // Geocode location names to coordinates (simplified - in production use a geocoding API)
  const getCoordinates = (location: string): [number, number] | null => {
    // Common Nigerian cities coordinates
    const cityCoords: Record<string, [number, number]> = {
      'Lagos': [6.5244, 3.3792],
      'Abuja': [9.0765, 7.3986],
      'Port Harcourt': [4.8156, 7.0498],
      'Kano': [12.0022, 8.5919],
      'Ibadan': [7.3775, 3.9470],
      'Kaduna': [10.5105, 7.4165],
      'Benin City': [6.3350, 5.6037],
      'Enugu': [6.5244, 7.5105],
      'Jos': [9.8965, 8.8583],
      'Ilorin': [8.5000, 4.5500],
    };

    // Find city in location string
    for (const [city, coords] of Object.entries(cityCoords)) {
      if (location.toLowerCase().includes(city.toLowerCase())) {
        return coords;
      }
    }

    return null;
  };

  const eventsWithCoords = events?.map(event => ({
      ...event,
      coords: event?.coordinates?.coordinates?.length >= 2
        ? [event?.coordinates?.coordinates[1], event?.coordinates?.coordinates[0]] as [number, number]
        : getCoordinates(event?.location)
    }))
    .filter(event => event?.coords !== null);

  return (
    <div className="rounded-xl overflow-hidden border shadow-sm">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height, width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {eventsWithCoords.map((event) => (
          event.coords && (
            <Marker 
              key={event.id} 
              position={event.coords}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm mb-1">{event.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {event.location}
                  </p>
                  <a 
                    href={`/events/${event.id}`}
                    className="text-xs text-primary hover:underline"
                  >
                    View Details →
                  </a>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

// components/MapWrapper.tsx - Use this for client-side only rendering
import dynamic from 'next/dynamic';

const MapWrapper = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border bg-gray-100 flex items-center justify-center" style={{ height: '400px' }}>
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
});

export { MapWrapper };
