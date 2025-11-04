import {updateFishSightings} from "./fishSightingService";
import {FishRarity} from '../generated/prisma';
import {
    COMMON_FISH_SIGHTING_UPDATE_RATE,
    EPIC_FISH_SIGHTING_UPDATE_RATE,
    RARE_FISH_SIGHTING_UPDATE_RATE,
    TEMPERATURE_UPDATE_RATE
} from "../globals";
import {updateTemperatureReadings} from "./temperatureReadingService";

export const startFishSightingUpdates = () => {
    setInterval(() => updateFishSightings(FishRarity.COMMON), COMMON_FISH_SIGHTING_UPDATE_RATE * 60 * 1000);
    setInterval(() => updateFishSightings(FishRarity.RARE), RARE_FISH_SIGHTING_UPDATE_RATE * 60 * 1000);
    setInterval(() => updateFishSightings(FishRarity.EPIC), EPIC_FISH_SIGHTING_UPDATE_RATE * 60 * 1000);
    console.log(`🐟 Fish sighting updates started. Settings: COMMON: ${COMMON_FISH_SIGHTING_UPDATE_RATE} minutes, RARE: ${RARE_FISH_SIGHTING_UPDATE_RATE} minutes , EPIC: ${EPIC_FISH_SIGHTING_UPDATE_RATE} minutes.`);
};

export const startTemperatureSensorUpdates = () => {
    setInterval(() => updateTemperatureReadings(), TEMPERATURE_UPDATE_RATE * 60 * 1000);
    console.log(`🌡️ Temperature updates started. Settings: ${TEMPERATURE_UPDATE_RATE} minutes.`);
};