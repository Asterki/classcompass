import { v4 as uuidv4 } from 'uuid'

import { prismaClient } from '@/lib/prisma'

import { Folder } from './folders'

interface Link {
    id: string
    links_to: string
    label: string
    note_id: string
}

interface Attachment {
    id: string
    url: string
    label: string
    note_id: string
}

interface Note {
    id: string
    title: string
    content: string
    created_at: Date

    owner_id: string
    folder_id: string

    attachments: Attachment[]
    links: Link[]
}

const createNote = async (data: {
    title: string
    content: string
    folderId: string
    ownerId: string
}): Promise<string> => {
    const noteID = uuidv4()

    prismaClient.note.create({
        data: {
            id: noteID,
            title: data.title,
            content: data.content,
            created_at: new Date(),
            owner_id: data.ownerId,
            folder_id: data.folderId,
            tags: [''],
            archived: false
        }
    })

    return noteID
}

const deleteNote = (noteId: string) => {
    prismaClient.note.delete({
        where: {
            id: noteId
        }
    })
}

const getNote = async (noteId: string) => {
    const note = await prismaClient.note.findUnique({
        where: {
            id: noteId
        },
        include: {
            attachments: true,
            links: true
        }
    })

    return note
}

const noteExists = async (noteId: string) => {
    const note = await prismaClient.note.findUnique({
        where: {
            id: noteId
        },
        select: {
            owner_id: true
        }
    })

    if (!note) return false
    return note.owner_id
}

const getNotes = async (folderId: string) => {
    const notes = await prismaClient.note.findMany({
        where: {
            folder_id: folderId
        }
    })

    return notes
}

const updateNote = async (noteId: string, title: string, content: string, tags: string[]) => {
    await prismaClient.note.update({
        where: {
            id: noteId
        },
        data: {
            title,
            content,
            tags
        }
    })
}

const findNotesByName = async (name: string, folderId: string) => {
    const notes = await prismaClient.note.findMany({
        where: {
            title: name.toLowerCase(),
            folder_id: folderId
        }
    })

    return notes
}

const moveNote = async (noteId: string, folderId: string, newFolderId: string) => {
    await prismaClient.note.update({
        where: {
            id: noteId
        },
        data: {
            folder_id: newFolderId
        }
    })
}

export { createNote, deleteNote, getNote, getNotes, updateNote, noteExists, findNotesByName, moveNote }
export type { Note, Attachment, Link }
