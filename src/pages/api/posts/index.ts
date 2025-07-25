import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    let posts = await getCollection('blog')
    if (id) {
        posts = await getCollection('blog', (post) => post.id === id)
    } else {
    }
    return new Response(JSON.stringify(posts), {
        status: posts.length === 0 ? 404 : 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
