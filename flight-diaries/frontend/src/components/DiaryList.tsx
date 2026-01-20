import DiaryEntry from './Diary';
import { type Diary } from '../types';

function DiaryList(props: { diaries: Diary[] }) {
  return (
    <section>
      <h2>Diary Entries</h2>
      {props.diaries.map((d) => (
        <DiaryEntry diary={d} key={d.id} />
      ))}
    </section>
  );
}

export default DiaryList;
