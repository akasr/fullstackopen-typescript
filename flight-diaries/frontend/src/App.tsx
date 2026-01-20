import { useEffect, useState } from 'react';

import diaryServices from './diaryServices';
import { type Diary } from './types';

import Error from './components/Error';
import NewDiaryForm from './components/NewDiaryForm';
import DiaryList from './components/DiaryList';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await diaryServices.getDiaries();
      setDiaries(response.data);
    };
    fetchDiaries();
  }, []);

  return (
    <main>
      {
        errorMsg
          ? <Error errorMsg={errorMsg} />
          : <></>
      }
      <NewDiaryForm setDiaries={setDiaries} diaries={diaries} setErrorMsg={setErrorMsg}/>
      <DiaryList diaries={diaries} />
    </main>
  );
}

export default App;
