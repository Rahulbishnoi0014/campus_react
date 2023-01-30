import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SubmitPost = (props) => {

  const navigate = useNavigate();

  const [text, settext] = useState({
    secret: ""
  });
  const [count, setcount] = useState(0);
  const [length, setlength] = useState(true);


  const texthandle = (e) => {
    e.preventDefault();

    let value = e.target.value;
    let name = e.target.name;
    console.log(name + " " + value);


    (value.length >= 500) ? setlength(false) : setlength(true);

    settext({ ...text, [name]: value });
    setcount(value.length);

  }

  const postdata = async (e) => {
    e.preventDefault();

    const { secret } = text;

    const res = await fetch("/submit", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ secret })
    })

    if (res.status !== 200) {
      if (res.status == 404) {
        alert("YOU CANNOT POST EMPTY ! write something");
        navigate("/");
      }

      else
        alert("failed to post ");



    } else {
      alert("sucessfully posted");
      settext({...text,secret:"",});
      setcount(0);
      setlength(true);
      navigate("/");

    }


  }

  return (
    <div className="mainsubmit">
      <h1>Create Post</h1>
      <p className="rgb"><i className="fi fi-rr-user"></i> <b>{props.name}</b></p>
      <hr className="rgb" />
      <form className='center' style={{ margin: "0", padding: "0" }} method="post">
        <textarea name="secret" value={text.secret} onChange={texthandle} placeholder="What for today ?" required
          maxlength="500"></textarea>
        <br />
        <p id="charac-count" style={{ color: length ? "green" : "red" }}>{count}/500</p>
        <button className="submitbutton" onClick={postdata}>POST</button>

      </form>

    </div>

  )
}

export default SubmitPost