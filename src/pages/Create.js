import React, { useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};


const Create = () => {
  const navigate = useNavigate(getStringDate(new Date()));

  // input_box의 날짜를 핸들링할 state
  const [date, setDate] = useState();

  return (
    <div>
      <MyHeader
        headText={"일기 작성하기"}
        leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
      />
      <div>
        <h4>오늘 날짜는?</h4>
        <div className="input-box">
          <input
            className="input-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
