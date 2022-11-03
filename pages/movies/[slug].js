import Head from "next/head";
import axios from "axios";

import Layout from "../../components/layout";
import MovieLists from "../../components/movieLists";
import { getRequest } from "../../lib/axios";

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
