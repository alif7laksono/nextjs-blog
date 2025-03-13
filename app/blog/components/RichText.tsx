import { PortableText } from "@portabletext/react";
import Image from "next/image";
import {
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";

interface PortableTextImage {
  _type: "image";
  asset: {
    _ref: string;
    url: string;
  };
  alt?: string;
}

interface PortableTextLink {
  _type: "link";
  href: string;
}

interface PortableTextBlock {
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

type PortableTextValue = Array<PortableTextBlock | PortableTextImage>;

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => (
      <div className="my-6">
        <Image
          src={value.asset.url}
          alt={value.alt || "Image"}
          width={800}
          height={400}
          className="rounded-lg"
        />
        {value.alt && (
          <p className="text-center text-sm text-gray-600 mt-2">{value.alt}</p>
        )}
      </div>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<PortableTextLink>) => {
      if (!value) return null; // Handle jika value tidak ada
      return (
        <a
          href={value.href}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
};

export default function RichText({ value }: { value: PortableTextValue }) {
  return <PortableText value={value} components={components} />;
}
