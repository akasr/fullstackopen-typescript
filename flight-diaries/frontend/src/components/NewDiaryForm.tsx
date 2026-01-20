import { useState, type SyntheticEvent } from 'react';
import axios from 'axios';

import diaryServices from '../diaryServices';
import {
  type Diary,
  type NewDiary,
  type Visibility,
  type Weather,
  visibilities,
  weathers,
} from '../types';
import { parseVisibility, parseWeather } from '../utils';

function NewDiaryForm(props: {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  diaries: Diary[];
}) {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(visibilities[0]);
  const [weather, setWeather] = useState<Weather>(weathers[0]);
  const [comment, setComment] = useState('');

  const addDiary = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const diaryToAdd: NewDiary = {
        date,
        visibility: parseVisibility(visibility),
        weather: parseWeather(weather),
      };
      if (comment) {
        diaryToAdd.comment = comment;
      }

      diaryServices
        .addDiary(diaryToAdd)
        .then((data: unknown) => {
          props.setDiaries(props.diaries.concat(data as Diary));
          props.setErrorMsg('');
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            props.setErrorMsg(error.response?.data?.slice(22));
          }
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <section>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <span>Visibility</span>
          {visibilities.map((option) => (
            <label key={option}>
              <input
                name="visibility"
                type="radio"
                value={option}
                checked={visibility === option}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <span>Weather</span>
          {weathers.map((option) => (
            <label key={option}>
              <input
                name="weather"
                type="radio"
                value={option}
                checked={weather === option}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            name="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default NewDiaryForm;
