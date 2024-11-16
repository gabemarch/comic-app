'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Searchbar.module.css';
import SearchIcon from '@icons/search-alt-2.svg';


interface SearchbarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ placeholder = "Search...", onSearch }) => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('searchQuery')?.toString().trim() || '';

    if (onSearch && query) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchbar}>
      <input
        type="text"
        name="searchQuery"
        placeholder={placeholder}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <Image
          src={SearchIcon}
          alt="Search Icon"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
};

export default Searchbar;
