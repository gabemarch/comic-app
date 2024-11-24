'use client';

import Searchbar from '@components/Searchbar/Searchbar';

export default function HomePage() {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div>
      <h1>Welcome to the Search Page</h1>
      <Searchbar onSearch={handleSearch} placeholder="Search comics..." />
    </div>
  );
}
