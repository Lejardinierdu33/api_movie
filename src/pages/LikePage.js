import React from 'react'
import Nav from '../components/Nav'
import Card from '../components/Card';

function LikePage() {
  const movieLike = JSON.parse(localStorage.getItem("movieLike"));
  const genreList = JSON.parse(localStorage.getItem("genresList"));
  return (
    <div>
        <Nav />
        <div className="coup_de_coeur">
        {movieLike && <Card movie={movieLike} genreList={genreList} />}
        </div>
    </div>
  )
}

export default LikePage