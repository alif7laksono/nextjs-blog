// utils/getBlog.ts
import { sanityClient } from "./sanityClient";

export const getBlogPosts = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    body,
    "mainImage": mainImage.asset->url
  }`;
  const posts = await sanityClient.fetch(query);
  return posts;
};

export const getBlogPostBySlug = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    "mainImage": mainImage.asset->url
  }`;
  const post = await sanityClient.fetch(query, { slug });
  return post;
};
