
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Geocode from 'react-geocode';

const Tracking = ()=>{

    const googleMapsAPI = import.meta.env.VITE_GOOGLE_MAPS_API
    Geocode.setApiKey(googleMapsAPI)
    const [address, setAddress] = useState('');
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [distance, setDistance] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [formattedCurrentLocation, setFormattedCurrentLocation] = useState('')
    const [carbonEmissions, setCarbonEmissions] = useState(null);
    const [driveTime, setDriveTime] = useState(null);
    const [weatherCondition, setWeatherConditon] =useState(null)
    const [weatherAlerts, setWeatherAlerts] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState(null)
    const [positionData, setPositionData] = useState(null)
  
    useEffect(() => {
      // Load the Google Maps JavaScript API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API}`;
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
  
      return () => {
        // Clean up the script tag
        document.body.removeChild(script);
      };
    }, []);
  
    useEffect(() => {
      // Calculate carbon emissions when distance changes
      if (distance) {
        calculateCarbonEmissions();
        calculteWeatherCondition();
      }
    }, [distance]);
  
    const initMap = () => {
      // Initialize the map
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 10
      });
      setMap(mapInstance);
  
      // Initialize the DirectionsService and DirectionsRenderer
      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance
      });
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
  
      // Get the current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          mapInstance.setCenter({ lat: latitude, lng: longitude });
        });
      }
    };
  
    const calculateDistance = (origin, destination) => {
      // Calculate the distance between two points
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING'
        },
        (response, status) => {
          if (status === 'OK') {
            const { distance, duration } = response.rows[0].elements[0];
            setDistance(distance.text);
            setDriveTime(duration.text);
          }
        }
      );
    };
    const calculteWeatherCondition = async () => {
      const apiToken = import.meta.env.VITE_WEATHER_API;
      try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${currentLocation.lat}&lon=${currentLocation.lng}&key=${apiToken}`);
        const result = response.data.data[0]
        const alertResponse = await axios.get(`https://api.weatherbit.io/v2.0/alerts?lat=${currentLocation.lat}&lon=${currentLocation.lng}&key=${apiToken}`);
        const alertResult = alertResponse.data
        setWeatherConditon(result)
        const weatherIcon = `https://www.weatherbit.io/static/img/icons/${result.weather.icon}.png`
        setWeatherIcon(weatherIcon)
        console.log(iconURL)
        console.log(result.weather.icon)
        setWeatherAlerts({alertTitle:alertResult.alerts[0]?.title, 
                          alertStartTime:alertResult.alerts[0]?.onset_local ,
                          alertEndTime:alertResult.alerts[0]?.ends_local})
      } catch (error) {
        
      }
    }
    const calculateCarbonEmissions = async () => {
      // Calculate carbon emissions using the Carbon Interface API
      const apiToken = `Bearer ${import.meta.env.VITE_CARBON_EMISSIONS_API}`;
      const postData = {
        type: 'shipping',
        weight_value: 200,
        weight_unit: 'kg',
        distance_value: parseFloat(distance),
        distance_unit: 'km',
        transport_method: 'truck'
      };
      const apiUrl = 'https://www.carboninterface.com/api/v1/estimates';
      const headers = {
        Authorization: apiToken,
        'Content-Type': 'application/json'
      };
  
      try {
        const response = await axios.post(apiUrl, postData, { headers });
        const carbonEmissionsResult = response.data;
        setCarbonEmissions(carbonEmissionsResult);
      } catch (error) {
        console.error(error);
        setCarbonEmissions({ message: 'Error in fetching' });
      }
    };
  
    const handleOrderReceived = () => {
      const apiToken = import.meta.env.VITE_GOOGLE_MAPS_API;
      const geocodeEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.lat},${currentLocation.lng}&key=${apiToken}`;
      // Calculate and display the directions
      const destination = 'Manila, Philippines'; // Update the destination here
      directionsService.route(
        {
          origin: currentLocation,
          destination: destination,
          travelMode: 'DRIVING'
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
            calculateDistance(currentLocation, destination);
  
            // Reverse geocode the destination coordinates to get the address
            Geocode.fromAddress(destination)
              .then(response => {
                const addressComponent = response.results[0].formatted_address;
                setAddress(addressComponent);
              })
              .catch(error => {
                console.error(error);
              });
  
              fetch(geocodeEndpoint)
              .then(response => response.json())
              .then(data => {
                if (data.status === 'OK') {
                  const results = data.results;
                  if (results.length > 0) {
                    const formattedAddress = results[0].formatted_address;
                    setFormattedCurrentLocation(formattedAddress)
                  } else {
                    setFormattedCurrentLocation('Location not found')
                  }
                } else {
                  console.log('Geocode request failed. Status:', data.status);
                }
              })
              .catch(error => {
                console.error('Error occurred during geocoding:', error);
              });
  
  
          }
        }
      );
      const watchPositionOptions = {
        enableHighAccuracy: true, // Enable high accuracy mode if available
        maximumAge: 0, // Force the latest position
        timeout: 5000 // Set a timeout value
      };
    
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const {} = position.coords
          setPositionData(position.coords)
        },
        error => {
          console.error('Error getting location:', error);
        },
        watchPositionOptions
      );
    
      // To stop watching the position updates, you can call:
      // navigator.geolocation.clearWatch(watchId);
    };
  
    return (
      <div className="Tracking">
        <div id="weatherapi-weather-widget-1"></div><script type='text/javascript' src='https://www.weatherapi.com/weather/widget.ashx?loc=1856592&wid=1&tu=2&div=weatherapi-weather-widget-1' async></script><noscript><a href="https://www.weatherapi.com/weather/q/pag-asa-1856592" alt="Hour by hour Pag-Asa weather">10 day hour by hour Pag-Asa weather</a></noscript>
        <div id="map" style={{ height: '400px' }}></div>
        {currentLocation && (
          <div className='map'>
            <div className="transportData">
              <h3>Transportation Data</h3>
            <p>Current Location: {formattedCurrentLocation}</p>
            <p>Destination: {address}</p>
            <p>Distance: {distance}</p>
            {carbonEmissions && (
              <p>Transport Method: {carbonEmissions.data ? <label>{carbonEmissions.data.attributes.transport_method}</label> : carbonEmissions.message}</p>
            )}
            {carbonEmissions && (
              <p>Cargo Weight: {carbonEmissions.data ? <label>{carbonEmissions.data.attributes.weight_value} kg</label> : carbonEmissions.message}</p>
            )}
            {positionData && <p>Speed: {positionData.speed == null? <label>You are idle or not moving</label>: <label>{positionData.speed}</label>}</p>}
            {positionData && <p>Altitude: {positionData.altitude == null? <label>You are idle or not moving</label>: <label>{positionData.altitude}</label>}</p>}
            {positionData && <p>Accuracy: {positionData.accuracy}</p>}
             {driveTime && <p>Drive Time: {driveTime}</p>}
            {carbonEmissions && (
              <p>Carbon Emissions:  <label>{carbonEmissions.data.attributes.carbon_g} grams - </label> 
             { carbonEmissions.data.attributes.carbon_g < 1000? <label>Contribute to sea-level rise, potentially affecting coastal regions and communities.</label>:
              carbonEmissions.data.attributes.carbon_g < 10000? <label>Exacerbate localized climate changes, leading to more frequent and severe weather events.</label>:
              carbonEmissions.data.attributes.carbon_g < 100000? <label>Increase the risk of extreme weather events, impacting agriculture and water resources.</label>:
              carbonEmissions.data.attributes.carbon_g < 1000000? <label>Intensify global warming, contributing to sea-level rise and potential threats to low-lying areas.</label>:
              carbonEmissions.data.attributes.carbon_g < 10000000? <label>Heighten environmental challenges, including disruptions to ecosystems and biodiversity.</label>:
              <label>Expose urban areas to increased air pollution and health risks.</label>}</p>
            )}
            </div>
            <div className="weatherData"> 
            <h3>Weather Condition</h3>
            {weatherCondition && <p>Current Weather: {weatherCondition.weather.description} </p> &&
            <img src={weatherIcon} alt="weather icon" />}
            {weatherCondition && <p>Rainfall Rate: {parseFloat(weatherCondition.precip)}mm/hr - {
            parseFloat(weatherCondition.precip) < 2.6? <label> Ligh Precipitation: Minimal impact on a driver's view while delivering cargo. Roads may become slightly wet, but visibility remains relatively clear, making for safe driving conditions.</label>:
            parseFloat(weatherCondition.precip) < 7.7? <label> Moderate Precipitation: Reduced visibility during cargo delivery. Rain intensifies, requiring windshield wipers and extra caution on wet roads to ensure cargo safety.</label>:
            parseFloat(weatherCondition.precip) < 51? <label> Heavy Precipitation: Significant reduction in visibility when delivering cargo. Intense rain can impair the driver's view and road conditions, demanding extra care to secure and transport goods safely.</label>:
            <label> Very Heavvy Precipitation: Extremely poor visibility during cargo delivery. Hazardous conditions arise, posing significant risks to cargo, driver safety, and the timely completion of deliveries.</label>}
            </p>}
            {weatherCondition && <p>Air Quality: {weatherCondition.aqi} - {
            weatherCondition.aqi < 51? <label> Good: Ideal conditions for cargo delivery and driver well-being. Minimal pollution, allowing for smooth and efficient transportation.</label>:
            weatherCondition.aqi < 101? <label> Moderate: Favorable for cargo delivery and driver comfort. Slightly elevated pollution levels may have minimal impact on logistics.</label>: 
            weatherCondition.aqi < 151? <label> Unhealthy for Sensitive Groups: Adequate for cargo delivery but may affect driver health and efficiency. Increased pollution levels may require occasional breaks. </label>:
            weatherCondition.aqi < 201? <label> Unhealthy: Cargo delivery may face delays due to reduced driver efficiency. Drivers with respiratory issues may experience discomfort.</label>:
            weatherCondition.aqi < 301? <label> Very Unhealthy: Challenging conditions for cargo delivery. Reduced visibility and driver discomfort are likely. Delays and safety precautions are necessary.</label>:
            <label> Hazardous: High risk for cargo delivery and driver safety. Significant visibility issues and health hazards for drivers. Delivery delays and safety measures are crucial.</label>}</p>}
            
            {weatherCondition && <p>Wind Speed: {weatherCondition.wind_spd}m/s</p>}
            {weatherCondition && <p>Wind Direction: {weatherCondition.wind_cdir_full}</p>}
            {weatherCondition && <p>Wind Angle: {weatherCondition.wind_dir}°</p>}
            {weatherCondition && <p>Temperature: {weatherCondition.temp}°C - { 
            weatherCondition.temp < -31? <label> Deep Freeze: Risk of freezing and potential damage to temperature-sensitive items. Proper insulation and heating may be required.</label>:
            weatherCondition.temp < -21? <label> Extreme Cold: Risk of freezing and potential damage to temperature-sensitive items. Proper insulation and heating may be required.</label>:
            weatherCondition.temp < -11? <label> Very Cold: Goods can be at risk of freezing, impacting their quality and integrity. Insulation and temperature control are crucial.</label>:
            weatherCondition.temp < 1? <label> Cold: Perishable items may lose freshness and quality. Adequate refrigeration and temperature monitoring are essential.</label>:
            weatherCondition.temp < 10.1? <label> Cool: Suitable for most perishables but requires controlled conditions to prevent spoilage or freezing.</label>:
            weatherCondition.temp < 25.1? <label> Room Temparature: Ideal for various goods, including pharmaceuticals and electronics. Temperature stability is critical.</label>:
            weatherCondition.temp < 35.1? <label> Warm: Risk of heat-related damage to sensitive cargo, such as chocolate, certain chemicals, and some electronics.</label>:
            weatherCondition.temp < 45.1? <label> Hot: Increased risk of spoilage, chemical reactions, and damage to goods. Ventilation and cooling are essential.</label>:
            <label>Extreme Heat: Cargo can experience severe damage, including melting, combustion, or spoilage. Extreme temperature control measures are necessary.</label>
            
            }</p>}
            {weatherCondition && <p>Humidity: {weatherCondition.rh}% -  {
            weatherCondition.rh < 31? <label> Low Humidity: Low humidity can result in a clear windshield but may lead to discomfort due to dry air. Reduced humidity poses minimal visibility challenges for drivers.</label>:
            weatherCondition.rh < 61? <label> Moderate Humidity: Comfortable humidity levels for drivers, maintaining clear visibility through the windshield. Condensation and fogging are less likely.</label>:
            weatherCondition.rh < 81? <label> High Humidity: Increased humidity may lead to slight fogging on the windshield. Drivers may need to use defogging systems occasionally.</label>:
            <label> Very High Humidity: High humidity can cause significant fogging on the windshield, reducing visibility. Frequent use of defoggers and wipers may be necessary for safe driving.</label>
            }</p>}
            {weatherCondition && <p>Visibility: {weatherCondition.vis}km - {
              weatherCondition.vis < 0.5? <label> Extremely hazardous conditions for cargo delivery. Nearly zero visibility demands extreme caution, and in some cases, postponing the delivery may be necessary.</label>:
              weatherCondition.vis < 1.1? <label> Very Poor Visibility: Hazardous conditions during cargo delivery. Extreme caution required, as visibility is severely compromised.</label>:
              weatherCondition.vis < 2.1? <label> Poor Visibility: Challenging conditions for cargo delivery. Visibility limitations may impact delivery schedules and safety.</label>:
              weatherCondition.vis < 4.1? <label> Moderate Visibility: Reduced visibility that can affect cargo delivery. Distant objects may be obscured, demanding careful driving.</label>:
              weatherCondition.vis < 6.1? <label> Good Visibility: Fair visibility for cargo delivery. Some distant objects may appear blurry, requiring extra caution.</label>:
              weatherCondition.vis < 10.1? <label> Very Good Visibility: Good conditions for cargo delivery. Most objects are visible, allowing for safe navigation.</label>:
              <label> Excellent Visibility: Optimal conditions for cargo delivery. Clear visibility ensures safe and efficient transportation.</label>
            }</p>}
            
            {weatherCondition && <p>UV Index: {weatherCondition.uv} - {
              weatherCondition.uv < 3? <label> Low: Minimal environmental impact. UV levels are low, and there is minimal risk of harm to the environment.</label> :
              weatherCondition.uv < 6? <label> Moderate: Moderate environmental impact. UV levels pose some risk to ecosystems, potentially affecting plant growth and aquatic habitats.</label> :
              weatherCondition.uv < 8? <label> High: Significant environmental impact. High UV levels can harm aquatic life, damage crops, and impact ecosystems by disrupting natural processes.</label> :
              weatherCondition.uv < 11? <label> Very High: Severe environmental impact. Very high UV levels can lead to extensive damage to crops, aquatic ecosystems, and marine habitats.</label> :
              <label> Extreme: Extreme environmental impact. Extreme UV levels can cause extensive harm to the environment, including severe damage to ecosystems, aquatic life, and crops.</label>
          }</p>}
          {weatherCondition && <p>Solar Radiation: {weatherCondition.solar_rad} W/m² {
          weatherCondition.solar_rad < 101 ? <label> Low Solar Radiation: Limited sunlight, potentially impacting solar energy generation and reducing its environmental benefits. Cargo deliveries may rely more on conventional energy sources.</label> :
          weatherCondition.solar_rad <251 ? <label> Moderate Solar Radiation: Adequate sunlight for reasonable solar energy production, contributing to reduced carbon emissions. Cargo deliveries benefit from a cleaner energy mix.</label>:
          weatherCondition.solar_rad <501 ? <label> High Solar Radiation: Abundant sunlight, optimizing solar energy generation and reducing reliance on non-renewable energy sources. This positively impacts the environment and cargo deliveries.</label>:
          weatherCondition.solar_rad <1000 ? <label> Very High Solar Radiation: Intense sunlight, which can lead to elevated temperatures. Cargo deliveries, especially for heat-sensitive goods, may require special precautions.</label>:
          <label> Extreme Solar Radiation: Excessive solar exposure, potentially causing extreme heat conditions. Cargo and driver well-being during deliveries become critical concerns.</label>
          }</p>}
  
          {weatherCondition && <p>Pressure: {weatherCondition.pres} mb {
        weatherCondition.slp < 950  ? <label>Very Low Pressure</label>:
        weatherCondition.slp < 980 ? <label>Low Pressure </label>:
        weatherCondition.slp  <1000 ? <label>Normal Pressure </label>:
        weatherCondition.slp < 1014 ? <label>Moderate Pressure </label>:
        <label>High Sea-Level Pressure: </label>
            
            }</p>}
         {weatherCondition && <p>Sea Level Pressure: {weatherCondition.slp} mb {
            weatherCondition.slp < 950  ? <label>Very Low Sea-Level Pressure: Extreme severe weather, such as hurricanes, posing significant risks to cargo, drivers, and the environment. Deliveries should be halted or rerouted during such events, with safety as the top priority.</label>:
            weatherCondition.slp < 980 ? <label>Low Sea-Level Pressure: Unsettled weather conditions may lead to delivery delays and driver safety concerns. It advises adopting precautionary measures.</label>:
            weatherCondition.slp  <1000 ? <label>Normal Sea-Level Pressure: Suitable for cargo deliveries with no significant weather concerns. This is an optimal period for standard delivery schedules. </label>:
            weatherCondition.slp < 1014 ? <label>Moderate Sea-Level Pressure: Fair weather conditions, ideal for cargo deliveries with minimal disruptions. It's a suitable time for efficient logistics planning. </label>:
            <label>High Sea-Level Pressure: Stable and clear weather, providing favorable conditions for cargo deliveries. However, extremely high pressure may impact air quality, suggesting the need for pollution monitoring. </label>
            
            }</p>}
  
          {weatherAlerts && <p>Weather alerts: {weatherAlerts.alertTitle == null? <label>No current alerts</label>: <label>{weatherAlerts.alertTitle}</label> }</p>}
          {weatherAlerts?.alertTitle && <p>Weather start time: {weatherAlerts.alertStartTime}</p>}
          {weatherAlerts?.alertTitle && <p>Weather ends in: {weatherAlerts.alertEndTime}</p>}
            </div>
          
  
  
            <button onClick={handleOrderReceived}>Start the directions!</button>
          </div>
        )}
      </div>
    );
}

export default Tracking;