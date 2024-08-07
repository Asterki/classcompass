import { z } from 'zod'
import { getServerSession } from 'next-auth/next'

import { createFolder } from '@/services/folders'

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

type ResponseData = {
    message: 'Folder created' | 'Invalid request body' | 'Internal Server Error' | 'Method Not Allowed' | 'Unauthorized'
    folderID?: string
}

/**
 * Handles the creation of a folder.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' })

    // Verify Values
    const parsedBody = z
        .object({
            name: z.string({}).min(1).max(36),
            parentFolderId: z.string().min(1).max(36),
        })
        .safeParse(req.body)

    if (!parsedBody.success || !parsedBody.data) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        const userId = (session as any).id as string
        const { name, parentFolderId } = parsedBody.data

        const folderID = await createFolder({ name: name, parentFolderId: parentFolderId, userId: userId })
        return res.status(200).json({ message: 'Folder created', folderID })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
