import React from "react";
import styles from "./styles.module.scss";
import { SearchIcon } from "lucide-react";
const SearchHeader = () => {
  return (
    <div className={styles.search_header}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.search_header_input}
      />
      <SearchIcon color="#fff" width={22} height={22} />
    </div>
  );
};

export default SearchHeader;
