export interface Token {
    access: string;
    refresh: string;
  }

  export interface CPU {
    id: number;
    name: string;
    releaseDate: Date;
  }
  
  export interface GPU {
    id: number;
    name: string;
    releaseDate: Date;
  }
  
  export interface Game {
    id: number;
    name: string;
    genre: string;
    releaseDate: Date;
    developer: string;
    minimumMemory: number;
    recommendedMemory: number;
    fileSize: number;
    minimumCpu: CPU;
    recommendedCpu: CPU;
    minimumGpu: GPU;
    recommendedGpu: GPU;
  }

  export interface Token {
    access: string;
    refresh: string;
  }