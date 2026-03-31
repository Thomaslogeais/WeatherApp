import { WeatherData, ForecastDay } from '../types/weather';
import { GeminiRequest, GeminiResponse } from '../types/chat';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const aiService = {
  generateSystemPrompt(weather: WeatherData | null, forecast: ForecastDay[]): string {
    if (!weather) {
      return `Tu es un assistant météo intelligent et amical. Tu ne peux répondre QU'AUX QUESTIONS SUR LA MÉTÉO.
Si on te pose une question qui n'est pas liée à la météo, réponds poliment que tu es spécialisé uniquement dans les discussions météorologiques.
Actuellement, aucune ville n'est sélectionnée. Demande à l'utilisateur de rechercher une ville d'abord.`;
    }

    return `Tu es un assistant météo intelligent et amical. Tu ne peux répondre QU'AUX QUESTIONS SUR LA MÉTÉO de ${weather.city}, ${weather.country}.

RÈGLES IMPORTANTES:
- Tu DOIS refuser poliment de répondre à toute question qui n'est pas liée à la météo
- Tu ne parles QUE de météo, climat, température, conditions atmosphériques
- Reste concis et naturel dans tes réponses (2-3 phrases maximum)
- Utilise des émojis météo pour rendre la conversation plus agréable ☀️🌧️❄️🌤️⛈️

DONNÉES MÉTÉO ACTUELLES POUR ${weather.city}:
- Température: ${weather.temperature}°C (ressentie: ${weather.feelsLike}°C)
- Conditions: ${weather.description}
- Humidité: ${weather.humidity}%
- Vent: ${weather.windSpeed} m/s
- Pression: ${weather.pressure} hPa

PRÉVISIONS SUR ${forecast.length} JOURS:
${forecast.map((day, index) =>
  `Jour ${index + 1} (${day.date}): ${day.tempMin}°C à ${day.tempMax}°C, ${day.description}`
).join('\n')}

Utilise uniquement ces informations pour répondre aux questions météo de l'utilisateur sur ${weather.city}.`;
  },

  async sendMessage(
    userMessage: string,
    weather: WeatherData | null,
    forecast: ForecastDay[]
  ): Promise<string> {
    if (!API_KEY) {
      throw new Error("Clé API Gemini manquante. Veuillez configurer REACT_APP_GEMINI_API_KEY dans le fichier .env");
    }

    const systemPrompt = this.generateSystemPrompt(weather, forecast);

    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nQuestion utilisateur : ${userMessage}`
            }
          ]
        }
      ]
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API Gemini: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiResponse) {
      throw new Error("Aucune réponse générée par l'IA");
    }

    return aiResponse.trim();
  }
};