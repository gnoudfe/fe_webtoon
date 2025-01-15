import { ChapterType } from "./chapter";
import { CommentsData } from "./comment";
import { TagData } from "./tag";
export interface StoryDetailData {
  _id: string;
  slug: string;
  author?: {
    _id: string;
    name: string;
  };
  category?: {
    slug: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  description: string;
  followers_count?: number;
  rating?: number;
  status?: string;
  tags: TagData[];
  thumbnail: string;
  title: string;
  views?: number;
  chapters: ChapterType[];
  comments: CommentsData[];
  totalComments: number;
  latestChapter?: {
    time: string;
    title: string;
    _id: string;
  };
}
export interface StoryResponseData {
  message: string;
  status: string;
  data: StoryDetailData[];
  pagination: PaginationDataType;
}

export interface PaginationDataType {
  currentPage: number;
  totalPages: number;
  totalStories: number;
  totalComments: number;
  limit: number;
}

export interface StoryDetailResponseData {
  status: string;
  message: string;
  data: StoryDetailData;
}
