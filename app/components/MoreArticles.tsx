import { fonts } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: string;
}

interface MoreArticlesProps {
  posts: Post[];
}

export default function MoreArticles({ posts }: MoreArticlesProps) {
  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className={`${fonts.quattrocento_sans} text-2xl font-bold mb-6`}>
        More Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {post.mainImage && (
              <Image
                src={post.mainImage}
                alt={post.title}
                className="w-full h-48 object-cover"
                width={400}
                height={800}
              />
            )}
            <div className="p-4">
              <h3
                className={`${fonts.quattrocento_sans} text-xl font-semibold mb-2 line-clamp-2 text-center`}
              >
                {post.title}
              </h3>
              <Button asChild variant="outline" className="w-full">
                <a href={`/${post.slug}`}>Read More</a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
