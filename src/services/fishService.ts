import {PrismaClient} from '../generated/prisma';

const prisma = new PrismaClient();

export const getAllFish = async () => {
    const fish = await prisma.fish.findMany({
        include: {
            sightings: {
                orderBy: {
                    timestamp: 'desc'
                },
                take: 1
            }
        }
    });

    return fish.map(({sightings, ...f}) => ({
        ...f,
        latestSighting: sightings[0] || null
    }));
};

export const getFishById = async (id: string) => {
    return prisma.fish.findUnique({
        where: {
            id
        },
        include: {
            sightings: true
        }
    });
};
