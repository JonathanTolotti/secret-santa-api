import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export const getAll = async () => {
    try {
        return await prisma.event.findMany({
            select: {
                id: false,
                uuid: true,
                status: true,
                title: true,
                description: true,
                grouped: true,
            }
        });
    } catch (err) {
        return false;
    }
};

export const getOne = async (uuid: string) => {
    try {
        return await prisma.event.findFirst({
            where: {
                uuid: uuid
            },
            select: {
                id: false,
                uuid: true,
                status: true,
                title: true,
                description: true,
                grouped: true,
            }
        });
    } catch (err) {
        return false;
    }
};

type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data']
export const add = async (data: EventsCreateData) => {
    try {
        return await prisma.event.create({
            data,
            select: {
                id: false,
                uuid: true,
                status: true,
                title: true,
                description: true,
                grouped: true,
            }
        });
    } catch (err) {
        return false;
    }
};