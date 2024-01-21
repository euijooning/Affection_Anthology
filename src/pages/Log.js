import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LogStateContext } from "../App";
import { getStringDate } from "../util/date";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";


const Log = () => {
  const { id } = useParams();
  const logList = useContext(LogStateContext);
  const navigate = useNavigate();

  // 일기가 존재할 때는 state로 할당 받아주면 된다.
  const [data, setData] = useState();

  useEffect(() => {
    if (logList.length >= 1) {
      const targetLog = logList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetLog);
      if(targetLog) { // 일기 존재 시
        setData(targetLog);        
      } else { // 일기 없을 때
        alert("존재하지 않는 기록입니다.")
        navigate('/', {replace: true})
      }
    }
  }, [id, logList]);

  if(!data) {
    return <div className="LogPage">로딩 중입니다...</div>
  } else {
    return <div className="LogPage">
      <MyHeader 
        headText={`${getStringDate(new Date(data.date))} 의 기록`} 
        leftChild={
          <MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />
        }
        rightChild={
          <MyButton text={"수정"} onClick={() => navigate(`/edit/${data.id}`)} />
        }
      />
    </div>;

  }

  
};

export default Log;
