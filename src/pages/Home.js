import React, { useState } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";

const Home = () => {
  const [nowDate, setNowDate] = useState(new Date());
  // console.log(nowDate);

  const headText = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;

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
    </div>
  );
};

export default Home;
