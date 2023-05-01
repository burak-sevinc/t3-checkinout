import type { Checklist, CompletedChecklist } from "@prisma/client";

export type SelectComponentProps = {
  value: string;
  handleSelect: (value: string) => void;
  data: ISelectDataItem[];
};

export interface ICompletedChecklist extends CompletedChecklist {
  Checklist: Checklist;
}

export interface ICheckItems {
  id: string;
  name: string;
  checked: boolean;
}

export interface ISelectDataItem {
  key: number;
  value: string;
  label: string;
}
