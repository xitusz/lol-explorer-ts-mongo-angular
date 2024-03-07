export interface IChampionDetails {
  id: string;
  name: string;
  title: string;
  lore: string;
  tags: string[];
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
    };
  };
  spells: {
    id: string;
    name: string;
    description: string;
    image: {
      full: string;
    };
  }[];
  skins: {
    id: string;
    num: number;
    name: string;
  }[];
}

export interface ISkillVideos {
  [key: string]: {
    [key: string]: string;
  };
}

export interface IChampionDetailsResponse {
  data: Record<string, IChampionDetails>;
}
