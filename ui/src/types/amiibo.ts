export interface AmiiboSeries {
  id: number;
  name: string;
}

export interface Amiibo {
  id: number;
  name: string;
  image: string;
  series_id: number;
  series?: AmiiboSeries;
}
