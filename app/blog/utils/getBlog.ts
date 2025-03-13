// utils/getBlog.ts
import { sanityClient } from "./sanityClient";

export const getBlogPosts = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{title}
  }`;
  const posts = await sanityClient.fetch(query);
  return posts;
};

export const getBlogPostBySlug = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{title}
  }`;

  const post = await sanityClient.fetch(query, { slug });

  if (!post) {
    return null;
  }

  return post;
};

export async function getAllBlogSlugs() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const slugs = await sanityClient.fetch(query);

  return slugs.map((post: { slug: string }) => post.slug);
}
