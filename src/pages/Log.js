import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LogStateContext } from "../App";
import { getStringDate } from "../util/date";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";

const Log = () => {
  const { id } = useParams();
  const logList = useContext(LogStateContext);
  const navigate = useNavigate();

  // 일기가 존재할 때는 state로 할당 받아주면 된다.
  const [data, setData] = useState();

  // 페이지마다 다른 타이틀 만들게 하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `정감문집 - ${id}번째 기록`;
  }, []);

  useEffect(() => {
    if (logList.length >= 1) {
      const targetLog = logList.find((it) => parseInt(it.id) === parseInt(id));
      console.log(targetLog);
      if (targetLog) {
        // 일기 존재 시
        setData(targetLog);
      } else {
        // 일기 없을 때
        alert("존재하지 않는 기록입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, logList]);

  if (!data) {
    return <div className="LogPage">로딩 중입니다...</div>;
  } else {
    const nowEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(nowEmotionData);

    return (
      <div className="LogPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 의 기록`}
          leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={"수정"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "log_img_wrapper",
                `log_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={nowEmotionData.emotion_img} />
              <div className="emotion_description">
                {nowEmotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 기록</h4>
            <div className="log_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Log;
