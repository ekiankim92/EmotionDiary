import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MyButton from "./MyButton";
import { useNavigate } from "react-router";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "Latest" },
  { value: "oldest", name: "Oldest" },
];

const filterOptionList = [
  { value: "all", name: "All" },
  { value: "good", name: "Good emotions" },
  { value: "bad", name: "Bad emotions" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {optionList.map((el) => (
        <option key={uuidv4()} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((el) => filterCallBack(el));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  const onClickNewDiary = () => {
    navigate("/new");
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_column">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_column">
          <MyButton
            text={"Write new diary"}
            type={"positive"}
            onClick={onClickNewDiary}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((el) => (
        <DiaryItem key={uuidv4()} {...el} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
