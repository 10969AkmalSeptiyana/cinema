export default function SkeletonCard({ length, withTitle }) {
  return (
    <div>
      {withTitle && (
        <div className="flex items-center justify-between mb-7">
          <div className="h-6 w-2/12 rounded-md bg-gray-400 animate-pulse"></div>
          <div className="h-6 w-20 rounded-md bg-gray-400 animate-pulse"></div>
        </div>
      )}

      <div className="flex flex-wrap gap-9">
        {Array(length)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[315px] bg-gray-400 rounded-[20px] animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
}
