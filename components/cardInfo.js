import Image from "next/image";

export default function CardInfo({ src, alt, title, description }) {
  return (
    <div className="flex items-center border border-[#e8e8e8]/[.3] py-2 px-3 rounded-[10px] mt-8">
      <div className="flex-auto">
        <h3 className="text-sm text-[#e8e8e8] font-normal max-w-[253px]">
          {title}
        </h3>
        <p className="text-xs text-[#e8e8e8]/[.6] mt-4">{description}</p>
      </div>
      <Image src={src} alt={alt} width={74} height={83} />
    </div>
  );
}
