import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import { useOutletContext } from 'react-router-dom';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'; 
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import axios from 'axios';

const HistoryTracking = () => {
  const { isLoading, setIsLoading } = useOutletContext();
  const mapboxToken = import.meta.env.VITE_MAPBOX_API
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;
  const hostServer = import.meta.env.VITE_SERVER_HOST
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [distance, setDistance] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [formattedCurrentLocation, setFormattedCurrentLocation] = useState('');
  const [positionData, setPositionData] = useState(null);
  const [zoom, setZoom] = useState(15);


  const setupMap = (lng, lat) => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
   

    const nav = new mapboxgl.NavigationControl();

    // Create the MapboxDirections control and add it to the map
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });
    map.current.addControl(directions, 'top-left');
    map.current.addControl(nav, 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl());
    // Set marker options.
  };

  const setDirections = async () => {
    const directionInputA = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input[type="text"]');
    const directionInputB = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input[type="text"]');
    directionInputA.value = `${positionData.longitude},${positionData.latitude} `;
    directionInputB.value = 121.0417  + "," + 14.7286 ;
    const res = await axios.get(`${hostServer}/getDirections`);
    console.log(await res.data);
  };

  useEffect(() => {
    setIsLoading(true);

    const successLocation = (position) => {
      const data = position.coords;
      setPositionData(data);
      setupMap(data.longitude, data.latitude);
    };

    const errorLocation = (position) => {
      setupMap(position.coords.longitude, position.coords.latitude);
    };

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    setIsLoading(false);
  }, []);

  return (
    <div className="HistoryTracking">
      <center>
        <h1>This is History Tracking</h1>
      </center>
      <div ref={mapContainer} className="map-container" />
      <button onClick={setDirections}>Start Directions</button>
    </div>
  );
};

export default HistoryTracking;