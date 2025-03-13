// blog/components/BlogList.tsx
import { getBlogPosts } from "../utils/getBlog";
import BlogCard from "./BlogCard";

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
  };
  mainImage: string;
  categories: Array<{
    title: string;
  }>;
  publishedAt: string;
  body: Body;
}

export default async function BlogList() {
  const posts: Post[] = await getBlogPosts();

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: Post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
