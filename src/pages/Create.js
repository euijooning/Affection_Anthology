import React from "react";
import LogEditor from "../components/LogEditor";
import { useEffect } from "react";

const Create = () => {
  // 페이지마다 다른 타이틀 만들게 하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `정감문집 - 기록 남기기`;
  }, []);

  return (
    <div>
      <LogEditor />
    </div>
  );
};

export default Create;
