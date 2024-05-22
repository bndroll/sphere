export type CategoryT = {
  id: string;
  title: string;
  createDate: Date;
  tags: CategoryTag[];
};

export type CategoryTag = {
  id: string;
  title: string;
  createDate: Date;
};
