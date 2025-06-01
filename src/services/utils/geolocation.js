
// Geolocation utility functions
export const geolocationAPI = {
  getCurrentLocation: async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  searchNearbySkills: async (latitude, longitude, radius = 10) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock nearby skills data
    return [
      {
        id: '1',
        skillTitle: 'Photography Workshop',
        providerName: 'Alex Thompson',
        distance: 2.5,
        location: 'Downtown Studio',
        price: 60,
        rating: 4.8
      },
      {
        id: '2',
        skillTitle: 'Guitar Lessons',
        providerName: 'Maria Garcia',
        distance: 5.1,
        location: 'Music Center',
        price: 40,
        rating: 4.9
      }
    ];
  },

  geocodeAddress: async (address) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock geocoding response
    return {
      latitude: 37.7749,
      longitude: -122.4194,
      formatted_address: address,
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    };
  }
};
