import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  getBlogPosts,
} from "../utils/getBlog";
import BlogLayout from "../components/BlogLayout";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RichText from "../components/RichText";
import MoreArticles from "../components/MoreArticles";
import { fonts } from "@/app/fonts";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: string;
  publishedAt: string;
  body: Body; // Sesuaikan dengan tipe yang sesuai untuk Portable Text
  categories?: Array<{
    title: string;
  }>;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const allPosts = await getBlogPosts();
  const morePosts = allPosts
    .filter((p: Post) => p.slug.current !== slug)
    .slice(0, 3);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <BlogLayout>
      <Card className="max-w-2xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle
            className={`${fonts.quattrocento_sans} text-3xl text-center font-bold mb-4`}
          >
            {post.title}
          </CardTitle>
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-none mb-4"
            />
          )}
          {/* <p className="text-gray-600 mb-4">
            {new Date(post.publishedAt).toDateString()}
          </p> */}
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <RichText value={post.body} />
        </CardContent>
      </Card>

      <MoreArticles posts={morePosts} />
    </BlogLayout>
  );
}
