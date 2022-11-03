import axios from "axios";
import Head from "next/head";
import Router from "next/router";

import Layout from "../../components/layout";
import MovieLists from "../../components/movieLists";
import { getRequest } from "../../lib/axios";

export default function Search({ search }) {
  const { searchTerm } = Router.query;

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <Layout>
        <main className="max-w-[1200px]">
          <MovieLists data={search} title={searchTerm} full />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { searchTerm } = context.params;

    const search = (await getRequest("/search/multi", { query: searchTerm }))
      .data;

    return {
      props: { search },
    };
  } catch (error) {
    console.log(error);
  }
}
