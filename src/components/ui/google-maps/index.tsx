import { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, Libraries } from '@react-google-maps/api';
import {useBrandStore} from "@store"



const libraries: Libraries = ["places"];

const mapContainerStyle = {
  width: '100%',
  height: '40vh',
};

const center = {
  lat: 41.2995, // Tashkentning latitude
  lng: 69.2401, // Tashkentning longitude
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {

  const {locationUpdate} = useBrandStore();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    const position = { lat: event.latLng!.lat(), lng: event.latLng!.lng() };
    setSelected(position);
    locationUpdate(position); // Call to store the selected location
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onClick={onMapClick}
    >
      {selected ? <Marker position={selected} /> : null}
    </GoogleMap>
  );
};

export default Map;