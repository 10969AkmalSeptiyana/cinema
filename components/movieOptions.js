import { ListBulletIcon } from "@heroicons/react/24/solid";

export default function MovieOptions({ data, description }) {
  const { results } = data;

  return (
    <div className="relative w-[360px] h-[229px] flex justify-center overflow-hidden rounded-[10px] mt-7">
      {results?.slice(0, 3)?.map((movie) => {
        return (
          <img
            key={movie.id}
            src={`${process.env.IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full"
          />
        );
      })}
      <button className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-[#121212]/[.5] backdrop-blur-sm rounded-[10px] flex items-center gap-x-3">
        <ListBulletIcon className="w-6 h-6 text-[#e8e8e8]" />
        <h3 className="text-sm text-[#e8e8e8] font-medium">{description}</h3>
      </button>
    </div>
  );
}
