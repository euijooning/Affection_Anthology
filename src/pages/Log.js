import React from 'react'
import { useParams } from 'react-router-dom';

const Log = () => {

  const {id} = useParams();
  console.log(id);

  return (
    <div>
      <h1>Log</h1>
      <p>This is Log(Diary Detail) page</p>
    </div>
  )
}

export default Log;
