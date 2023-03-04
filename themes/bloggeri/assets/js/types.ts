export interface Page {
  title: string; // == eva_number
  category: string;
  tag: string;
  url: string;
}

interface Match {
  key: string;
  value: string;
  indices: number[][];
}

export interface Hit {
  item: Page;
  refIndex: number;
  matches: Match[];
}
