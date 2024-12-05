export type Post = {
  id: string;
  title: string;
  user: {
    id: number;
    name: string;
    role: number;
    polaris_id: string;
    char: string;
    rank: string;
  };
  slug: string;
  description: string;
  date: string;
  categories: string[];
  published: boolean;
};
