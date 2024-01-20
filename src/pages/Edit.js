import React from 'react'
import { useSearchParams } from 'react-router-dom';

const Edit = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id :" + id);

  const mode = searchParams.get("mode");
  console.log("mode : " + mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>This is Edit page</p>
      <button onClick={() => setSearchParams({who : "newjeans"})}> 쿼리스트링 변경 </button>
    </div>
  );
};

export default Edit;
