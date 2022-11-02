import { useRef } from "react";

export default function Genres({ data, getGenres, setGenre }) {
  const ref = useRef([]);
  const { genres } = data;

  function unchecked() {
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
    setGenre([]);
  }

  return (
    <>
      <div className="flex items-baseline">
        <h3 className="flex-1 text-xl text-[#E8E8E8] font-medium">Genres</h3>
        <button
          className="text-sm text-[#666666] font-medium"
          onClick={unchecked}
        >
          Uncheck all
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {genres?.map((genre, index) => {
          return (
            <label key={genre.id}>
              <input
                type="checkbox"
                name="genre"
                id={genre.name}
                value={genre.id}
                className="sr-only peer"
                onChange={getGenres}
                ref={(element) => {
                  ref.current[index] = element;
                }}
              />
              <div className="text-base text-[#e8e8e8] py-1 px-4 border border-[#e8e8e8]/[.35] rounded-2xl peer-checked:border-[#EB1C24]">
                {genre.name}
              </div>
            </label>
          );
        })}
      </div>
    </>
  );
}
