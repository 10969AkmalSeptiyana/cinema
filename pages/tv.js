import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";

import Layout from "../components/layout";
import MovieLists from "../components/movieLists";

export default function Tv({ tv, genres }) {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    Router.replace(`/tv?genre=${genre.join(",")}`);
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
        <title>Tv</title>
      </Head>
      <Layout genres={genres} getGenres={getGenres}>
        <main className="px-9 flex flex-col gap-y-8 max-w-[1024px]">
          <MovieLists data={tv} full mediaPath="tv" />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { genre } = context.query;

  const options = {
    method: "GET",
    url: `${process.env.BASE_URL}/discover/tv`,
    params: { api_key: process.env.API_KEY, with_genres: genre },
    headers: { "Content-Type": "application/json;charset=utf-8" },
  };

  const tv = (await axios.request(options)).data;

  const genres = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/genre/movie/list`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  return {
    props: { tv, genres },
  };
}
