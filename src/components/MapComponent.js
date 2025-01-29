import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const MapComponent = ({ setSelectedMarker, markers }) => {
  const [map, setMap] = useState(null);

  const updateMapBounds = () => {
    if (!map || !window.google.maps) return;

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new window.google.maps.LatLng(marker.latitude, marker.longitude));
    });

    if (markers.length === 1) {
      map.setZoom(10);
      map.setCenter(bounds.getCenter());
    } else {
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  };

  useEffect(() => {
    updateMapBounds();
  }, [markers, map]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCX48Yb5B8VJJPyNI67kmGs_nuP3WUaK9I">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        onLoad={setMap}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
