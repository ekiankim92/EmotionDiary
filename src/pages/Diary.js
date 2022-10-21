import { useParams } from "react-router";

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <h1>Diary</h1>
      <p>This is diary</p>
    </>
  );
};
export default Diary;
