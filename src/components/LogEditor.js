import React from "react";
import { useState, useRef } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

// 여기도 혹시 모르니 예외처리
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_description: "매우 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_description: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_description: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_description: "조금 안좋음",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_description: "매우 나쁨",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const LogEditor = () => {
  const navigate = useNavigate(getStringDate(new Date()));

  // input_box의 날짜를 핸들링할 state
  const [date, setDate] = useState();

  // 클릭 이벤트를 처리할 state
  const [emotion, setEmotion] = useState(3); // 보통 상태를 일단 디폴트로
  // 감정을 클릭했을 때 작업을 수행할 함수도 생성
  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  // 오늘의 기록을 매핑할 state
  const [content, setContent] = useState("");
  const contentRef = useRef();

  return (
    <div className="LogEditor">
      <MyHeader
        headText={"일기 작성하기"}
        leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘 날짜는?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 기록</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 겪었던 이런저런 이야기를 남겨주세요!"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogEditor;
