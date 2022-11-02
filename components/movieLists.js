import Link from "next/link";

import MovieCard from "../components/movieCard";

export default function MovieLists({ title, data, full, mediaPath, href }) {
  const { results } = data;

  return (
    <section>
      <div className="flex items-baseline">
        {title && (
          <h2 className="flex-auto text-white text-2xl font-semibold mb-7">
            {title}
          </h2>
        )}
        {href && (
          <Link href={href}>
            <a className="text-base text-[#666666] font-semibold">See all</a>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-9 justify-center md:justify-between">
        {full
          ? results?.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                  title={movie.title}
                  id={movie.id}
                  media={movie.media_type}
                  mediaPath={mediaPath}
                />
              );
            })
          : results.slice(0, 4)?.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                  title={movie.title}
                  id={movie.id}
                  media={movie.media_type}
                  mediaPath={mediaPath}
                />
              );
            })}
      </div>
    </section>
  );
}
