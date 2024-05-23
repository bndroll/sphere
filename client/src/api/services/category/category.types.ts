import { ReactNode } from "react";

export type CategoryT = {
  id: string;
  title: string;
  createDate: Date;
  tags: CategoryTag[];
  desc?: string;
  icon?: ReactNode;
};

export type CategoryTag = {
  id: string;
  title: string;
  createDate: Date;
};
