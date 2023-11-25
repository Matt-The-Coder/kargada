import { useState, useEffect, useRef } from "react";
import odometer from "/assets/img/vectors/odometer.svg";
import needle from "/assets/img/vectors/needle.svg";
import '/public/assets/css/adminLayout/historyTracking.css'

const Speedometer = ({ speed }) => {
  const pointerRef = useRef(null);

  useEffect(() => {
    changeMeterValue(speed);
  }, [speed]);

  const changeMeterValue = (speed) => {
    if (speed !== null) {
      pointerRef.current.style.transform = `rotate(${speed}deg)`;
    }
  };

  return (
    <div className="Speedometer">
      <p>
        Speed:{" "}
        {speed ? (
          <label>{speed}</label>
        ) : (
          <label>You are not moving</label>
        )}
      </p>
      <div className="meter">
        <img src={odometer} alt="meter" className="meter-image" />
        <img src={needle} alt="needle" className="needle" ref={pointerRef} />
      </div>
    </div>
  );
};

export default Speedometer;