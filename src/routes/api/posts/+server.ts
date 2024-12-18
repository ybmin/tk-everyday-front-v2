import { json } from "@sveltejs/kit";
import type { Post } from "$lib/types/posts";

async function getPosts() {
  let posts: Post[] = [];
  const paths = import.meta.glob("/src/posts/*.md", { eager: true });

  for (const path in paths) {
    const file = await paths[path];
    const slug = path.split("/").at(-1)?.replace(/\.md/, "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as Omit<Post, "slug">;
      const post = { ...metadata, slug } satisfies Post;
      post.published && posts.push(post);
    }
  }
  posts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return posts;
}

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
