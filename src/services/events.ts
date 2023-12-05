import { PrismaClient } from "@prisma/client";

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