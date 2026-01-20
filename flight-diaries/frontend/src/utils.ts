import {
  type Visibility,
  type Weather,
  weathers,
  visibilities,
} from './types';

const isWeather = (text: unknown): text is Weather => {
  return typeof text === 'string' && weathers.includes(text as Weather);
};
const isVisibility = (text: unknown): text is Visibility => {
  return typeof text === 'string' && visibilities.includes(text as Visibility);
};

export const parseWeather = (weather: unknown): Weather => {
  if(!isWeather(weather)) {
    throw new Error('Incorrect Weather');
  }

  return weather;
};

export const parseVisibility = (visibility: unknown): Visibility => {
  if (!isVisibility(visibility)) {
    throw new Error('Incorrect visibility');
  }

  return visibility;
}