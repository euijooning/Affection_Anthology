import React, { useState } from "react";
import MyHeader from "./../components/MyHeader"

const Home = () => {
  const [nowDate, setNowDate] = useState(new Date());
  console.log(nowDate);

  const headText = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`

  return <div>
    <MyHeader headText={headText} />
  </div>;
};

export default Home;
