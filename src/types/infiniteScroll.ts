export interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean | undefined;
  children: React.ReactNode;
}
