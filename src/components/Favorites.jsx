import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

function Favorites({ favorites, watchlist, toggleFavorite, toggleWatchlist }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>My Favorites</h1>
        </div>
        <div className="empty-state">
          <h2>❤️ No favorites yet</h2>
          <p>Start adding movies you love!</p>
          <Link to="/" className="browse-btn">Browse Movies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>My Favorites ({favorites.length})</h1>
      </div>
      
      <div className="favorites-grid">
        {favorites.map(movie => {
          const isInWatchlist = watchlist.some(m => m.id === movie.id);
          
          return (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Image'
                  }
                  alt={movie.title}
                  className="movie-poster"
                />
              </Link>
              
              <div className="movie-info">
                <Link to={`/movie/${movie.id}`} className="movie-title">
                  <h3>{movie.title}</h3>
                </Link>
                <div className="movie-meta">
                  <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                  <span className="release-year">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
                
                <div className="action-buttons">
                  <button
                    onClick={() => toggleFavorite(movie)}
                    className="icon-btn favorite"
                    title="Remove from Favorites"
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => toggleWatchlist(movie)}
                    className={`icon-btn ${isInWatchlist ? 'watchlist' : ''}`}
                    title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    {isInWatchlist ? '✓' : '+'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;