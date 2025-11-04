import {FishRarity, PrismaClient} from '../generated/prisma';
import {randomPointInCircle} from './geoPointService';

const prisma = new PrismaClient();

export const updateFishSightings = async (rarity: FishRarity) => {
    // Fetch all fish with their sightings
    const allFish = await prisma.fish.findMany({
        where: {rarity},
        include: {
            sightings: {
                orderBy: {
                    timestamp: 'desc'
                }
            }
        }
    });

    const minToUpdate = rarity === FishRarity.COMMON ? 1 : 0;
    const maxToUpdate = rarity === FishRarity.COMMON ? allFish.length : 1;
    const numToUpdate = Math.floor(Math.random() * (maxToUpdate - minToUpdate + 1)) + minToUpdate;

    // Shuffle and select fish to update
    const shuffled = [...allFish].sort(() => Math.random() - 0.5);
    const fishToUpdate = shuffled.slice(0, numToUpdate);

    const sightingsToDelete = [];
    const newSightings = [];

    for (const fish of fishToUpdate) {
        // Delete the oldest sighting if there are 10 sightings
        if (fish.sightings.length === 10) {
            const oldestSighting = fish.sightings[fish.sightings.length - 1];
            sightingsToDelete.push(oldestSighting.id);
        }

        // Create a new sighting with current timestamp and random location
        const location = randomPointInCircle();
        newSightings.push({
            fishId: fish.id,
            latitude: location.lat,
            longitude: location.lon,
            timestamp: new Date()
        });
    }

    // Delete oldest sightings
    if (sightingsToDelete.length > 0) {
        await prisma.fishSighting.deleteMany({
            where: {
                id: {
                    in: sightingsToDelete
                }
            }
        });
    }

    // Create new sightings
    await prisma.fishSighting.createMany({
        data: newSightings
    });

    console.log(`Updated sightings for ${fishToUpdate.length} out of ${allFish.length} ${rarity} fish at ${new Date().toISOString()}`);
};