import axios from "axios";
import Head from "next/head";
import Router from "next/router";

import Layout from "../../components/layout";
import MovieLists from "../../components/movieLists";

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
  const { searchTerm } = context.params;

  const search = (
    await axios({
      method: "GET",
      url: `${process.env.BASE_URL}/search/multi`,
      params: { api_key: process.env.API_KEY, query: searchTerm },
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
  ).data;

  return {
    props: { search },
  };
}
