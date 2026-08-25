import Link from "next/link";
import type { WpPost } from "@/lib/types";

export default function PostCard({ post }: { post: WpPost }) {
  return (
    <article className="post-card">
      <h2>
        <Link href={`/${post.slug}/`}>{post.title}</Link>
      </h2>
      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("es-ES")}</time>
      {post.excerpt && <p>{post.excerpt}</p>}
    </article>
  );
}
