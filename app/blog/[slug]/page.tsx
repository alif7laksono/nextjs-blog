import { getBlogPostBySlug } from "../utils/getBlog";
import BlogLayout from "../components/BlogLayout";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface Block {
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: "link";
    href: string;
  }>;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    url: string;
  };
  alt?: string;
}

type PortableText = Array<Block | Image>;

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
  body: PortableText;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post = await getBlogPostBySlug(params.slug);

  return (
    <BlogLayout>
      <article className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
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
        <div className="prose">
          <PortableText value={post.body} />
        </div>
      </article>
    </BlogLayout>
  );
}
