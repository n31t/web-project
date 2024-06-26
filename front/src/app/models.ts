export interface Token {
    access: string;
    refresh: string;
  }

  export interface CPU {
    id: number;
    name: string;
    release_date: Date;
  }
  
  export interface GPU {
    id: number;
    name: string;
    release_date: Date;
  }
  
  export interface Game {
    id: number;
    name: string;
    genre: string;
    release_date: Date;
    developer: string;
    minimum_memory: number;
    recommended_memory: number;
    file_size: number;
    minimum_cpu: CPU;
    recommended_cpu: CPU;
    minimum_gpu: GPU;
    recommended_gpu: GPU;
  }

  export interface Token {
    access: string;
    refresh: string;
  }

  export interface UserPc {
    id: number;
    ram: number;
    storage: number;
    cpu_id: number; 
    gpu_id: number; 
  }