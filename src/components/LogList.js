import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const emotionOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const LogList = ({ logList }) => {
  const navigate = useNavigate();
  // 정렬 기준을 저장할 state(시간순)
  const [sortType, setSortType] = useState("latest");

  // 감정 상태별 정렬 기준을 저장할 state
  const [emotionFilter, setEmotionFilter] = useState("all");

  // 최신순 오래된순에 따라서 일기 정렬 + 필터링
  const getProcessedLogList = () => {
    const filterCallBack = (item) => {
      if (emotionFilter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(logList));
    //이부분에서 필터된 리스트
    const filteredList =
      emotionFilter === "all"
        ? copyList
        : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare); // 이것도 변경
    return sortedList;
  };

  return (
    <div className="LogList">
      <div className="menu_wrapper">
        <div className="left_column">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={emotionFilter}
            onChange={setEmotionFilter}
            optionList={emotionOptionList}
          />
        </div>
        <div className="right_column">
          <MyButton
            type={"positive"}
            text={"일기 작성하기"}
            onClick={() => navigate("/create")}
          />
        </div>
      </div>

      {getProcessedLogList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

LogList.defaultProps = {
  logList: [],
}; // 에러 방지

export default LogList;
