import Image from "next/image";

import { PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Jumbotron() {
  return (
    <div className="relative hidden md:block md:h-[300px] md:w-[909px] mb-8">
      <Image
        src="/images/jumbotron.png"
        alt="moon fall"
        layout="fill"
        priority
        objectFit="contain"
      />
      <div className="flex flex-col gap-y-5 md:flex-row md:items-center md:gap-x-7 absolute right-8 bottom-5">
        <button className="text-[#E8E8E8] text-xl font-semibold flex items-center gap-x-3 px-6 py-3 bg-[#E8E8E8]/[0.1] backdrop-blur-sm rounded-2xl">
          <PlayIcon className="w-6 h-6" />
          Play
        </button>
        <button className="text-[#E8E8E8] text-xl font-semibold flex items-center gap-x-3 px-6 py-3 bg-[#E8E8E8]/[0.1] backdrop-blur-sm rounded-2xl">
          <InformationCircleIcon className="w-6 h-6" />
          More info
        </button>
      </div>
    </div>
  );
}
