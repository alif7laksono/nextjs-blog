// app/components/BlogCard.tsx

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";
import { fonts } from "@/app/fonts";

interface Post {
  _id: string;
  title: string;
  mainImage?: string;
  publishedAt: string;
  slug: {
    current: string;
  };
  categories?: Array<{ title: string }>;
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="bg-white text-black shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
      {post.mainImage && (
        <div>
          <Image
            src={post.mainImage}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover px-4"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle
          className={`${fonts.quattrocento_sans} text-xl font-semibold line-clamp-2`}
        >
          {post.title}
        </CardTitle>
        <CardDescription className="flex flex-row justify-between items-center text-gray-600 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{new Date(post.publishedAt).toDateString()}</span>
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {post.categories.map((cat) => cat.title).join(", ")}
              </span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline" className="w-full rounded-none">
          <a href={`/${post.slug}`}>Read More</a>
        </Button>
      </CardContent>
    </Card>
  );
}
