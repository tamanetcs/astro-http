import { Clients, db } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
    // TODO

    await db.insert(Clients).values([
        { id: 1, name: 'Abraham', age: 45, isActive: true },
        { id: 2, name: 'Fernando', age: 35, isActive: true },
        { id: 3, name: 'Kinini', age: 21, isActive: true },
        { id: 4, name: 'Dany', age: 16, isActive: true },
        { id: 5, name: 'Mariano', age: 29, isActive: true }
    ])

    console.log('Seed executed')
}
