import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "../../components/layout";
import MovieLists from "../../components/movieLists";
import SearchScreen from "../../components/skeleton/searchScreen";
import { getRequest } from "../../lib/axios";

export default function Search({ search }) {
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useRouter().query;

  useEffect(() => {
    if (search) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [search]);

  if (loading) {
    return <SearchScreen />;
  }

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
