
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Page {
  id: string;
  title: string;
  emoji?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  pinned?: boolean;
}

export type ViewType = 'table' | 'board' | 'calendar' | 'list';

export interface Collection {
  id: string;
  name: string;
  icon?: string;
  schema: CollectionSchema;
  viewType: ViewType;
}

export interface CollectionSchema {
  [key: string]: {
    type: 'text' | 'number' | 'select' | 'date' | 'file' | 'checkbox';
    name: string;
    options?: string[];
  }
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  properties: {
    [key: string]: any;
  };
}
