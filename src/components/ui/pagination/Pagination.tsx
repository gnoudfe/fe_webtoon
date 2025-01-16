import React from "react";
import styles from "./styles.module.scss";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number; // Trang hiện tại
  totalPages: number; // Tổng số trang
  onPageChange: (page: number) => void; // Hàm xử lý thay đổi trang
}
const initArray = [1, 2, 3];
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const displayPages = React.useMemo(() => {
    const result: (number | "...")[] = [];

    // Nếu tổng số trang nhỏ hơn hoặc bằng 6, hiển thị tất cả các trang
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
      return result;
    }

    // Logic hiển thị khi tổng số trang lớn hơn 6
    if (currentPage < 3) {
      result.push(...initArray, "...", totalPages);
    } else if (currentPage === 3) {
      result.push(
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    } else if (currentPage > totalPages - 3) {
      result.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else if (currentPage === totalPages - 3) {
      result.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      result.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return result;
  }, [currentPage, totalPages]);
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination_button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft color="#000" width={18} height={18} />
      </button>

      {displayPages.map((page, index) =>
        page === "..." ? (
          <span key={index} className={styles.pagination_ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`${styles.pagination_page} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.pagination_button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRight color="#000" width={18} height={18} />
      </button>
    </div>
  );
};

export default Pagination;
