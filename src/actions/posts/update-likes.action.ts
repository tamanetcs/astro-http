import { defineAction } from 'astro:actions'
import { db, eq, Posts } from 'astro:db'
import { z } from 'astro:schema'
import { getPostLikesHelper } from '@helpers/count-likes-helper'

export const updatePostLikes = defineAction({
    accept: 'json',
    input: z.object({
        postId: z.string(),
        increment: z.number()
    }),
    handler: async ({ postId, increment }) => {
        // const { data, error } = await actions.getPostLikes(postId)
        const resp = await getPostLikesHelper(postId)

        // if (error) {
        //     console.log(error)
        //     throw new Error('Algo salió mal')
        // }

        const { exists, likes } = resp

        if (!exists) {
            const newPost = {
                id: postId,
                title: 'Post not found',
                likes: 0
            }

            await db.insert(Posts).values(newPost)
        }

        await db
            .update(Posts)
            .set({
                likes: likes + increment
            })
            .where(eq(Posts.id, postId))

        return true
    }
})

// import { actions, defineAction } from 'astro:actions'
// import { z } from 'astro:content'
// import { db, Posts, eq } from 'astro:db'

// export const updatePostLikes = defineAction({
//     accept: 'json',
//     input: z.object({
//         postId: z.string(),
//         increment: z.number()
//     }),
//     handler: async ({ postId, increment }) => {
//         const { data, error } = await actions.getPostLikes(postId)
//         if (error) {
//             console.log(error)
//             throw new Error('Algo salio mal')
//         }

//         const { exists, likes } = data

//         if (!exists) {
//             const newPost = {
//                 id: postId,
//                 title: 'Post not found',
//                 likes: 0
//             }
//             await db.insert(Posts).values(newPost) // Insertar en da db
//             // posts.push(newPost) // Insertar en el array
//         }

//         await db
//             .update(Posts)
//             .set({
//                 likes: likes + increment
//             })
//             .where(eq(Posts.id, postId))

//         return { success: true }
//     }
// })
