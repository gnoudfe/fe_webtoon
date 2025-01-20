export interface NofiticationsDataTypeResponse {
  status: string;
  message: string;
  data: NofiticationsDataType[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface NofiticationsDataType {
  _id: string;
  thumbnail: string;
  isRead: boolean;
  message: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}
