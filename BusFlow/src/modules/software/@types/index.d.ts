// src/@types/index.d.ts
declare global {
  interface Bus {
    id: number;
    line: number;
    capacity: number;
    license: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface PeopleHistory {
    id: number;
    busId: number;
    peopleCount: number;
    dateTime: Date;
    createdAt: Date;
    updatedAt: Date;
  }

  interface BusOcurrence {
    id: number;
    busId: number;
    title: string;
    category: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface BusStop {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  }

  interface BusStopOccurrence {
    id: number;
    busStopId: number;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface BusStopHistory {
    id: number;
    busStopId: number;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface LightingHistory {
    id: number;
    busId: number;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export { Bus, BusStop, PeopleHistory, BusOcurrence };
