import React from "react";
import { useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
};
  

const LogEditor = () => {
  const navigate = useNavigate(getStringDate(new Date()));

  // input_box의 날짜를 핸들링할 state
  const [date, setDate] = useState();
    return (
        <div className="LogEditor">
          <MyHeader
            headText={"일기 작성하기"}
            leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
          />
          <div>
            <h4>오늘 날짜는?</h4>
            <div className="input_box">
              <input
                className="input_date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      );
};

export default LogEditor;
