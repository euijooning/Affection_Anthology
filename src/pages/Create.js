import React from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div>
     <MyHeader 
      headText={"일기 작성하기"}
      leftChild={
        <MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />
      }
     /> 
    </div>
  );
};

export default Create;
