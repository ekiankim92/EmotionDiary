import MyButton from "./MyButton";
import { useNavigate } from "react-router";

const DiaryItem = ({ id, emotion, content, date }) => {
  const diaryDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`diary/${id}`);
  };

  const onClickEdit = () => {
    navigate(`edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={require(`../assets/emotion${emotion}.png`)} alt="" />
      </div>
      <div className="info_wrapper" onClick={onClickDetail}>
        <div className="diary_date">{diaryDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"Edit"} onClick={onClickEdit} />
      </div>
    </div>
  );
};
export default DiaryItem;
