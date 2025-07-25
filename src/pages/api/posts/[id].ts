import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'
export const prerender = false // Para que no se prerenderize

export const GET: APIRoute = async ({ params, request }) => {
    const { id } = params
    const post = await getEntry('blog', id as any)

    if (!post) {
        return new Response(JSON.stringify({ msg: `Post ${id} not found` }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return new Response(JSON.stringify(post), { status: 200 })
}

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json()
    return new Response(
        JSON.stringify({
            method: 'POST',
            ...body
        }),
        { status: 200 }
    )
}

export const PUT: APIRoute = async ({ params, request }) => {
    const body = await request.json()
    return new Response(
        JSON.stringify({
            method: 'PUT',
            ...body
        }),
        { status: 200 }
    )
}

export const DELETE: APIRoute = async ({ params, request }) => {
    const { id } = params
    return new Response(
        JSON.stringify({
            method: 'DELETE',
            id: id
        }),
        { status: 200 }
    )
}
