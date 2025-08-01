import { column, defineDb, defineTable } from 'astro:db'

const Clients = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text({ default: 'X' }),
        age: column.number(),
        isActive: column.boolean()
    }
})

// https://astro.build/db/config
export default defineDb({
    tables: { Clients }
})
