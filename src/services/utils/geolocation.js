
// Geolocation utility functions
export const geolocationAPI = {
  getCurrentPosition: async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
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
          reject(new Error(error.message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000
        }
      );
    });
  },

  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  getNearbySkills: async (latitude, longitude, radius = 10) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock nearby skills
    return [
      {
        id: '1',
        skillTitle: 'Photography Workshop',
        providerName: 'Alex Photo',
        distance: 2.5,
        latitude: latitude + 0.01,
        longitude: longitude + 0.01,
        price: 60
      },
      {
        id: '2',
        skillTitle: 'Cooking Class',
        providerName: 'Chef Maria',
        distance: 5.1,
        latitude: latitude + 0.02,
        longitude: longitude - 0.01,
        price: 80
      }
    ];
  },

  geocodeAddress: async (address) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock geocoding response
    return {
      latitude: 37.7749,
      longitude: -122.4194,
      formattedAddress: 'San Francisco, CA, USA',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94102'
    };
  },

  reverseGeocode: async (latitude, longitude) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      formattedAddress: 'San Francisco, CA, USA',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94102'
    };
  }
};
