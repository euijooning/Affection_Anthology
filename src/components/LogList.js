import React, { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const LogList = ({ logList }) => {
  // 정렬 기준을 저장할 state
  const [sortType, setSortType] = useState("latest");

  // 최신순 오래된순에 따라서 일기 정렬
  const getProcessedLogList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(logList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedLogList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

LogList.defaultProps = {
  logList: [],
}; // 에러 방지

export default LogList;
