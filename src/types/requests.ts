export type getConfigParams = {
  size?: number;
  page?: number;
  search?: string;
};

export enum UpdateKarmaType {
  LIKE = "UP",
  DISLIKE = "DOWN",
}
