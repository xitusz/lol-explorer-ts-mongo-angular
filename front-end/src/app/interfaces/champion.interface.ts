export interface IChampion {
  id: string;
  image: {
    full: string;
    sprite: string;
  }
  name: string;
  title: string;
  tags: string[];
}

export interface IChampionResponse {
  data: Record<string, IChampion>;
}