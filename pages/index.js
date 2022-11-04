import Head from "next/head";
import { useState, useEffect } from "react";

import Jumbotron from "../components/jumbotron";
import Layout from "../components/layout";
import MovieLists from "../components/movieLists";
import { getRequest } from "../lib/axios";
import HomeScreen from "../components/skeleton/homeScreen";

export default function Home({ trending, upcoming, tv, popularMovie }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trending && upcoming && tv && popularMovie) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [trending, upcoming, tv, popularMovie]);

  if (loading) {
    return <HomeScreen />;
  }

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
  try {
    const trending = (await getRequest("/trending/movie/week")).data;
    const upcoming = (await getRequest("/movie/upcoming")).data;
    const tv = (await getRequest("trending/tv/day")).data;
    const popularMovie = (await getRequest("/movie/popular")).data;

    return {
      props: { trending, upcoming, tv, popularMovie },
    };
  } catch (error) {
    console.log(error);
  }
}
