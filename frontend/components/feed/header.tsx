import HeaderActions from "./header-actions";
import Logo from "./logo";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <SearchBar />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
