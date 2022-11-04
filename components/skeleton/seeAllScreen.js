import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SkeletonCard from "./skeletonCard";

export default function SeeAllScreen() {
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
          <div className="px-9 flex flex-col gap-y-8 max-w-[1024px]">
            <SkeletonCard length={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
