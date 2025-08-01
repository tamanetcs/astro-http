import type { APIRoute } from 'astro'
import { db, Clients, eq } from 'astro:db'
export const prerender = false // Para que no se prerenderize

export const GET: APIRoute = async ({ params, request }) => {
    const { clientId } = params
    const dataClient = await db
        .select()
        .from(Clients)
        .where(eq(Clients.id, Number(clientId)))
    if (dataClient.length > 0) {
        const bodyResp = {
            method: `GET`,
            ...dataClient.at(0)
        }
        const body = {
            method: `GET`,
            clientId: Number(clientId)
        }
        return new Response(JSON.stringify(bodyResp), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else {
        return new Response(JSON.stringify({ msg: `Record ${clientId} Not found` }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export const POST: APIRoute = async ({ params, request }) => {
    const body = {
        method: `POST`
    }
    return new Response(JSON.stringify(body), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const PATCH: APIRoute = async ({ params, request }) => {
    const { clientId } = params ?? ''
    try {
        const { id, ...body } = await request.json()
        const results = await db
            .update(Clients)
            .set(body)
            .where(eq(Clients.id, Number(clientId)))
        const updatedClient = await db
            .select()
            .from(Clients)
            .where(eq(Clients.id, Number(clientId)))
        const bodyResp = {
            method: `PATCH`,
            ...updatedClient
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

export const DELETE: APIRoute = async ({ params, request }) => {
    const { clientId } = params ?? ''
    try {
        const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, Number(clientId)))
        const bodyResp = {
            method: `DELETE`,
            id: clientId,
            registros_borrados: rowsAffected
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
