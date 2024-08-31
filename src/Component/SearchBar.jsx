import { useState } from "react";

function SearchBar({ searchQuery, onSearchQuery }) {
  const [query, setQuery] = useState(searchQuery);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onSearchQuery(e.target.value);
  };
  return (
    <div className="search-bar">
      <h3>Search Items</h3>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleQueryChange(e)}
      />
    </div>
  );
}

export default SearchBar;
