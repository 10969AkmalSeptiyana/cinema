import {
  StarIcon,
  ListBulletIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import MovieOptions from "../../components/movieOptions";
import CardInfo from "../../components/cardInfo";

export default function MovieDetailsAside({
  movieDetails,
  popular,
  topTv,
  upcoming,
}) {
  return (
    <aside>
      <div className="flex items-center justify-center md:justify-start gap-x-5">
        <HeartIcon className="w-7 h-7 text-[#e8e8e8]/[.35]" />
        <ShareIcon className="w-7 h-7 text-[#e8e8e8]/[.35]" />
        <BookmarkIcon className="w-7 h-7 text-[#e8e8e8]/[.35]" />
        <div className="flex items-center gap-x-2">
          <StarIcon className="w-7 h-7 text-yellow-500" />
          <p className="text-xl text-[#666666] font-medium">
            <span className="text-2xl text-[#e8e8e8]">
              {movieDetails.vote_average.toFixed(1)}
            </span>{" "}
            | {movieDetails.vote_count}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 mt-6">
        <button className="flex items-center gap-x-3 py-3 w-full justify-center rounded-[10px] bg-[#3DD2CC]/[.8]">
          <TicketIcon className="w-6 h-6 text-[#e8e8e8]" />
          <h3 className="text-xl text-[#e8e8e8] font-medium">See Showtimes</h3>
        </button>
        <button className="flex items-center gap-x-3 py-3 w-full justify-center rounded-[10px] bg-[#1a171e]">
          <ListBulletIcon className="w-6 h-6 text-[#e8e8e8]" />
          <h3 className="text-xl text-[#e8e8e8] font-medium">
            More watch options
          </h3>
        </button>
      </div>

      <MovieOptions
        data={popular}
        description="The Best Movies and Shows in September"
      />

      <CardInfo
        src="/images/image-1.png"
        alt="joker image"
        title="The Billion-Dollar Film Club: 50 Movies to Reach $1 Billion Worldwide"
        description="updated 1 week ago • 50 images"
      />
      <CardInfo
        src="/images/image-2.png"
        alt="pilot image"
        title="2022 Summer Movie Guide"
        description="updated 1 month ago • 52 images"
      />

      <MovieOptions data={topTv} description="Top 50 TV Dramas" />
      <MovieOptions
        data={upcoming}
        description="New & Upcoming Sequels, Prequels"
      />

      <CardInfo
        src="/images/image-3.png"
        alt="people image"
        title="Upcoming Action and Adventure Movies and TV"
        description="updated 3 months ago • 26 images"
      />
    </aside>
  );
}
