import { z } from 'zod'
import { getServerSession } from 'next-auth/next'

import { findNotesByTag } from '@/services/notes'

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

type ResponseData = {
    message: 'Notes found' | 'Invalid request body' | 'Internal Server Error' | 'Method Not Allowed' | 'Unauthorized'
    notes?: {
        id: string
        name: string
        created_at: Date
        parent_folder_id: string
        tags: string[]
        archived: boolean
    }[]
}

/**
 * Handles the API request to find folders by name.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' })

    const parsedBody = z
        .object({
            tag: z.string({}).min(1).max(12),
        })
        .safeParse(req.body)

    if (!parsedBody.success || !parsedBody.data) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        const userId = (session.user as any).id as string
        const notes = await findNotesByTag(parsedBody.data.tag, userId)

        const returnedNotes = notes.map(note => {
            return {
                id: note.id,
                name: note.title,
                created_at: note.created_at,
                parent_folder_id: note.parent_folder_id,
                tags: note.tags,
                archived: note.archived,
            }
        })

        return res.status(200).json({ message: 'Notes found', notes: returnedNotes })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
