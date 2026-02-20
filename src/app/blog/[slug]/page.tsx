import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Individual blog post page.
 * Currently a placeholder — will be wired to a CMS or MDX content later.
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // No posts exist yet — 404 everything
  void slug;
  notFound();
}
