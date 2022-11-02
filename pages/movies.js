import { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import Head from "next/head";

import Layout from "../components/layout";
import MovieLists from "../components/movieLists";

export default function Movies({ movies, genres }) {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    Router.replace(`/movies?genre=${genre.join(",")}`);
  }, [genre]);

  function getGenres(e) {
    const isChecked = e.target.checked;

    if (isChecked) {
      setGenre([...genre, e.target.value]);
    } else {
      setGenre(genre.filter((item) => item !== e.target.value));
    }
  }

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Layout genres={genres} getGenres={getGenres} setGenre={setGenre}>
        <main className="px-9 flex flex-col gap-y-8 max-w-[1024px]">
          <MovieLists data={movies} full mediaPath="movie" />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { genre } = context.query;

  const options = {
    method: "GET",
    url: `${process.env.BASE_URL}/discover/movie`,
    params: { api_key: process.env.API_KEY, with_genres: genre },
    headers: { "Content-Type": "application/json;charset=utf-8" },
  };

  const movies = (await axios.request(options)).data;

  const genres = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/genre/movie/list`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  return {
    props: { movies, genres },
  };
}
