import axios from "axios";
import Head from "next/head";

import Jumbotron from "../components/jumbotron";
import Layout from "../components/layout";
import MovieLists from "../components/movieLists";

export default function Home({ trending, upcoming, tv, popularMovie }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <main className="px-9 flex flex-col gap-y-8">
          <Jumbotron />
          <MovieLists
            title="Trending"
            data={trending}
            href="/movies/trending"
          />
          <MovieLists
            title="Upcoming"
            data={upcoming}
            mediaPath="movie"
            href="/movies/upcoming"
          />
          <MovieLists title="TV Series" data={tv} href="/tv" />
          <MovieLists
            title={`Popular movies on ${new Date().toLocaleString("default", {
              month: "long",
            })}`}
            data={popularMovie}
            href="/movies/popular"
          />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const options = {
    method: "GET",
    url: `${process.env.BASE_URL}/trending/movie/week`,
    params: { api_key: process.env.API_KEY },
    headers: { "Content-Type": "application/json;charset=utf-8" },
  };

  const trending = (await axios.request(options)).data;

  const genres = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/genre/movie/list`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const upcoming = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/movie/upcoming`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const tv = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/trending/tv/day`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const popularMovie = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/movie/popular`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  return {
    props: { trending, genres, upcoming, tv, popularMovie },
  };
}
