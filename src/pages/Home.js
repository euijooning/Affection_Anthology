import React, { useContext, useEffect, useState } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import LogList from "../components/LogList";
import { LogStateContext } from "../App";

const Home = () => {
  const logList = useContext(LogStateContext);

  const [data, setData] = useState([]);
  const [nowDate, setNowDate] = useState(new Date());
  const headText = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;

  useEffect(() => {
    if (logList.length >= 1) {
      // 먼저 현재 연도와 월의 가장 첫번째 날짜를 구한다.
      const firstDay = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        1 // 가장 첫번째 날짜
      ).getTime();

      const lastDay = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        0, // 가장 마지막 날짜
        23,
        59,
        59
      ).getTime();

      setData(
        logList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [logList, nowDate]); // 추가

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setNowDate(
      new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setNowDate(
      new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <LogList logList={data} />
    </div>
  );
};

export default Home;
