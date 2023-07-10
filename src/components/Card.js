import React from "react";
import { FaHeart } from "react-icons/fa";
import errorImg from "./ORFI0N0.jpg";

function Card({ movie, genreList }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : errorImg;

  const noteMovie = Math.round(movie.vote_average * 10) / 10;

  const saveMovieToLocalStorage = () => {
    localStorage.setItem("movieLike", JSON.stringify(movie));
  };

  return (
    <div className="card_decoration">
      <div className="img_btn">
        <button onClick={saveMovieToLocalStorage}>
          <FaHeart size={25} />
        </button>
        <img src={posterUrl} alt={`Affiche de ${movie.title}`} />
      </div>
      <div className="section_text">
        <div className="title_section">
          <h1>{movie.title}</h1>
          <p>Sortie le {movie.release_date}</p>
          <p>Note : {noteMovie}/10</p>
          <p>
            Genre :{" "}
            {movie.genre_ids.map((id, index) => {
              const genre = genreList.find((genre) => genre.id === id);
              if (genre) {
                if (index === movie.genre_ids.length - 1) {
                  return <span key={id}>{genre.name}</span>;
                } else {
                  return <span key={id}>{genre.name}, </span>;
                }
              }
              return null;
            })}
          </p>
        </div>
          <p className="resume_limite">{movie.overview}</p>
        
      </div>
    </div>
  );
}

export default Card;
