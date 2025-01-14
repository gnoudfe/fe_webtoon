export interface StoryData {
  _id: string;
  slug: string;
  followers_count: number;
  postTime: string;
  rating: number;
  tags?: {
    slug: string;
    name: string;
  }[];
  updatedAt: string;
  thumbnail: string;
  title: string;
  views: number;
  latestChapter: {
    time: string;
    title: string;
    _id: string;
  };
}

export interface PaginationDataType {
  currentPage: number;
  totalPages: number;
  totalStories: 1;
  limit: number;
}
