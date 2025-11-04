import {$Enums, PrismaClient} from "../src/generated/prisma";
import {randomPointInCircle} from "../src/services/geoPointService";
import FishRarity = $Enums.FishRarity;

const prisma = new PrismaClient();

async function seed() {
    // Diving Centers
    await prisma.divingCenter.deleteMany({});
    await prisma.divingCenter.createMany({
        data: [
            {
                "name": "La Bombona Diving",
                "longitude": 99.82786494391709,
                "latitude": 10.09949848404374
            },
            {
                "name": "Coral Grand Divers",
                "longitude": 99.82705089619611,
                "latitude": 10.103286921162093,
            },
            {
                "name": "Scuba Birds",
                "longitude": 99.8225499878697,
                "latitude": 10.08176692114223,
            },
            {
                "name": "Sairee Cottage Diving",
                "longitude": 99.82832599207734,
                "latitude": 10.097139068851266
            },
            {
                "name": "Mojo Diver",
                "longitude": 99.82729089627196,
                "latitude": 10.10268799673875
            }
        ]
    });


    // Fish
    await prisma.fishSighting.deleteMany({});
    await prisma.fish.deleteMany({});

    const fish = await prisma.fish.createManyAndReturn({
        data: [
            {
                "name": "Titan triggerfish",
                "image": "https://example.com/titan_triggerfish.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "Blotched porcupine pufferfish",
                "image": "https://example.com/blotched_pufferfish.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "Common lionfish",
                "image": "https://example.com/lionfish.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "Orange-spine unicornfish",
                "image": "https://example.com/orange_spine_unicornfish.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "Butterflyfish (e.g. Lined Butterflyfish)",
                "image": "https://example.com/butterflyfish.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "Chevron barracuda",
                "image": "https://example.com/chevron_barracuda.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "White-eyed moray eel",
                "image": "https://example.com/white_eyed_moray.jpg",
                "rarity": FishRarity.COMMON
            },
            {
                "name": "Pink Tail Triggerfish",
                "image": "https://example.com/white_eyed_moray.jpg",
                "rarity": FishRarity.RARE
            },
            {
                "name": "Seahorse",
                "image": "https://example.com/white_eyed_moray.jpg",
                "rarity": FishRarity.RARE
            },
            {
                "name": "Broadbanded Moray",
                "image": "https://example.com/white_eyed_moray.jpg",
                "rarity": FishRarity.RARE
            },
            {
                "name": "Whale Shark",
                "image": "https://example.com/whale_shark.jpg",
                "rarity": FishRarity.EPIC
            }
        ]
    });

    // Create Fish Sightings
    for (const f of fish) {
        const sightings = [];
        for (let i = 0; i < 10; i++) {
            const location = randomPointInCircle();
            // Last event (i=9) is current time, each previous event is 5 minutes earlier
            const minutesAgo = (9 - i) * 5;
            const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000);

            sightings.push({
                fishId: f.id,
                latitude: location.lat,
                longitude: location.lon,
                timestamp: timestamp
            });
        }
        await prisma.fishSighting.createMany({
            data: sightings
        });
    }

    // Temperatures
    await prisma.temperatureReading.deleteMany({});
    await prisma.temperatureSensor.deleteMany({});

    const sensors = await prisma.temperatureSensor.createManyAndReturn({
        data: [
            {
                latitude: 10.096627860017245,
                longitude: 99.82284696298889
            },
            {
                latitude: 10.094386019925015,
                longitude: 99.81399733785584
            },
            {
                latitude: 10.094895530408255,
                longitude: 99.80468194297896
            }
        ]
    });

    // Create 10 readings for each sensor, spaced 30 minutes apart
    for (const sensor of sensors) {
        const readings = [];
        for (let i = 0; i < 10; i++) {
            // Generate realistic temperature between 28°C and 30°C
            // Add small variations to make it more realistic
            const baseTemp = 28 + Math.random() * 2; // Random between 28 and 30
            const temperature = Math.round(baseTemp * 100) / 100; // Round to 2 decimals

            // Last reading (i=9) is current time, each previous reading is 30 minutes earlier
            const minutesAgo = (9 - i) * 30;
            const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000);

            readings.push({
                temperatureSensorId: sensor.id,
                temperature: temperature,
                timestamp: timestamp
            });
        }
        await prisma.temperatureReading.createMany({
            data: readings
        });
    }

}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });