import React, { useCallback, useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import EmotionItem from "./EmotionItem";
import { LogDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

const LogEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  // input_box의 날짜를 핸들링할 state
  const [date, setDate] = useState(getStringDate(new Date()));

  // 클릭 이벤트를 처리할 state
  const [emotion, setEmotion] = useState(3); // 보통 상태를 일단 디폴트로
  // 감정을 클릭했을 때 작업을 수행할 함수도 생성
  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  // 오늘의 기록을 매핑할 state
  const contentRef = useRef();
  const [content, setContent] = useState("");

  // useContext 사용해서 onCreate하고 연동을 시켜줘야 저장이 되니까.
  // 수정 때문에 onEdit, 삭제 때문에 onRemove 도 받아온다!
  const { onCreate, onEdit, onRemove } = useContext(LogDispatchContext);
  // 가장 아래 버튼 입력 처리할 함수
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // 수정인지 아닌지를 확인 <= 추가한 사항
    if (
      window.confirm(
        isEdit ? "수정하시겠습니까?" : "새로운 기록을 남기시겠습니까?"
      )
    ) {
      if (!isEdit) {
        // 수정중이 아닐 때
        onCreate(date, content, emotion); // 새 기록 생성
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id); // => targetId 에 해당.
      navigate("/", { replace: true }); // 삭제 완료되면 홈으로 보내고, 뒤로가기 금지
    }
  };

  // 수정 시 작동
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="LogEditor">
      <MyHeader
        headText={isEdit ? "기록 수정하기" : "기록 남기기"}
        leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
        rightChild={isEdit && <MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} />}
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
        <section>
          <div className="control_box">
            <MyButton
              text={"저장하기"}
              type={"positive"}
              onClick={handleSubmit}
            />
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogEditor;
