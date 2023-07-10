import React, { useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [movieList, setMovieList] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState("");
  const [sortMethod, setSortMethod] = React.useState("");
  const [genreList, setGenresList] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  const foundMovie = async () => {
    if (searchResult === "") return;
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        api_key: "255fffb51902ef1337a66916c2a62b4e",
        query: searchResult,
        language: "fr-FR",
      },
    };

    const response = await axios.request(options);
    setMovieList(response.data.results);
    console.log(response.data.results);
    resetCategory();
  };

  const genreMovie = async () => {
    const option = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: {
        api_key: "255fffb51902ef1337a66916c2a62b4e",
        language: "fr-FR",
      },
    };

    const response = await axios.request(option);
    setGenresList(response.data.genres);

    localStorage.setItem("genresList", JSON.stringify(response.data.genres));
  };

  const getPopularMovies = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: {
        api_key: "255fffb51902ef1337a66916c2a62b4e",
        language: "fr-FR",
        page: 1,
      },
    };

    const response = await axios.request(options);
    setMovieList(response.data.results);
  };

  useEffect(() => {
    genreMovie();
    getPopularMovies();
  }, []);

  return (
    <div>
      <Nav />
      <header>
        <div className="tri_btn">
          <button onClick={() => setSortMethod("top")}>Top</button>
          <button onClick={() => setSortMethod("flop")}>Flop</button>
        </div>
        <div className="container_tri">
          <div className="search_container">
            <input
              type="text"
              placeholder="Rechercher..."
              onChange={(e) => setSearchResult(e.target.value)}
              defaultValue={searchResult}
            />
          </div>
          <button onClick={() => foundMovie()}>Search</button>
        </div>
      </header>

      <section className="container_card_tri">
        <div className="container_tri_liste">
          <h1>Catégories</h1>
          <ul>
            {genreList.map((genre) => (
              <li key={genre.id} onClick={() => setSelectedCategory(genre.id)}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="container_card">
          {movieList
            .filter((movie) => {
              if (selectedCategory === null) {
                return true;
              } else {
                return movie.genre_ids.includes(selectedCategory);
              }
            })
            .sort((a, b) => {
              if (sortMethod === "flop") {
                return a.vote_average - b.vote_average;
              } else if (sortMethod === "top") {
                return b.vote_average - a.vote_average;
              }
            })
            .map((results, key) => (
              <Card movie={results} key={key} genreList={genreList} />
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
