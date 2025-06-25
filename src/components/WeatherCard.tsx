import React from 'react';
import { WeatherData, FavoriteCity } from '../types/weather';
import { weatherService } from '../services/weatherService';

interface WeatherCardProps {
  weather: WeatherData | null;
  onAddToFavorites: (cityData: FavoriteCity) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onAddToFavorites, isFavorite }) => {
  if (!weather) return null;

  const handleAddToFavorites = () => {
    onAddToFavorites({
      city: weather.city,
      country: weather.country
    });
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{weather.city}</h2>
          <span className="country">{weather.country}</span>
        </div>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleAddToFavorites}
          title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
          </svg>
        </button>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <img 
            src={weatherService.getIconUrl(weather.icon)} 
            alt={weather.description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{weather.temperature}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>
        <div className="weather-description">
          <p className="description">{weather.description}</p>
          <p className="feels-like">Ressenti {weather.feelsLike}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="detail-info">
            <span className="detail-label">Vent</span>
            <span className="detail-value">{weather.windSpeed} m/s</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <div className="detail-info">
            <span className="detail-label">Humidité</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 9V5a3 3 0 0 0-6 0v4"></path>
              <rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div className="detail-info">
            <span className="detail-label">Pression</span>
            <span className="detail-value">{weather.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
