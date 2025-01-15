export interface ChapterType {
  _id: string;
  slug: string;
  title: string;
  createdAt: string;
  time: string;
  updatedAt: string;
}

export interface ChapterResponseData {
  status: string;
  message: string;
  data: {
    chapters: ChapterType[];
    currentChapter: {
      _id: string;
      slug: string;
      story_id: {
        _id: string;
        slug: string;
        title: string;
      };
      creadtedAt: string;
      updatedAt: string;
      images: string[];
      title: string;
      time: string;
    };
  };
}
