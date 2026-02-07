import axios from 'axios';

const NASA_API_KEY = 'KPv3uZNJZ55JdL1E9dcZS8lh2cRpaHPEB7Li89PW';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export interface Asteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
      miles: string;
    };
    orbiting_body: string;
  }[];
  orbital_data?: {
    orbit_id: string;
    orbit_determination_date: string;
    first_observation_date: string;
    last_observation_date: string;
    orbital_period: number;
    eccentricity: number;
    inclination: number;
    aphelion_distance: number;
    perihelion_distance: number;
  };
}

export interface NeoFeedResponse {
  near_earth_objects: Record<string, Asteroid[]>;
}

class NasaApiService {
  private client = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  });

  async getAsteroidsFeed(startDate: string, endDate?: string): Promise<Asteroid[]> {
    try {
      const response = await this.client.get<NeoFeedResponse>('/feed', {
        params: {
          start_date: startDate,
          end_date: endDate || startDate,
          api_key: NASA_API_KEY,
        },
      });

      const asteroids = Object.values(response.data.near_earth_objects).flat();
      return asteroids;
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      return [];
    }
  }

  async getAsteroidById(id: string): Promise<Asteroid | null> {
    try {
      const response = await this.client.get(`/neo/${id}`, {
        params: { api_key: NASA_API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching asteroid ${id}:`, error);
      return null;
    }
  }

  async getClosestApproaches(): Promise<Asteroid[]> {
    const today = new Date().toISOString().split('T')[0];
    const asteroids = await this.getAsteroidsFeed(today);
    
    return asteroids
      .filter(asteroid => asteroid.close_approach_data.length > 0)
      .sort((a, b) => {
        const distA = parseFloat(a.close_approach_data[0].miss_distance.kilometers);
        const distB = parseFloat(b.close_approach_data[0].miss_distance.kilometers);
        return distA - distB;
      })
      .slice(0, 10);
  }

  async getHazardousAsteroids(): Promise<Asteroid[]> {
    const today = new Date().toISOString().split('T')[0];
    const asteroids = await this.getAsteroidsFeed(today);
    
    return asteroids
      .filter(asteroid => asteroid.is_potentially_hazardous_asteroid)
      .slice(0, 10);
  }
}

export const nasaApi = new NasaApiService();