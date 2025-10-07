"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { IEvent } from "@/modules/events/model";

type MapProps = {
  events: IEvent[];
  center?: { lat: number; lng: number };
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 6.5244, // Lagos latitude
  lng: 3.3792, // Lagos longitude
};

export default function Map({ events, center = defaultCenter }: MapProps) {
  return (
    <LoadScript
    // googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {events.map(
          (event) =>
            event.coordinates &&
            event.coordinates.coordinates &&
            event.coordinates.coordinates.length >= 2 && (
              <Marker
                key={event.id}
                position={{
                  lat: event.coordinates.coordinates[1],
                  lng: event.coordinates.coordinates[0],
                }}
                title={event.title}
              />
            )
        )}
      </GoogleMap>
    </LoadScript>
  );
}
