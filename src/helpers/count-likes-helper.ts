import { db, Posts, eq } from 'astro:db'

export const getPostLikesHelper = async (postId: string) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId))
    if (!post) {
        return { likes: 0, exists: false }
    }
    return { likes: post.likes, exists: true }
}
