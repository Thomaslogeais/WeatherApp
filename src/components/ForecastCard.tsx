import React from 'react';
import { ForecastDay } from '../types/weather';
import { weatherService } from '../services/weatherService';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-card">
      <h3 className="forecast-title">Prévisions 5 jours</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-date">
              {day.date}
            </div>
            <div className="forecast-weather">
              <img 
                src={weatherService.getIconUrl(day.icon)} 
                alt={day.description}
                className="forecast-icon"
              />
              <span className="forecast-description">{day.description}</span>
            </div>
            <div className="forecast-temps">
              <span className="temp-max">{day.tempMax}°</span>
              <span className="temp-min">{day.tempMin}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
