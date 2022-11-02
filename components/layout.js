import Genres from "./genres";
import SearchBar from "./searchBar";
import Sidebar from "./sidebar";

export default function Layout({ children, genres, getGenres, setGenre }) {
  return (
    <div className="relative flex">
      <Sidebar />

      <div className="flex-1 flex flex-col pb-8">
        <SearchBar />

        <div className="flex flex-col-reverse gap-y-8 md:flex-row xl:mx-auto">
          <div>{children}</div>
          {genres && (
            <div className="flex-1 pr-5">
              <aside className="mx-auto md:sticky top-8 max-w-[350px]">
                <Genres
                  data={genres}
                  getGenres={getGenres}
                  setGenre={setGenre}
                />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
