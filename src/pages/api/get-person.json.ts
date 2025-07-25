import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
    const person = {
        name: 'Abraham Duarte', // Nombre
        age: 45 // Edad
    }
    return new Response(JSON.stringify(person), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
