// components/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IEvent } from "@/modules/events/model";

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

type MapProps = {
  events: IEvent[];
  center?: [number, number];
};

export default function Map({ events, center = [6.5244, 3.3792] }: MapProps) {
  return (
    <MapContainer 
      center={center} 
      zoom={8} 
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {events.map((event) =>
        event.coordinates?.coordinates?.length >= 2 ? (
          <Marker
            key={event.id}
            position={[
              event.coordinates.coordinates[1],
              event.coordinates.coordinates[0],
            ]}
          >
            <Popup>{event.title}</Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
