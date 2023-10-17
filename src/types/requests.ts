export enum OrderByRequest {
  KARMA = "KARMA",
  DOWNLOADS = "DOWNLOADS",
  NEWEST = "NEWEST"
}

export type getConfigParams = {
  size?: number;
  page?: number;
  search?: string;
  orderby?: OrderByRequest;
};

export enum UpdateKarmaType {
  LIKE = "UP",
  DISLIKE = "DOWN",
}
