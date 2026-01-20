import { type Diary } from "../types";

function DiaryEntry(props: { diary: Diary }) {
  const { date, visibility, weather } = props.diary;
  return (
    <div>
      <h3>{date}</h3>
      <div>
        <p>visibility: {visibility}</p>
        <p>weather: {weather}</p>
      </div>
    </div>
  );
}

export default DiaryEntry;