import { PaginationDataType } from "./story";

export interface CommentsData {
  _id: string;
  chapter_id: {
    _id: string;
    title: string;
    slug: string;
  };
  user_id: {
    _id: string;
    username: string;
    avatar: string;
  };
  story_id: {
    _id: string;
    slug: string;
    title: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  message: string;
  status: string;
  data: CommentsData[];
  pagination: PaginationDataType;
}
