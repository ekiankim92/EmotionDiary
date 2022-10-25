import { useNavigate } from "react-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onChangeDate = (event) => {
    setDate(event.target.value);
  };

  const onClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onClickSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "Would you like to edit your diary?"
          : "Would you like to write a new diary?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const onClickDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "Edit Diary" : "Write new diary"}
        leftChild={<MyButton text={"< Back"} onClick={onClickGoBack} />}
        rightChild={
          isEdit && (
            <MyButton
              text={"Delete"}
              type={"negative"}
              onClick={onClickDelete}
            />
          )
        }
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
