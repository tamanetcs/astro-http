import { getCollection } from 'astro:content'
import { Clients, Posts, db } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
    // TODO

    const dataClient = [
        { id: 1, name: 'Abraham', age: 45, isActive: true },
        { id: 2, name: 'Fernando', age: 35, isActive: true },
        { id: 3, name: 'Kinini', age: 21, isActive: true },
        { id: 4, name: 'Dany', age: 16, isActive: true },
        { id: 5, name: 'Mariano', age: 29, isActive: true }
    ]
    await db.insert(Clients).values(dataClient)

    const posts = await getCollection('blog')
    await db.insert(Posts).values(
        posts.map((p) => ({
            id: p.id,
            title: p.data.title,
            likes: Math.round(Math.random() * 100)
        }))
    )

    console.log('Seed executed')
}
