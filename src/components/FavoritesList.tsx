import React from 'react';
import { FavoriteCity } from '../types/weather';

interface FavoritesListProps {
  favorites: FavoriteCity[];
  onSelectFavorite: (city: string) => void;
  onRemoveFavorite: (index: number) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h3 className="favorites-title">Favoris</h3>
        <p className="no-favorites">Aucune ville favorite</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h3 className="favorites-title">Favoris</h3>
      <div className="favorites-items">
        {favorites.map((favorite, index) => (
          <div key={index} className="favorite-item">
            <button 
              className="favorite-city-btn"
              onClick={() => onSelectFavorite(favorite.city)}
              title={`Voir la météo de ${favorite.city}`}
            >
              <span className="city-name">{favorite.city}</span>
              <span className="country-code">{favorite.country}</span>
            </button>
            <button 
              className="remove-favorite-btn"
              onClick={() => onRemoveFavorite(index)}
              title="Retirer des favoris"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
