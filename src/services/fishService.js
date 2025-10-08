const fishes = [
    {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        name: 'Asian Sea Bass',
        lastSeenLocation: {
            longitude: 100.5018,
            latitude: 13.7563
        }
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Nile Tilapia',
        lastSeenLocation: {
            longitude: 99.8325,
            latitude: 19.9070
        }
    },
    {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        name: 'Walking Catfish',
        lastSeenLocation: {
            longitude: 100.2635,
            latitude: 14.8825
        }
    },
    {
        id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
        name: 'Snakehead Fish',
        lastSeenLocation: {
            longitude: 101.4928,
            latitude: 13.3611
        }
    },
    {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        name: 'Java Barb',
        lastSeenLocation: {
            longitude: 98.9817,
            latitude: 18.7883
        }
    }
];

const getAllFishes = () => {
    return fishes;
};

const getFishById = (id) => {
    return fishes.find(fish => fish.id === id);
};

module.exports = {
    getAllFishes,
    getFishById
};