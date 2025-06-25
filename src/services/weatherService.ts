import { WeatherData, ForecastDay, WeatherServiceResponse, ForecastServiceResponse } from '../types/weather';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('Clé API manquante. Veuillez configurer votre clé OpenWeatherMap dans le fichier .env');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Clé API invalide. Vérifiez votre clé OpenWeatherMap');
        } else if (response.status === 404) {
          throw new Error('Ville non trouvée');
        } else {
          throw new Error(`Erreur API: ${response.status}`);
        }
      }
      
      const data: WeatherServiceResponse = await response.json();
      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        feelsLike: Math.round(data.main.feels_like)
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la récupération des données météo');
    }
  },

  async getForecast(city: string): Promise<ForecastDay[]> {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('Clé API manquante. Veuillez configurer votre clé OpenWeatherMap dans le fichier .env');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Clé API invalide. Vérifiez votre clé OpenWeatherMap');
        } else if (response.status === 404) {
          throw new Error('Ville non trouvée');
        } else {
          throw new Error(`Erreur API: ${response.status}`);
        }
      }
      
      const data: ForecastServiceResponse = await response.json();
      
      const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      
      return dailyForecasts.map(item => ({
        date: new Date(item.dt * 1000).toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        }),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        description: item.weather[0].description,
        icon: item.weather[0].icon
      }));
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la récupération des prévisions');
    }
  },

  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
};
