// utils/types.ts

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  author?: string;
  categories?: Array<{ title: string }>;
  body?: Body;
}

export interface BlogListProps {
  posts: BlogPost[];
}

export interface SearchPageProps {
  searchParams: {
    q: string;
  };
}
