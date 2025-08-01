import type { APIRoute } from 'astro'
import { db, Clients } from 'astro:db'
export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
    const users = await db.select().from(Clients)
    const body = {
        method: `GET`,
        ...users
    }
    return new Response(JSON.stringify(body), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const { id, ...body } = await request.json()
        const { lastInsertRowid } = await db.insert(Clients).values(body)
        const bodyResp = {
            method: `POST`,
            id: Number(lastInsertRowid?.toString()),
            ...body
        }
        return new Response(JSON.stringify(bodyResp), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ msg: `No Body found:  ${error}` }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
