import React from "react";

const LogList = ({ logList }) => {
  return (
    <div>
      {logList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

LogList.defaultProps = {
  logList: [],
}; // 에러 방지

export default LogList;
