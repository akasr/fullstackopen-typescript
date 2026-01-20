export const weathers = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const;
export type Weather = (typeof weathers)[number];

export const visibilities = ['ok', 'good', 'great', 'poor'] as const;
export type Visibility = (typeof visibilities)[number];

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
export type NewDiary = Omit<Diary, 'id'>;