import { useNavigate } from "react-router";
import { useContext, useRef, useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotion_descript: "Perfect",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotion_descript: "Good",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotion_descript: "So-so",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotion_descript: "Awful",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotion_descript: "Terrible",
  },
];

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate } = useContext(DiaryDispatchContext);

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onChangeDate = (event) => {
    setDate(event.target.value);
  };

  const onClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onClickSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"Write new diary"}
        leftChild={<MyButton text={"< Back"} onClick={onClickGoBack} />}
      />
      <div>
        <section>
          <h4>Which date?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={onChangeDate}
            />
          </div>
        </section>
        <section>
          <h4>Today's emotion</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((el) => (
              <EmotionItem
                key={el.emotion_id}
                {...el}
                onClickEmotion={onClickEmotion}
                isSelected={el.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>Today's diary</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="How was your day?"
              ref={contentRef}
              value={content}
              onChange={onChangeContent}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"Cancel"} onClick={onClickGoBack} />
            <MyButton
              text={"Submit"}
              type={"positive"}
              onClick={onClickSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;
