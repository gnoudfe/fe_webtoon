export interface TagData {
    _id: string;
    slug: string;
    name: string;
  }
  
  export interface TagDataResponse {
    message: string;
    status: string;
    data: TagData[];
  }
  