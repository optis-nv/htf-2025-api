import {PrismaClient} from '../generated/prisma';

const prisma = new PrismaClient();

export const getAllTemperatureReadings = async () => {
    return prisma.temperatureSensor.findMany({
        select: {
            id: true,
            latitude: true,
            longitude: true,
            readings: {
                select: {
                    id: true,
                    temperature: true,
                    timestamp: true
                }
            }
        }
    })
}

export const updateTemperatureReadings = async () => {
    // Get all sensors with their most recent and oldest readings
    const sensors = await prisma.temperatureSensor.findMany({
        include: {
            readings: {
                orderBy: {
                    timestamp: 'desc'
                }
            }
        }
    });

    const newReadings = [];
    const readingsToDelete = [];

    for (const sensor of sensors) {
        let newTemperature: number;

        if (sensor.readings.length > 0) {
            // Get the most recent temperature
            const lastReading = sensor.readings[0];
            const lastTemp = Number(lastReading.temperature);

            // Generate a realistic variation (±0.3°C)
            const variation = (Math.random() - 0.5) * 0.6; // Range: -0.3 to +0.3
            newTemperature = lastTemp + variation;

            // Clamp between 28 and 30
            newTemperature = Math.max(28, Math.min(30, newTemperature));

            // Get the oldest reading to delete
            if (sensor.readings.length === 10) {
                const oldestReading = sensor.readings[sensor.readings.length - 1];
                readingsToDelete.push(oldestReading.id);
            }

        } else {
            // If no previous readings, generate a random temperature between 28 and 30
            newTemperature = 28 + Math.random() * 2;
        }

        // Round to 2 decimal places
        newTemperature = Math.round(newTemperature * 100) / 100;

        newReadings.push({
            temperatureSensorId: sensor.id,
            temperature: newTemperature,
            timestamp: new Date()
        });
    }

    // Delete oldest readings first, then create new ones
    if (readingsToDelete.length > 0) {
        await prisma.temperatureReading.deleteMany({
            where: {
                id: {
                    in: readingsToDelete
                }
            }
        });
    }

    await prisma.temperatureReading.createMany({
        data: newReadings
    });
    console.log(`Updated temperature readings at ${new Date().toISOString()}`);
}

