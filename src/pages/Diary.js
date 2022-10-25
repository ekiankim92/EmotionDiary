import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const onClickBack = () => {
    navigate(-1);
  };

  const onClickEdit = () => {
    navigate(`/edit/${data.id}`);
  };

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (el) => parseInt(el.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("Not a valid diary");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">It's loading...</div>;
  } else {
    const currentEmotionData = emotionList.find(
      (el) => parseInt(el.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} details`}
          leftChild={<MyButton text={"< Back"} onClick={onClickBack} />}
          rightChild={<MyButton text={"Edit"} onClick={onClickEdit} />}
        />
        <article>
          <section>
            <h4>Today's emotion</h4>
            <div className="diary_img_wrapper">
              <img src={currentEmotionData.emotion_img} alt="emotion" />
            </div>
          </section>
        </article>
      </div>
    );
  }
};
export default Diary;
