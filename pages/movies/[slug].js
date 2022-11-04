import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout";
import MovieLists from "../../components/movieLists";
import SeeAllScreen from "../../components/skeleton/seeAllScreen";
import { getRequest } from "../../lib/axios";

export default function Movies({ movies }) {
  const [loading, setLoading] = useState(true);
  const { slug } = useRouter().query;

  useEffect(() => {
    if (movies) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [movies]);

  if (loading) {
    return <SeeAllScreen />;
  }

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Layout>
        <main className="px-9 flex flex-col gap-y-8 max-w-[1024px]">
          <MovieLists
            data={movies}
            full
            mediaPath={
              slug === "upcoming" || slug === "popular" ? "movie" : null
            }
          />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;

    const url =
      slug !== "trending"
        ? `${process.env.BASE_URL}/movie/${slug}`
        : `${process.env.BASE_URL}/trending/movie/week`;

    const movies = (await getRequest(url)).data;

    return {
      props: { movies },
    };
  } catch (error) {
    console.log(error);
  }
}
