import { z } from 'zod'
import { getServerSession } from 'next-auth/next'

import { updateNote, getNote } from '@/services/notes'

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

type ResponseData = {
    message: string
}

/**
 * Handles the update for a note by its ID.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' })

    const parsedBody = z
        .object({
            noteId: z.string({}).min(1).max(36),
            title: z.string({}).min(1).max(36),
            content: z.string({}).min(1).max(10000),
            tags: z.array(z.string().min(2).max(12)).max(5),
            archived: z.boolean()
        })
        .safeParse(req.body)

    if (!parsedBody.success || !parsedBody.data) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        const userId = (session as any).id as string
        const { noteId, title, content, tags, archived } = parsedBody.data

        const note = await getNote(noteId)
        if (!note || note.owner_id !== userId) return res.status(404).json({ message: 'Note not found' })

        // Update the note
        await updateNote(noteId, { title, content, tags, archived })
        return res.status(200).json({ message: 'Note updated' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
