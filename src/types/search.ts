import { StoryDetailData } from "./story";

export interface SearchResponseType {
  status: string;
  message: string;
  success: boolean;
  data: StoryDetailData[];
}
