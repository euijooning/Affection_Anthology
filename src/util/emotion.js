// 여기도 혹시 모르니 예외처리
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const emotionList = [
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