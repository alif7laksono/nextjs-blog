import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">My Blog</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 p-4 text-center shadow-inner">
        <div className="container mx-auto">
          <p>Footer Content</p>
        </div>
      </footer>
    </div>
  );
}
