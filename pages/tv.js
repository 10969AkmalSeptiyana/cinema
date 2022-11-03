import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";

import Layout from "../components/layout";
import MovieLists from "../components/movieLists";
import { getRequest } from "../lib/axios";

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
  try {
    const { genre } = context.query;

    const tv = (await getRequest("/discover/tv", { with_genres: genre })).data;
    const genres = (await getRequest("/genre/movie/list")).data;

    return {
      props: { tv, genres },
    };
  } catch (error) {
    console.log(error);
  }
}
