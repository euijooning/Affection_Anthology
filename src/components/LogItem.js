import React from "react";

const LogItem = ({ id, emotion, content, date }) => {
  // 혹시 모르니 예외처리
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <div className="LogItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")} // 공백 한 칸 띄워주고 구분
      >
        {/* 여기 이미지 */}
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LogItem;
