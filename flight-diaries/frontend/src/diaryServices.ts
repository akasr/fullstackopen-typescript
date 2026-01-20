import axios from 'axios';

import { type NewDiary, type Diary } from './types';

const baseURL = 'http://localhost:3000/api/diaries';

async function getDiaries() {
  const diaries = await axios.get<Diary[]>(baseURL);
  return diaries;
}

async function addDiary(diary: NewDiary) {
  const response = await axios.post<NewDiary>(baseURL, diary);
  return response.data;
}

export default {
  getDiaries,
  addDiary
};
