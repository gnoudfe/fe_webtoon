export const storyDataMock = {
  _id: "1",
  slug: "truyen-gi-do",
  followers_count: 10,
  updatedAt: "2025-01-14T07:36:22.211+00:00",
  rating: 4.5,
  thumbnail:
    "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
  title: "Truyện gì đó",
  views: 15000,
  latestChapter: {
    _id: "1",
    title: "Chương 1",
    time: "2025-01-14T07:36:22.211+00:00",
  },
};

export const mockData = {
  message: "success",
  status: "success",
  data: [
    storyDataMock,
    storyDataMock,
    storyDataMock,
    storyDataMock,
    storyDataMock,
    storyDataMock,
  ],
  pagingation: {
    currentPage: 1,
    totalPages: 1,
    totalStories: 1,
    limit: 10,
  },
};
