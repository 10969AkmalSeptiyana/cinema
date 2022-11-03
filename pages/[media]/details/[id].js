import Head from "next/head";
import axios from "axios";
import Image from "next/image";

import Layout from "../../../components/layout";
import MovieLists from "../../../components/movieLists";
import MovieDetails from "../../../components/details";
import MovieDetailsAside from "../../../components/details/aside";
import { getRequest } from "../../../lib/axios";

export default function Details({
  details,
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
            src={`${process.env.IMAGE_URL}${details.backdrop_path}`}
            alt={details.title}
            layout="fill"
            objectFit="contain"
            priority
          />
        </figure>

        <div className="flex flex-wrap lg:flex-nowrap px-4 md:px-9 gap-5">
          <MovieDetails details={details} credits={credits} similar={similar} />

          <MovieDetailsAside
            details={details}
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
  try {
    const { media, id } = context.params;

    const details = (await getRequest(`/${media}/${id}`)).data;
    const similar = (await getRequest(`/movie/${id}/similar`)).data;
    const credits = (await getRequest(`/${media}/${id}/credits`)).data;
    const popular = (await getRequest("/movie/popular")).data;
    const topTv = (await getRequest("/tv/top_rated")).data;
    const upcoming = (await getRequest("/movie/upcoming")).data;

    return {
      props: { details, similar, credits, popular, topTv, upcoming },
    };
  } catch (error) {
    console.log(error);
  }
}
