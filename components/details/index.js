import Image from "next/image";
import { useRouter } from "next/router";

import MovieLists from "../../components/movieLists";
import { convertToHour } from "../../lib/convert";

export default function MovieDetails({ details, credits, similar }) {
  const { media } = useRouter().query;
  const { cast, crew } = credits;
  const { hours, minutes } = convertToHour(details.runtime);

  return (
    <main>
      <article className="flex-1">
        <ul className="flex flex-wrap items-center gap-y-4">
          <li className="text-2xl text-[#e8e8e8] font-medium after:content-['•'] after:text-[#e8e8e8] after:mx-2 md:after:mx-4">
            {media === "movie" ? details.title : details.name}
          </li>
          <li className="text-2xl text-[#e8e8e8] font-medium after:content-['•'] after:text-[#e8e8e8] after:mx-2 md:after:mx-4">
            {media === "movie" ? details.release_date : details.first_air_date}
          </li>
          <li className="text-2xl text-[#e8e8e8] font-medium mr-4">
            {media === "movie"
              ? `${hours}h ${minutes}m`
              : `${details.number_of_episodes} episode${
                  details.number_of_episodes > 1 && "s"
                }`}
          </li>
          <li>
            <div className="flex items-center gap-x-3">
              {details.genres.map((genre) => {
                return (
                  <button
                    key={genre.id}
                    className="text-base text-[#e8e8e8] py-1 px-4 border border-[#e8e8e8]/[.35] rounded-2xl"
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </li>
        </ul>

        <p className="max-w-[774px] text-xl text-[#e8e8e8] font-medium my-6">
          {details.overview}
        </p>

        <ul className="mb-9">
          <li className="text-xl text-[#e8e8e8] font-normal border-y border-[#e8e8e8]/[.25] py-4">
            Director :{" "}
            {crew.find((item) => item.job === "Director")
              ? crew
                  ?.filter((item) => item.job === "Director")
                  ?.map((item) => {
                    return (
                      <span key={item.id} className="text-[#EB1C24]">
                        {item.name}
                      </span>
                    );
                  })
              : "Empty"}
          </li>
          <li className="text-xl text-[#e8e8e8] font-normal border-y border-[#e8e8e8]/[.25] py-4">
            Writers :{" "}
            {crew.find((item) => item.job === "Writing")
              ? crew
                  ?.filter((item) => item.department === "Writing")
                  ?.map((item) => {
                    return (
                      <span key={item.id} className="text-[#EB1C24]">
                        {item.name},{" "}
                      </span>
                    );
                  })
              : "Empty"}
          </li>
          <li className="text-xl text-[#e8e8e8] font-normal border-y border-[#e8e8e8]/[.25] py-4">
            Stars :{" "}
            {crew.length > 0
              ? cast?.slice(0, 3)?.map((item) => {
                  return (
                    <span key={item.id} className="text-[#EB1C24]">
                      {item.name},{" "}
                    </span>
                  );
                })
              : "Empty"}
          </li>
        </ul>

        <div className="mb-9">
          <h3 className="text-2xl text-[#e8e8e8] font-medium mb-8">Top Cast</h3>
          <div className="flex flex-wrap justify-around md:justify-between gap-6">
            {cast?.slice(0, 4)?.map((item) => {
              return (
                <div key={item.id} className="flex flex-col items-center">
                  <Image
                    src={`${process.env.IMAGE_URL}${item.profile_path}`}
                    alt={item.name}
                    width={140}
                    height={140}
                    objectFit="cover"
                    className="rounded-full"
                  />
                  <h4 className="text-base text-[#e8e8e8] font-medium mt-4">
                    {item.name}
                  </h4>
                  <p className="text-base text-[#e8e8e8]/[.5] font-medium">
                    {item.character}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <MovieLists
            title={`Similar ${media === "movie" ? "Movies" : "TV"}`}
            data={similar}
          />
        </div>
      </article>
    </main>
  );
}
