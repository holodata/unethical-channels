interface Reason {
  description: string;
  source: string | string[];
}

export interface Entry {
  pathname: string;
  name?: string;
  reasons: Reason[];
}

export type Entries = Entry[];
