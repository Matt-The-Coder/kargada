import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';

const AddReport = ()=>{
    const token = import.meta.env.VITE_MAPBOX_API
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 10
      });
      const latitude =32.7577
      const longitude = -120.4376
    
      const handleDirectionsClick = () => {
        setViewport({
          ...viewport,
          latitude: latitude,
          longitude: longitude
        });
      };

    return(
        <div className="AddReport">

<div style={{ height: '100vh' }}>
<Map
    mapLib={import('mapbox-gl')}
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
    </div>

        </div>
    )
}

export default AddReport;