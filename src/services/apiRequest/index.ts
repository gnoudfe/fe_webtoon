/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_API_ENDPOINT } from "@/constant/endPoints";
import { apiBaseServiceInstance } from "../api";

class AuthWebtoonApiRequest {
  public Login({
    body,
  }: {
    body: { username: string; password: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN,
      config: {
        method: "POST",
        body,
      },
    });
  }

  public Register({
    body,
  }: {
    body: { username: string; password: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.REGISTER,
      config: {
        method: "POST",
        body,
      },
    });
  }

  public Logout(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGOUT,
      config: {
        method: "POST",
      },
    });
  }

  public VerifyUser(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.VERITY,
      config: {
        method: "GET",
      },
    });
  }
  public ChangePassword({
    body,
  }: {
    body: { oldPassword: string; newPassword: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.CHANGE_PASSWORD,
      config: {
        method: "POST",
        body,
      },
    });
  }

  public ChangeAvatar({ body }: { body: FormData }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.CHANGE_AVATAR,
      config: {
        method: "POST",
        body,
      },
    });
  }
}

class StoryWebtoonApiRequest {
  public GetAllStories({
    limit = 15,
    page = 1,
  }: {
    limit?: number | null;
    page?: number | null;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_ALL_STORIES(limit, page),
      config: {
        method: "GET",
      },
    });
  }

  public GetTopStories({
    limit = 15,
    page = 1,
  }: {
    limit?: number | null;
    page?: number | null;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_TOP_STORIES(limit, page),
      config: {
        method: "GET",
      },
    });
  }

  public GetLatestStories({
    limit = 15,
    page = 1,
  }: {
    limit?: number | null;
    page?: number | null;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_LATEST_STORIES(limit, page),
      config: {
        method: "GET",
      },
    });
  }
  public GetHighlightStories({
    limit = 10,
    page = 1,
  }: {
    limit?: number | null;
    page?: number | null;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_HIGHLIGHT_STORIES(limit, page),
      config: {
        method: "GET",
      },
    });
  }

  public GetListStories({
    type,
    limit = 15,
    page = 1,
  }: {
    type: "latest" | "top" | "highlight" | "all";
    limit?: number | null;
    page: number | null;
  }): Promise<any> {
    const endpoint =
      type === "latest"
        ? APP_API_ENDPOINT.STORY.GET_LATEST_STORIES(limit, page)
        : type === "top"
        ? APP_API_ENDPOINT.STORY.GET_TOP_STORIES(limit, page)
        : type === "highlight"
        ? APP_API_ENDPOINT.STORY.GET_HIGHLIGHT_STORIES(limit, page)
        : APP_API_ENDPOINT.STORY.GET_ALL_STORIES(limit, page);

    return apiBaseServiceInstance.Http({
      path: endpoint,
      config: {
        method: "GET",
      },
    });
  }

  public GetStoriesByType({
    slug,
    type,
    limit = 15,
    page = 1,
  }: {
    slug: string;
    type: "tag" | "category";
    limit?: number | null;
    page?: number | null;
  }): Promise<any> {
    const endpoint =
      type === "tag"
        ? APP_API_ENDPOINT.STORY.GET_STORY_BY_TAG(slug, page, limit)
        : APP_API_ENDPOINT.STORY.GET_STORY_BY_CATEGORY(slug, page, limit);

    return apiBaseServiceInstance.Http({
      path: endpoint,
      config: {
        method: "GET",
      },
    });
  }
  public GetDetailStories({ slug }: { slug: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_STORY_DETAIL(slug),
      config: {
        method: "GET",
      },
    });
  }

  public GetChapterDetail({
    slug,
    slugChapter,
  }: {
    slug: string;
    slugChapter: string;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_CHAPTER_DETAIL(slug, slugChapter),
      config: {
        method: "GET",
      },
    });
  }

  public GetCommentsStory({
    slug,
    page = 1,
    limit = 10,
  }: {
    slug: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_STORY_COMMENTS(slug, page, limit),
      config: {
        method: "GET",
      },
    });
  }
  public GetChapterComments({
    slug,
    slugChapter,
    page = 1,
    limit = 8,
  }: {
    slug: string;
    slugChapter: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_CHAPTER_COMMENTS(
        slug,
        slugChapter,
        page,
        limit
      ),
      config: {
        method: "GET",
      },
    });
  }

  public AddComment({
    slug,
    body,
  }: {
    slug: string;
    body: { chapter_id: string; content: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.ADD_COMMENT(slug),
      config: {
        method: "POST",
        body,
      },
    });
  }

  public DeleteComment({ commentId }: { commentId: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.DELETE_COMMENT(commentId),
      config: {
        method: "DELETE",
      },
    });
  }

  public EditComment({
    commentId,
    body,
  }: {
    commentId: string;
    body: { content: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.EDIT_COMMENT(commentId),
      config: {
        method: "PUT",
        body,
      },
    });
  }

  public FollowStory({ slug }: { slug: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.FOLLOW_STORY(slug),
      config: {
        method: "POST",
      },
    });
  }

  public UnFollowStory({ slug }: { slug: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.UNFOLLOW_STORY(slug),
      config: {
        method: "DELETE",
      },
    });
  }

  public GetFollowingStories({
    page = 1,
    limit = 15,
  }: {
    page?: number;
    limit?: number;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_FOLLOWING_STORIES(page, limit),
      config: {
        method: "GET",
      },
    });
  }

  public AddHistoryStory({ slug }: { slug: string }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.ADD_STORY_HISTORY(slug),
      config: {
        method: "POST",
      },
    });
  }

  public GetHistoryStories({
    page = 1,
    limit = 15,
  }: {
    page?: number;
    limit?: number;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.GET_STORY_HISTORY(page, limit),
      config: {
        method: "GET",
      },
    });
  }

  public GetSearchStories({ query }: { query: string | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.STORY.SEARCH_STORY(query),
      config: {
        method: "GET",
      },
    });
  }
}

const AuthWebtoonApi = new AuthWebtoonApiRequest();
const StoryWebtoonApi = new StoryWebtoonApiRequest();

export { AuthWebtoonApi, StoryWebtoonApi };
