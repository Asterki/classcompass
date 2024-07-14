import { z } from 'zod'
import { getServerSession } from 'next-auth/next'

import { createNote } from '@/services/notes'

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

type ResponseData = {
    message: string
    noteID?: string
}

/**
 * Handles the creation of a new note.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' })

    const parsedBody = z
        .object({
            title: z.string({}).min(1).max(34),
            content: z.string({}).min(1).max(10000),
            folderId: z.string({}).min(36).max(36).optional()
        })
        .safeParse(req.body)

    if (!parsedBody.success || !parsedBody.data) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        let userID = (session as any).id as string

        let noteID = await createNote({
            title: parsedBody.data.title,
            content: parsedBody.data.content,
            folderId: parsedBody.data.folderId ? parsedBody.data.folderId : "parent",
            ownerId: userID
        })

        return res.status(200).json({ message: 'Note created', noteID })
    } catch (error) {
        console.error('Error creating note:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
