import { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import Head from "next/head";

import Layout from "../components/layout";
import MovieLists from "../components/movieLists";
import { getRequest } from "../lib/axios";

export default function Movies({ movies, genres, test }) {
  const [genre, setGenre] = useState([]);
  console.log(test);

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
  try {
    const { genre } = context.query;

    const movies = (await getRequest("/discover/movie", { with_genres: genre }))
      .data;
    const genres = (await getRequest("/genre/movie/list")).data;

    return {
      props: { movies, genres },
    };
  } catch (error) {
    console.log(error);
  }
}
