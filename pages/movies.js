import Head from "next/head";
import { useEffect, useState } from "react";

import Layout from "../components/layout";
import MovieLists from "../components/movieLists";
import MoviesScreen from "../components/skeleton/moviesScreen";
import { getRequest } from "../lib/axios";

export default function Movies({ genres }) {
  const [genre, setGenre] = useState([]);
  const [withGenre, setWithGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (genres) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    (async () => {
      const data = (
        await getRequest("/discover/movie", { with_genres: genre.join(",") })
      ).data;

      setWithGenre(data);
    })();
  }, [genre]);

  function getGenres(e) {
    const isChecked = e.target.checked;

    if (isChecked) {
      setGenre([...genre, e.target.value]);
    } else {
      setGenre(genre.filter((item) => item !== e.target.value));
    }
  }

  if (loading) {
    return <MoviesScreen />;
  }

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Layout genres={genres} getGenres={getGenres} setGenre={setGenre}>
        <main className="px-9 flex flex-col gap-y-8 max-w-[1024px]">
          <MovieLists data={withGenre} full mediaPath="movie" />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const genres = (await getRequest("/genre/movie/list")).data;

    return {
      props: { genres },
    };
  } catch (error) {
    console.log(error);
  }
}
