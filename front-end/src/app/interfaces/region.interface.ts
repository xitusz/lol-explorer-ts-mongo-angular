export interface IRegion {
  name: string;
  nameBR: string;
  img: string;
  regionVideo: string;
  icon: string;
  description: string;
  champions: string[];
}

export interface IRegionList {
  [key: string]: IRegion;
}
