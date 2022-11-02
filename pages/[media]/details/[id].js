import Head from "next/head";
import axios from "axios";
import Image from "next/image";

import Layout from "../../../components/layout";
import MovieLists from "../../../components/movieLists";
import MovieDetails from "../../../components/details";
import MovieDetailsAside from "../../../components/details/aside";

export default function Details({
  movieDetails,
  similar,
  credits,
  popular,
  topTv,
  upcoming,
}) {
  return (
    <>
      <Head>
        <title>Details</title>
      </Head>
      <Layout>
        <figure className="relative w-full h-[300px] md:w-[500px] md:h-[500px] left-2/4 right-2/4 -translate-x-2/4">
          <Image
            src={`${process.env.IMAGE_URL}${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            layout="fill"
            objectFit="contain"
            priority
          />
        </figure>

        <div className="flex flex-wrap lg:flex-nowrap px-4 md:px-9 gap-5">
          <MovieDetails
            movieDetails={movieDetails}
            credits={credits}
            similar={similar}
          />

          <MovieDetailsAside
            movieDetails={movieDetails}
            popular={popular}
            topTv={topTv}
            upcoming={upcoming}
          />

          <div className="md:hidden">
            <MovieLists title="Similar Movies" data={similar} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { media, id } = context.params;

  const movieDetails = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/${media}/${id}`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const similar = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/movie/${id}/similar`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const credits = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/${media}/${id}/credits`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const popular = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/movie/popular`,
      params: { api_key: process.env.API_KEY },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  const topTv = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/tv/top_rated`,
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

  return {
    props: { movieDetails, similar, credits, popular, topTv, upcoming },
  };
}
