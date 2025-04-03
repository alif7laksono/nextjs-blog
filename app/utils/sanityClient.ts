// utils/sanityClient.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "c2y8hy70",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
});
