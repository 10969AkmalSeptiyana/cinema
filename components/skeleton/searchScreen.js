import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SkeletonCard from "./skeletonCard";

export default function SearchScreen() {
  return (
    <div className="absolute inset-0 flex bg-[#0d0d0f]">
      <div className="w-[240px]"></div>

      <div className="flex-1 flex flex-col p-5 md:py-11 md:px-9">
        <div className="flex items-center relative">
          <input
            type="text"
            readOnly
            placeholder="Search for movies, TV shows..."
            className="text-[#E8E8E8] text-lg py-4 pl-20 pr-8 bg-[#1a171e] rounded-[30px] flex-1 outline-none"
          />
          <button type="submit" className="absolute left-8">
            <MagnifyingGlassIcon className="w-8 h-8 text-[#494a50]" />
          </button>
        </div>

        <div className="flex flex-col-reverse gap-y-8 mt-10 md:flex-row xl:mx-auto">
          <div className="max-w-[1200px]">
            <div className="w-28 h-4 bg-gray-400 animate-pulse rounded-full mb-7"></div>
            <SkeletonCard length={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
