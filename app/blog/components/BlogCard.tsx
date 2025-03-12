// blog/components/BlogCard.tsx
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  mainImage: string;
  publishedAt: string;
  slug: {
    current: string;
  };
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={post.mainImage}
        alt={post.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">
          {new Date(post.publishedAt).toDateString()}
        </p>
        <a
          href={`/blog/${post.slug.current}`}
          className="text-blue-500 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
