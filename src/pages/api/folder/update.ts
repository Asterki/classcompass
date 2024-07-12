import { z } from 'zod'
import { getServerSession } from 'next-auth/next'

import { updateFolder, folderExist } from '@/services/folders'

import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

type ResponseData = {
    message: string
}

/**
 * Handles the updating of a folder.
 *
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 * @returns A JSON response indicating the success or failure of the folder update.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' })

    const parsedBody = z
        .object({
            folderID: z.string({}).min(36).max(36),
            name: z.string({}).min(1).max(34),
            newParentFolderId: z.string({}).min(36).max(36)
        })
        .safeParse(req.body)

    if (!parsedBody.success || !parsedBody.data) {
        return res.status(400).json({ message: 'Invalid request body' })
    }

    try {
        const folder = await folderExist(parsedBody.data.folderID)
        if (!folder) return res.status(404).json({ message: 'Folder not found' })

        if (folder !== (session.user as any).id) return res.status(404).json({ message: 'Folder not found' })

        const { folderID, name, newParentFolderId } = parsedBody.data
        await updateFolder(folderID, name, newParentFolderId)

        return res.status(200).json({ message: 'Folder updated' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
