import React from "react";

const WeatherDetailsCard = ({
  heading,
  valueOne,
  valueTwo,
  unitOne,
  unitTwo,
  icon,
  image,
}) => {
  return (
    <div className="weather-details-card">
      {icon && icon}
      {image && <img src={image} alt="img" />}
      <div>
        <p className="weather-detail">{heading}</p>
        {valueOne && (
          <p className="detail-value">
            {valueOne} {unitOne ?? ""}
          </p>
        )}
        {valueTwo && (
          <p className="detail-value">
            {valueTwo} {unitTwo ?? ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default WeatherDetailsCard;
