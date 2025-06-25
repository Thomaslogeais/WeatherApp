import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import FavoritesList from './components/FavoritesList';
import { weatherService } from './services/weatherService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WeatherData, ForecastDay, FavoriteCity } from './types/weather';
import './styles/App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('weatherFavorites', []);

  const handleSearch = async (city: string): Promise<void> => {
    setLoading(true);
    setError('');
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = (cityData: FavoriteCity): void => {
    const isAlreadyFavorite = favorites.some(
      fav => fav.city.toLowerCase() === cityData.city.toLowerCase()
    );

    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(
        fav => fav.city.toLowerCase() !== cityData.city.toLowerCase()
      ));
    } else {
      setFavorites([...favorites, cityData]);
    }
  };

  const handleSelectFavorite = (city: string): void => {
    handleSearch(city);
  };

  const handleRemoveFavorite = (index: number): void => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
  };

  const isCityFavorite = (cityName?: string): boolean => {
    return favorites.some(
      fav => fav.city.toLowerCase() === cityName?.toLowerCase()
    );
  };

  useEffect(() => {
    handleSearch('Paris');
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
            Météo Application
          </h1>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </header>

        <main className="app-main">
          <div className="content-grid">
            <div className="main-content">
              {error && (
                <div className="error-message">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  {error}
                </div>
              )}

              {loading && (
                <div className="loading-container">
                  <div className="loading-spinner large"></div>
                  <p>Chargement des données météo...</p>
                </div>
              )}

              {weather && !loading && (
                <>
                  <WeatherCard 
                    weather={weather}
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={isCityFavorite(weather.city)}
                  />
                  <ForecastCard forecast={forecast} />
                </>
              )}
            </div>

            <aside className="sidebar">
              <FavoritesList 
                favorites={favorites}
                onSelectFavorite={handleSelectFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
