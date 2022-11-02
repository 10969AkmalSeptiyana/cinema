import Head from "next/head";
import axios from "axios";

import Layout from "../../components/layout";
import MovieLists from "../../components/movieLists";

export default function Movies({ movies }) {
  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Layout>
        <main className="px-9 flex flex-col gap-y-8 max-w-[1024px]">
          <MovieLists data={movies} full />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const options = {
    method: "GET",
    url:
      slug !== "trending"
        ? `${process.env.BASE_URL}/movie/${slug}`
        : `${process.env.BASE_URL}/trending/movie/week`,
    params: { api_key: process.env.API_KEY },
    headers: { "Content-Type": "application/json;charset=utf-8" },
  };

  const movies = (await axios.request(options)).data;

  return {
    props: { movies },
  };
}
