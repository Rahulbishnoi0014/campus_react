import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import pic1 from "../images/plant5.png"

const Signin = () => {

  const navigate = useNavigate();

  const [user, setuser] = useState({
    username: "", password: ""
  })

  const [err, seterr] = useState("");

  const handeler = (e) => {
    e.preventDefault();

    let name, value;

    name = e.target.name;
    value = e.target.value;

    console.log(name + " " + value);

    setuser({ ...user, [name]: value })
  }

  const postdata = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    const res = await fetch("/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    if (res.status !== 200) {
      if (res.status === 404)
        seterr("User not found !");
      else
        seterr("failed to signin");


    } else {
      seterr("sucessfully login");

      navigate("/");

    }

  }

  return (
    <>
      <div className='spaceSection box1'>

        <div className='signupimgsec center'>

          <img className='' src={pic1} alt='user profile' />
          {/* <img className='' src={pic} alt='user profile image' />  */}



        </div>
        <form className='loginCard' method='post'>

          <div className="heading center">
            <Link className="navbar-title rgb" to="/">CAMPUS</Link>

            <p>Login to your Account</p>
            <p style={{ color: "red" }}>{err}</p>

          </div>

          <div className='flexwrapcentercol'>

            <input id="username" type="text" placeholder="Username" name="username" maxlength="13" minlength="3" value={user.username} onChange={handeler} />
            <input id="pass" type="password" placeholder="Password" name="password" value={user.password} onChange={handeler} />

            <div className="center" >
              <p>Create new account ! <Link to="/signup" className='lbutton'>sign up </Link></p>
              <p>Already Signed in ! <Link to="/" className='lbutton'>HOME</Link></p>

              <button className="submitbutton rgb" onClick={postdata}>Sign in</button>
              <hr className="" />

            </div>

          </div>

        </form>
      </div>


    </>
  )
}

export default Signin