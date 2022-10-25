import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClickEmotion,
  isSelected,
}) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={() => onClickEmotion(emotion_id)}
    >
      <img src={emotion_img} alt="emotion faces" />
      <span>{emotion_descript}</span>
    </div>
  );
};
export default React.memo(EmotionItem);
