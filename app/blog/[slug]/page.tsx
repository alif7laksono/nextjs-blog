import { getBlogPostBySlug, getAllBlogSlugs } from "../utils/getBlog";
import BlogLayout from "../components/BlogLayout";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RichText from "../components/RichText";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <BlogLayout>
      <Card className="max-w-2xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            {post.title}
          </CardTitle>
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg mb-4"
            />
          )}
          <p className="text-gray-600 mb-4">
            {new Date(post.publishedAt).toDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <RichText value={post.body} />
        </CardContent>
      </Card>
    </BlogLayout>
  );
}
