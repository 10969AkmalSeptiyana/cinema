import Image from "next/image";
import Link from "next/link";

import { StarIcon } from "@heroicons/react/24/solid";

export default function MovieCard({
  poster,
  rating,
  title,
  id,
  media,
  mediaPath,
}) {
  return (
    <div className="relative">
      <Image
        src={`${process.env.IMAGE_URL}${poster}`}
        alt={title}
        width={200}
        height={315}
        objectFit="cover"
        className="rounded-[20px]"
      />

      {rating && (
        <div className="text-[#E8E8E8] text-base font-medium flex items-center gap-x-1 py-1 px-2 bg-[#E8E8E8]/[0.1] backdrop-blur-sm rounded-tr-[20px] rounded-bl-[20px] absolute top-0 right-0">
          <StarIcon className="w-6 h-6 text-yellow-500" />
          {rating.toFixed(1)}
        </div>
      )}

      <Link href={`${media ? media : mediaPath}/details/${id}`}>
        <a className="absolute inset-0"></a>
      </Link>
    </div>
  );
}
