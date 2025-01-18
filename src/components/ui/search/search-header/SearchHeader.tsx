"use client";
import React from "react";
import styles from "./styles.module.scss";
import { SearchIcon } from "lucide-react";
import SearchResults from "../search-results";
import { UseGetSearchStories } from "@/services/queries/useStory";
import useDebounceValue from "@/hooks/useDebounceValue";
const SearchHeader = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const debounceSearchValue = useDebounceValue(searchValue, 500);
  const { data: listStory, error } = UseGetSearchStories({
    query: debounceSearchValue.trim() === "" ? null : debounceSearchValue,
  });

  const listStoryData = React.useMemo(() => listStory?.data || [], [listStory]);
  const errorMessage = React.useMemo(() => error?.message, [error]);
  return (
    <div className={styles.search_header_container}>
      <div className={styles.search_header}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.search_header_input}
        />
        <SearchIcon color="#fff" width={22} height={22} />
      </div>
      {debounceSearchValue.trim() && (
        <SearchResults listStory={listStoryData} errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default SearchHeader;
