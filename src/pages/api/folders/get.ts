import { z } from 'zod'
import { getServerSession } from 'next-auth/next'

import { getFolder } from '@/services/folders'
import { Folder } from '@/services/folders'

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

type ResponseData = {
    message:
        | 'Folder found'
        | 'Folder not found'
        | 'Invalid request body'
        | 'Internal Server Error'
        | 'Method Not Allowed'
        | 'Unauthorized'
    folder?: Folder
}

/**
 * Handles the HTTP POST request to retrieve a folder.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' })

    const parsedBody = z
        .object({
            folderId: z.string({}).min(1).max(36),
        })
        .safeParse(req.body)

    if (!parsedBody.success || !parsedBody.data) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        const userId = (session as any).id as string

        // Get the folder
        const folder = await getFolder(parsedBody.data.folderId)
        if (!folder || folder.owner_id !== userId) return res.status(404).json({ message: 'Folder not found' })

        return res.status(200).json({ message: 'Folder found', folder })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
