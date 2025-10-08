const divingCenters = [
    {
        id: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        name: 'Phuket Dive Center',
        location: {
            longitude: 98.3923,
            latitude: 7.8804
        }
    },
    {
        id: 'b2c3d4e5-f6a7-4890-b123-456789abcdef',
        name: 'Koh Tao Divers',
        location: {
            longitude: 99.8393,
            latitude: 10.0956
        }
    },
    {
        id: 'c3d4e5f6-a7b8-4901-c234-56789abcdef0',
        name: 'Phi Phi Dive Camp',
        location: {
            longitude: 98.7784,
            latitude: 7.7407
        }
    },
    {
        id: 'd4e5f6a7-b8c9-4012-d345-6789abcdef01',
        name: 'Koh Lanta Diving School',
        location: {
            longitude: 99.0408,
            latitude: 7.5650
        }
    },
    {
        id: 'e5f6a7b8-c9d0-4123-e456-789abcdef012',
        name: 'Similan Adventures',
        location: {
            longitude: 97.6467,
            latitude: 8.6726
        }
    }
];

const getAllDivingCenters = () => {
    return divingCenters;
};

const getDivingCenterById = (id) => {
    return divingCenters.find(center => center.id === id);
};

module.exports = {
    getAllDivingCenters,
    getDivingCenterById
};