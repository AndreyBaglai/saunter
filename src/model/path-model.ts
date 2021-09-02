export type PathModel = {
  id: string;
  title: string;
  description: {
    short: string;
    full: string;
  };
  selected: boolean;
  distance: string;
  map: any;
}