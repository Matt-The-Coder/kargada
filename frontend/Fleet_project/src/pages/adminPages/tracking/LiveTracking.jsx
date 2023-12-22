import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import mapboxgl from 'mapbox-gl';
import { useOutletContext } from 'react-router-dom';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '/public/assets/css/adminLayout/liveTracking.css'
import axios from 'axios';
import Speedometer from '../../../components/tracking/Speedometer';
const LiveTracking = () => {
  axios.defaults.withCredentials = true;
  const { isLoading, setIsLoading, mapStyle, setMapStyle } = useOutletContext();
  const mapboxToken = import.meta.env.VITE_MAPBOX_API;
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;
  const hostServer = import.meta.env.VITE_SERVER_HOST;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  const [mapDirection, setMapDirection] = useState(null);
  const directions = useRef(null);
  const markerTrack = useRef(null)
  const marker = useRef(null)
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(null);
  const [formattedCurrentLocation, setFormattedCurrentLocation] = useState('')
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [driveTime, setDriveTime] = useState(null);
  const [weatherCondition, setWeatherConditon] = useState(null)
  const [weatherAlerts, setWeatherAlerts] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [positionData, setPositionData] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mapInstructions = useRef(null)
  const instructionContainer = useRef(null)
  const detail = useRef(null)
  const arrow = useRef(null)
  const [isMapSetup, setIsMapSetup] = useState(false)
  const openDetail = () => {
    detail.current.classList.toggle("open")
  }
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileView);
      setTimeout(()=>{
        mapInstructions.current = document.querySelector(".mapboxgl-ctrl-directions.mapboxgl-ctrl")
        instructionContainer.current.appendChild(mapInstructions.current)
      }, 100)

    };

    // Initial check on component mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const setupMap = (lng, lat) => {
    setIsMapSetup(!isMapSetup)
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: [positionData ? positionData.longitude : lng, positionData ? positionData.latitude : lat],
      zoom: zoom,
    });

    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/driving',
      interactive: false,
      controls: { profileSwitcher: false, inputs: false },
      flyTo: true,
      geocoder: {
        accessToken: mapboxgl.accessToken,
      }
    });

    // Create a marker with the custom element
    marker.current = new mapboxgl.Marker({
      element: markerTrack.current, scale: '0'
    }).setPopup(new mapboxgl.Popup().setHTML("<p>I'm Here!</p>")) // add popup


    // Add the MapboxDirections control to the map
    map.current.addControl(directions.current, 'top-left');
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    map.current.addControl(new MapboxTraffic(), 'bottom-right');
  };

  const setupDarkMap = (lng, lat) => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: [positionData ? positionData.longitude : lng, positionData ? positionData.latitude : lat],
      zoom: zoom,
    });

    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/driving',
      interactive: false,
      controls: { profileSwitcher: false, inputs: false },
      flyTo: true,
      geocoder: {
        accessToken: mapboxgl.accessToken,
      }
    });

    // Create a marker with the custom element
    marker.current = new mapboxgl.Marker({
      element: markerTrack.current, scale: '0'
    }).setPopup(new mapboxgl.Popup().setHTML("<p>I'm Here!</p>")) // add popup


    // Add the MapboxDirections control to the map
    map.current.addControl(directions.current, 'top-left');
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    map.current.addControl(new MapboxTraffic(), 'bottom-right');


    // Add the Geolocate control to the map
    // map.current.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true,
    //     },
    //     trackUserLocation: true,
    //     showUserHeading: true,
    //   })
    // );


    // map.current.on('click', (e) => {
    //   const clickedLngLat = e.lngLat.toArray();
    //   const waypointIndex = directions.current.getWaypoints().length;
    //   directions.current.addWaypoint(waypointIndex, clickedLngLat);
    // });

  };
  const calculteWeatherCondition = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${hostServer}/weatherdata?lat=${latitude}&lon=${longitude}`);
      const result = response.data.weatherData
      const alertResult = response.data.weatherAlert
      setWeatherConditon(result)
      const weatherIcon = `https://www.weatherbit.io/static/img/icons/${result.weather.icon}.png`
      setWeatherIcon(weatherIcon)
      setWeatherAlerts({
        alertTitle: alertResult.alerts[0]?.title,
        alertStartTime: alertResult.alerts[0]?.onset_local,
        alertEndTime: alertResult.alerts[0]?.ends_local
      })
    } catch (error) {
      console.log(error)
    }
  }

  const calculateCarbonEmissions = async () => {
    try {
      const result = await axios.get(`/calculateFuelConsumptionWithPrice?miles=10&weight=2000`)
      const data = result.data
      console.log(data)
    } catch (error) {

    }

  }


  const setDirections = (longitude, latitude) => {
    setIsLoading(true)
      directions.current.setOrigin([longitude, latitude]);
      directions.current.setDestination([121.0417, 14.7286]);
      // calculteWeatherCondition(latitude, longitude)
      setIsLoading(false)
  };

  const toggleInstructions = () => {
    const instructionsContainer = document.querySelector(
      '.mapboxgl-ctrl-directions.mapboxgl-ctrl'
    );
    instructionsContainer.style.visibility = showInstructions ? 'hidden' : 'visible';
    setShowInstructions(!showInstructions);
  };
  // WATCH POSITION
  useEffect(() => {
    const succcessPosition = (position) => {
      const data = position.coords;
      setPositionData(data);
      marker.current.setLngLat([data?.longitude, data?.latitude]).addTo(map.current);
      marker.current.setRotation(data?.heading)
    };
    const errorPosition = (position) => {
      setPositionData(position.coords.longitude, position.coords.latitude);
    }
    navigator.geolocation.watchPosition(succcessPosition, errorPosition, {
      enableHighAccuracy: true,
    })
  }, [])
  useEffect(() => {
    setIsLoading(true);
    const successLocation = (position) => {
      const data = position.coords;
      if (isMapSetup) {
        mapContainer.current.classList.remove("mapboxgl-map")
        mapContainer.current.innerHTML = ""
        setupDarkMap(data.longitude, data.latitude)
        setIsMapSetup(!isMapSetup)
        if(instructionContainer.current){
          const instructions = instructionContainer.current
          instructionContainer.current.removeChild(instructions.children[0])
        }
        setDirections(data.longitude, data.latitude)
        mapInstructions.current = document.querySelector(".mapboxgl-ctrl-directions.mapboxgl-ctrl")
        instructionContainer.current.appendChild(mapInstructions.current)
      }
      else{
        // mapContainer.current.classList.remove("mapboxgl-map")
        // mapContainer.current.innerHTML = ""
        setupMap(data.longitude, data.latitude);
        setIsMapSetup(!isMapSetup)
        if(instructionContainer.current.hasChildNodes()){
          const instructions = instructionContainer.current
          console.log(instructions)
          instructionContainer.current.removeChild(instructions.children[0])
        }
        setDirections(data.longitude, data.latitude)
        mapInstructions.current = document.querySelector(".mapboxgl-ctrl-directions.mapboxgl-ctrl")
        instructionContainer.current.appendChild(mapInstructions.current)
      }
    };

    const errorLocation = () => {
      setupMap();
    };

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    setIsLoading(false);
  }, [mapStyle]);

  useEffect(()=>
  {

  }, [])

  return (
    <div className="LiveTracking">
      <div className="adminHeader">
        <div className="left">
          <h1>Tracking</h1>
          <ul className="breadcrumb">
            <li><Link to="/admin/dashboard" className='active'>
              Dashboard
            </Link></li>
            /
            <li><Link to="/admin/tracking/history">Tracking</Link></li>
          </ul>
        </div>
      </div>
      <div className="tracking-details">
        <div ref={mapContainer} className="map-container" />
        <button onClick={toggleInstructions}>
          {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
        </button>
        <div id="markerTrack" ref={markerTrack}>
        </div>
        <div className="transportData">
          <Speedometer speed={positionData?.speed} />
          <div className="vehicleData">
          </div>
          <h3>Transportation Data</h3>
          {/* <p>Current Location: {formattedCurrentLocation}</p>
            <p>Destination: {address}</p>
            <p>Distance: {distance}</p>
            {carbonEmissions && (
              <p>Transport Method: {carbonEmissions.data ? <label>{carbonEmissions.data.attributes.transport_method}</label> : carbonEmissions.message}</p>
            )}
            {carbonEmissions && (
              <p>Cargo Weight: {carbonEmissions.data ? <label>{carbonEmissions.data.attributes.weight_value} kg</label> : carbonEmissions.message}</p>
            )} */}
          {positionData && <p>Speed: {positionData.speed == null ? <label>You are idle or not moving</label> : <label>{positionData?.speed.toFixed(0)} m/s</label>}</p>}
          {positionData && <p>Altitude: {positionData.altitude == null ? <label>You are idle or not moving</label> : <label>{positionData?.altitude.toFixed(0)} meters</label>}</p>}
          {positionData && <p>Accuracy: {positionData?.accuracy.toFixed(0)}</p>}
          {positionData && <p>Heading: {positionData?.heading}</p>}
          {driveTime && <p>Drive Time: {driveTime}</p>}
        </div>





        {isMobile ?
          (
            <div className="detail-slide" ref={detail}>
              <div className="arrow-up">
                <i className='bx bx-arrow-from-bottom bx-fade-up' id='arrow-up' ref={arrow} onClick={openDetail}></i>
              </div>
              <center><h2>Directions</h2></center>
              <div className="instruction-container" ref={instructionContainer}>

              </div>
              <div className="weatherDataMobile">
                <center><h2>Weather Condition</h2></center>
                {weatherCondition && <p>Current Weather: {weatherCondition.weather.description} </p> &&
                  <img src={weatherIcon} alt="weather icon" />}
                <details>
                  <summary>Rainfall Rate</summary>
                  {weatherCondition && <p>{parseFloat(weatherCondition.precip)}mm/hr - {
                    parseFloat(weatherCondition.precip) < 2.6 ? <label> Ligh Precipitation: Minimal impact on a driver's view while delivering cargo. Roads may become slightly wet, but visibility remains relatively clear, making for safe driving conditions.</label> :
                      parseFloat(weatherCondition.precip) < 7.7 ? <label> Moderate Precipitation: Reduced visibility during cargo delivery. Rain intensifies, requiring windshield wipers and extra caution on wet roads to ensure cargo safety.</label> :
                        parseFloat(weatherCondition.precip) < 51 ? <label> Heavy Precipitation: Significant reduction in visibility when delivering cargo. Intense rain can impair the driver's view and road conditions, demanding extra care to secure and transport goods safely.</label> :
                          <label> Very Heavvy Precipitation: Extremely poor visibility during cargo delivery. Hazardous conditions arise, posing significant risks to cargo, driver safety, and the timely completion of deliveries.</label>}
                  </p>}
                </details>
                <details>
                  <summary>Air Quality </summary>
                  {weatherCondition && <p>{weatherCondition.aqi} - {
                    weatherCondition.aqi < 51 ? <label> Good: Ideal conditions for cargo delivery and driver well-being. Minimal pollution, allowing for smooth and efficient transportation.</label> :
                      weatherCondition.aqi < 101 ? <label> Moderate: Favorable for cargo delivery and driver comfort. Slightly elevated pollution levels may have minimal impact on logistics.</label> :
                        weatherCondition.aqi < 151 ? <label> Unhealthy for Sensitive Groups: Adequate for cargo delivery but may affect driver health and efficiency. Increased pollution levels may require occasional breaks. </label> :
                          weatherCondition.aqi < 201 ? <label> Unhealthy: Cargo delivery may face delays due to reduced driver efficiency. Drivers with respiratory issues may experience discomfort.</label> :
                            weatherCondition.aqi < 301 ? <label> Very Unhealthy: Challenging conditions for cargo delivery. Reduced visibility and driver discomfort are likely. Delays and safety precautions are necessary.</label> :
                              <label> Hazardous: High risk for cargo delivery and driver safety. Significant visibility issues and health hazards for drivers. Delivery delays and safety measures are crucial.</label>}</p>}
                </details>
                <details>
                  <summary>Wind Speed</summary>
                  {weatherCondition && <p>{weatherCondition.wind_spd}m/s</p>}

                </details>
                <details>
                  <summary>Wind Direction </summary>
                  {weatherCondition && <p>{weatherCondition.wind_cdir_full}</p>}
                </details>
                <details>
                  <summary>Wind Angle </summary>
                  {weatherCondition && <p> {weatherCondition.wind_dir}°</p>}
                </details>
                <details>
                  <summary>Temperature </summary>
                  {weatherCondition && <p>{weatherCondition.temp}°C - {
                    weatherCondition.temp < -31 ? <label> Deep Freeze: Risk of freezing and potential damage to temperature-sensitive items. Proper insulation and heating may be required.</label> :
                      weatherCondition.temp < -21 ? <label> Extreme Cold: Risk of freezing and potential damage to temperature-sensitive items. Proper insulation and heating may be required.</label> :
                        weatherCondition.temp < -11 ? <label> Very Cold: Goods can be at risk of freezing, impacting their quality and integrity. Insulation and temperature control are crucial.</label> :
                          weatherCondition.temp < 1 ? <label> Cold: Perishable items may lose freshness and quality. Adequate refrigeration and temperature monitoring are essential.</label> :
                            weatherCondition.temp < 10.1 ? <label> Cool: Suitable for most perishables but requires controlled conditions to prevent spoilage or freezing.</label> :
                              weatherCondition.temp < 25.1 ? <label> Room Temparature: Ideal for various goods, including pharmaceuticals and electronics. Temperature stability is critical.</label> :
                                weatherCondition.temp < 35.1 ? <label> Warm: Risk of heat-related damage to sensitive cargo, such as chocolate, certain chemicals, and some electronics.</label> :
                                  weatherCondition.temp < 45.1 ? <label> Hot: Increased risk of spoilage, chemical reactions, and damage to goods. Ventilation and cooling are essential.</label> :
                                    <label>Extreme Heat: Cargo can experience severe damage, including melting, combustion, or spoilage. Extreme temperature control measures are necessary.</label>

                  }</p>}
                </details>
                <details>
                  <summary>Humidity</summary>
                  {weatherCondition && <p>{weatherCondition.rh}% -  {
                    weatherCondition.rh < 31 ? <label> Low Humidity: Low humidity can result in a clear windshield but may lead to discomfort due to dry air. Reduced humidity poses minimal visibility challenges for drivers.</label> :
                      weatherCondition.rh < 61 ? <label> Moderate Humidity: Comfortable humidity levels for drivers, maintaining clear visibility through the windshield. Condensation and fogging are less likely.</label> :
                        weatherCondition.rh < 81 ? <label> High Humidity: Increased humidity may lead to slight fogging on the windshield. Drivers may need to use defogging systems occasionally.</label> :
                          <label> Very High Humidity: High humidity can cause significant fogging on the windshield, reducing visibility. Frequent use of defoggers and wipers may be necessary for safe driving.</label>
                  }</p>}
                </details>
                <details>
                  <summary>Visibility</summary>
                  {weatherCondition && <p>{weatherCondition.vis}km - {
                    weatherCondition.vis < 0.5 ? <label> Extremely hazardous conditions for cargo delivery. Nearly zero visibility demands extreme caution, and in some cases, postponing the delivery may be necessary.</label> :
                      weatherCondition.vis < 1.1 ? <label> Very Poor Visibility: Hazardous conditions during cargo delivery. Extreme caution required, as visibility is severely compromised.</label> :
                        weatherCondition.vis < 2.1 ? <label> Poor Visibility: Challenging conditions for cargo delivery. Visibility limitations may impact delivery schedules and safety.</label> :
                          weatherCondition.vis < 4.1 ? <label> Moderate Visibility: Reduced visibility that can affect cargo delivery. Distant objects may be obscured, demanding careful driving.</label> :
                            weatherCondition.vis < 6.1 ? <label> Good Visibility: Fair visibility for cargo delivery. Some distant objects may appear blurry, requiring extra caution.</label> :
                              weatherCondition.vis < 10.1 ? <label> Very Good Visibility: Good conditions for cargo delivery. Most objects are visible, allowing for safe navigation.</label> :
                                <label> Excellent Visibility: Optimal conditions for cargo delivery. Clear visibility ensures safe and efficient transportation.</label>
                  }</p>}
                </details>
                <details>
                  <summary>UV Index</summary>
                  {weatherCondition && <p>{weatherCondition.uv} - {
                    weatherCondition.uv < 3 ? <label> Low: Minimal environmental impact. UV levels are low, and there is minimal risk of harm to the environment.</label> :
                      weatherCondition.uv < 6 ? <label> Moderate: Moderate environmental impact. UV levels pose some risk to ecosystems, potentially affecting plant growth and aquatic habitats.</label> :
                        weatherCondition.uv < 8 ? <label> High: Significant environmental impact. High UV levels can harm aquatic life, damage crops, and impact ecosystems by disrupting natural processes.</label> :
                          weatherCondition.uv < 11 ? <label> Very High: Severe environmental impact. Very high UV levels can lead to extensive damage to crops, aquatic ecosystems, and marine habitats.</label> :
                            <label> Extreme: Extreme environmental impact. Extreme UV levels can cause extensive harm to the environment, including severe damage to ecosystems, aquatic life, and crops.</label>
                  }</p>}
                </details>
                <details>
                  <summary>Solar Radiation</summary>
                  {weatherCondition && <p>{weatherCondition.solar_rad} W/m² {
                    weatherCondition.solar_rad < 101 ? <label> Low Solar Radiation: Limited sunlight, potentially impacting solar energy generation and reducing its environmental benefits. Cargo deliveries may rely more on conventional energy sources.</label> :
                      weatherCondition.solar_rad < 251 ? <label> Moderate Solar Radiation: Adequate sunlight for reasonable solar energy production, contributing to reduced carbon emissions. Cargo deliveries benefit from a cleaner energy mix.</label> :
                        weatherCondition.solar_rad < 501 ? <label> High Solar Radiation: Abundant sunlight, optimizing solar energy generation and reducing reliance on non-renewable energy sources. This positively impacts the environment and cargo deliveries.</label> :
                          weatherCondition.solar_rad < 1000 ? <label> Very High Solar Radiation: Intense sunlight, which can lead to elevated temperatures. Cargo deliveries, especially for heat-sensitive goods, may require special precautions.</label> :
                            <label> Extreme Solar Radiation: Excessive solar exposure, potentially causing extreme heat conditions. Cargo and driver well-being during deliveries become critical concerns.</label>
                  }</p>}
                </details>
                <details>
                  <summary>Pressure</summary>
                  {weatherCondition && <p>{weatherCondition.pres} mb {
                    weatherCondition.slp < 950 ? <label>Very Low Pressure</label> :
                      weatherCondition.slp < 980 ? <label>Low Pressure </label> :
                        weatherCondition.slp < 1000 ? <label>Normal Pressure </label> :
                          weatherCondition.slp < 1014 ? <label>Moderate Pressure </label> :
                            <label>High Sea-Level Pressure: </label>

                  }</p>}
                </details>
                <details>
                  <summary>Sea Level Pressure</summary>
                  {weatherCondition && <p>{weatherCondition.slp} mb {
                    weatherCondition.slp < 950 ? <label>Very Low Sea-Level Pressure: Extreme severe weather, such as hurricanes, posing significant risks to cargo, drivers, and the environment. Deliveries should be halted or rerouted during such events, with safety as the top priority.</label> :
                      weatherCondition.slp < 980 ? <label>Low Sea-Level Pressure: Unsettled weather conditions may lead to delivery delays and driver safety concerns. It advises adopting precautionary measures.</label> :
                        weatherCondition.slp < 1000 ? <label>Normal Sea-Level Pressure: Suitable for cargo deliveries with no significant weather concerns. This is an optimal period for standard delivery schedules. </label> :
                          weatherCondition.slp < 1014 ? <label>Moderate Sea-Level Pressure: Fair weather conditions, ideal for cargo deliveries with minimal disruptions. It's a suitable time for efficient logistics planning. </label> :
                            <label>High Sea-Level Pressure: Stable and clear weather, providing favorable conditions for cargo deliveries. However, extremely high pressure may impact air quality, suggesting the need for pollution monitoring. </label>

                  }</p>}
                </details>
                <details>
                  <summary>Weather Alerts</summary>
                  {weatherAlerts && <p>{weatherAlerts.alertTitle == null ? <label>No current alerts</label> : <label>{weatherAlerts.alertTitle}</label>}</p>}
                  {weatherAlerts?.alertTitle && <p>Weather start time: {weatherAlerts.alertStartTime}</p>}
                  {weatherAlerts?.alertTitle && <p>Weather ends in: {weatherAlerts.alertEndTime}</p>}
                </details>
              </div>
            </div>
          ) :
          (<> <center><h3>Weather Condition</h3></center> 
            <div className="weatherData">
              <div className="weatherIcon">
                {weatherCondition && <p>Current Weather: {weatherCondition.weather.description} </p> &&
                  <img src={weatherIcon} alt="weather icon" />}
              </div>
              <div className="rainfallRate">
                {weatherCondition && <p>Rainfall Rate: {parseFloat(weatherCondition.precip)}mm/hr - {
                  parseFloat(weatherCondition.precip) < 2.6 ? <label> Ligh Precipitation: Minimal impact on a driver's view while delivering cargo. Roads may become slightly wet, but visibility remains relatively clear, making for safe driving conditions.</label> :
                    parseFloat(weatherCondition.precip) < 7.7 ? <label> Moderate Precipitation: Reduced visibility during cargo delivery. Rain intensifies, requiring windshield wipers and extra caution on wet roads to ensure cargo safety.</label> :
                      parseFloat(weatherCondition.precip) < 51 ? <label> Heavy Precipitation: Significant reduction in visibility when delivering cargo. Intense rain can impair the driver's view and road conditions, demanding extra care to secure and transport goods safely.</label> :
                        <label> Very Heavvy Precipitation: Extremely poor visibility during cargo delivery. Hazardous conditions arise, posing significant risks to cargo, driver safety, and the timely completion of deliveries.</label>}
                </p>}
              </div>
              <div className="airQuality">
                {weatherCondition && <p>Air Quality: {weatherCondition.aqi} - {
                  weatherCondition.aqi < 51 ? <label> Good: Ideal conditions for cargo delivery and driver well-being. Minimal pollution, allowing for smooth and efficient transportation.</label> :
                    weatherCondition.aqi < 101 ? <label> Moderate: Favorable for cargo delivery and driver comfort. Slightly elevated pollution levels may have minimal impact on logistics.</label> :
                      weatherCondition.aqi < 151 ? <label> Unhealthy for Sensitive Groups: Adequate for cargo delivery but may affect driver health and efficiency. Increased pollution levels may require occasional breaks. </label> :
                        weatherCondition.aqi < 201 ? <label> Unhealthy: Cargo delivery may face delays due to reduced driver efficiency. Drivers with respiratory issues may experience discomfort.</label> :
                          weatherCondition.aqi < 301 ? <label> Very Unhealthy: Challenging conditions for cargo delivery. Reduced visibility and driver discomfort are likely. Delays and safety precautions are necessary.</label> :
                            <label> Hazardous: High risk for cargo delivery and driver safety. Significant visibility issues and health hazards for drivers. Delivery delays and safety measures are crucial.</label>}</p>}
              </div>
              <div className="windspeed">
                {weatherCondition && <p>Wind Speed: {weatherCondition.wind_spd}m/s</p>}
              </div>
              <div className="windDirection">
                {weatherCondition && <p>Wind Direction: {weatherCondition.wind_cdir_full}</p>}
              </div>
              <div className="windAngle">
                {weatherCondition && <p>Wind Angle: {weatherCondition.wind_dir}°</p>}
              </div>
              <div className="temperature">
                {weatherCondition && <p>Temperature: {weatherCondition.temp}°C - {
                  weatherCondition.temp < -31 ? <label> Deep Freeze: Risk of freezing and potential damage to temperature-sensitive items. Proper insulation and heating may be required.</label> :
                    weatherCondition.temp < -21 ? <label> Extreme Cold: Risk of freezing and potential damage to temperature-sensitive items. Proper insulation and heating may be required.</label> :
                      weatherCondition.temp < -11 ? <label> Very Cold: Goods can be at risk of freezing, impacting their quality and integrity. Insulation and temperature control are crucial.</label> :
                        weatherCondition.temp < 1 ? <label> Cold: Perishable items may lose freshness and quality. Adequate refrigeration and temperature monitoring are essential.</label> :
                          weatherCondition.temp < 10.1 ? <label> Cool: Suitable for most perishables but requires controlled conditions to prevent spoilage or freezing.</label> :
                            weatherCondition.temp < 25.1 ? <label> Room Temparature: Ideal for various goods, including pharmaceuticals and electronics. Temperature stability is critical.</label> :
                              weatherCondition.temp < 35.1 ? <label> Warm: Risk of heat-related damage to sensitive cargo, such as chocolate, certain chemicals, and some electronics.</label> :
                                weatherCondition.temp < 45.1 ? <label> Hot: Increased risk of spoilage, chemical reactions, and damage to goods. Ventilation and cooling are essential.</label> :
                                  <label>Extreme Heat: Cargo can experience severe damage, including melting, combustion, or spoilage. Extreme temperature control measures are necessary.</label>

                }</p>}
              </div>
              <div className="humidity">
                {weatherCondition && <p>Humidity: {weatherCondition.rh}% -  {
                  weatherCondition.rh < 31 ? <label> Low Humidity: Low humidity can result in a clear windshield but may lead to discomfort due to dry air. Reduced humidity poses minimal visibility challenges for drivers.</label> :
                    weatherCondition.rh < 61 ? <label> Moderate Humidity: Comfortable humidity levels for drivers, maintaining clear visibility through the windshield. Condensation and fogging are less likely.</label> :
                      weatherCondition.rh < 81 ? <label> High Humidity: Increased humidity may lead to slight fogging on the windshield. Drivers may need to use defogging systems occasionally.</label> :
                        <label> Very High Humidity: High humidity can cause significant fogging on the windshield, reducing visibility. Frequent use of defoggers and wipers may be necessary for safe driving.</label>
                }</p>}
              </div>
              <div className="visibility">

                {weatherCondition && <p>Visibility: {weatherCondition.vis}km - {
                  weatherCondition.vis < 0.5 ? <label> Extremely hazardous conditions for cargo delivery. Nearly zero visibility demands extreme caution, and in some cases, postponing the delivery may be necessary.</label> :
                    weatherCondition.vis < 1.1 ? <label> Very Poor Visibility: Hazardous conditions during cargo delivery. Extreme caution required, as visibility is severely compromised.</label> :
                      weatherCondition.vis < 2.1 ? <label> Poor Visibility: Challenging conditions for cargo delivery. Visibility limitations may impact delivery schedules and safety.</label> :
                        weatherCondition.vis < 4.1 ? <label> Moderate Visibility: Reduced visibility that can affect cargo delivery. Distant objects may be obscured, demanding careful driving.</label> :
                          weatherCondition.vis < 6.1 ? <label> Good Visibility: Fair visibility for cargo delivery. Some distant objects may appear blurry, requiring extra caution.</label> :
                            weatherCondition.vis < 10.1 ? <label> Very Good Visibility: Good conditions for cargo delivery. Most objects are visible, allowing for safe navigation.</label> :
                              <label> Excellent Visibility: Optimal conditions for cargo delivery. Clear visibility ensures safe and efficient transportation.</label>
                }</p>}
              </div>

              <div className="uvIndex">
                {weatherCondition && <p>UV Index: {weatherCondition.uv} - {
                  weatherCondition.uv < 3 ? <label> Low: Minimal environmental impact. UV levels are low, and there is minimal risk of harm to the environment.</label> :
                    weatherCondition.uv < 6 ? <label> Moderate: Moderate environmental impact. UV levels pose some risk to ecosystems, potentially affecting plant growth and aquatic habitats.</label> :
                      weatherCondition.uv < 8 ? <label> High: Significant environmental impact. High UV levels can harm aquatic life, damage crops, and impact ecosystems by disrupting natural processes.</label> :
                        weatherCondition.uv < 11 ? <label> Very High: Severe environmental impact. Very high UV levels can lead to extensive damage to crops, aquatic ecosystems, and marine habitats.</label> :
                          <label> Extreme: Extreme environmental impact. Extreme UV levels can cause extensive harm to the environment, including severe damage to ecosystems, aquatic life, and crops.</label>
                }</p>}
              </div>
              <div className="solarRadiation">
                {weatherCondition && <p>Solar Radiation: {weatherCondition.solar_rad} W/m² {
                  weatherCondition.solar_rad < 101 ? <label> Low Solar Radiation: Limited sunlight, potentially impacting solar energy generation and reducing its environmental benefits. Cargo deliveries may rely more on conventional energy sources.</label> :
                    weatherCondition.solar_rad < 251 ? <label> Moderate Solar Radiation: Adequate sunlight for reasonable solar energy production, contributing to reduced carbon emissions. Cargo deliveries benefit from a cleaner energy mix.</label> :
                      weatherCondition.solar_rad < 501 ? <label> High Solar Radiation: Abundant sunlight, optimizing solar energy generation and reducing reliance on non-renewable energy sources. This positively impacts the environment and cargo deliveries.</label> :
                        weatherCondition.solar_rad < 1000 ? <label> Very High Solar Radiation: Intense sunlight, which can lead to elevated temperatures. Cargo deliveries, especially for heat-sensitive goods, may require special precautions.</label> :
                          <label> Extreme Solar Radiation: Excessive solar exposure, potentially causing extreme heat conditions. Cargo and driver well-being during deliveries become critical concerns.</label>
                }</p>}

              </div>
              <div className="pressure">
                {weatherCondition && <p>Pressure: {weatherCondition.pres} mb {
                  weatherCondition.slp < 950 ? <label>Very Low Pressure</label> :
                    weatherCondition.slp < 980 ? <label>Low Pressure </label> :
                      weatherCondition.slp < 1000 ? <label>Normal Pressure </label> :
                        weatherCondition.slp < 1014 ? <label>Moderate Pressure </label> :
                          <label>High Sea-Level Pressure: </label>

                }</p>}
              </div>
              <div className="seaPressure">
                {weatherCondition && <p>Sea Level Pressure: {weatherCondition.slp} mb {
                  weatherCondition.slp < 950 ? <label>Very Low Sea-Level Pressure: Extreme severe weather, such as hurricanes, posing significant risks to cargo, drivers, and the environment. Deliveries should be halted or rerouted during such events, with safety as the top priority.</label> :
                    weatherCondition.slp < 980 ? <label>Low Sea-Level Pressure: Unsettled weather conditions may lead to delivery delays and driver safety concerns. It advises adopting precautionary measures.</label> :
                      weatherCondition.slp < 1000 ? <label>Normal Sea-Level Pressure: Suitable for cargo deliveries with no significant weather concerns. This is an optimal period for standard delivery schedules. </label> :
                        weatherCondition.slp < 1014 ? <label>Moderate Sea-Level Pressure: Fair weather conditions, ideal for cargo deliveries with minimal disruptions. It's a suitable time for efficient logistics planning. </label> :
                          <label>High Sea-Level Pressure: Stable and clear weather, providing favorable conditions for cargo deliveries. However, extremely high pressure may impact air quality, suggesting the need for pollution monitoring. </label>

                }</p>}
              </div>

              <div className="weatherAlert">
                {weatherAlerts && <p>Weather alerts: {weatherAlerts.alertTitle == null ? <label>No current alerts</label> : <label>{weatherAlerts.alertTitle}</label>}</p>}
                {weatherAlerts?.alertTitle && <p>Weather start time: {weatherAlerts.alertStartTime}</p>}
                {weatherAlerts?.alertTitle && <p>Weather ends in: {weatherAlerts.alertEndTime}</p>}
              </div>

            </div> </>)}


      </div>
    </div>

  );
};

export default LiveTracking;