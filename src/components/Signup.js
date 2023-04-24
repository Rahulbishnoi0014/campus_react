import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import pic0 from "../images/table1.png"

import pic2 from "../images/heart2.png"



const Signup = () => {


  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "", lastname: "", email: "", username: "", phone: "", password: ""
  });

  let [errm, setErrm] = useState("");
  


  const handeler = (e) => {
    e.preventDefault();

    let name, value
    name = e.target.name
    value = e.target.value



    console.log(name + " : " + value);

    setUser({ ...user, [name]: value })

  }


  const postdata = async (e) => {
    e.preventDefault();

    // console.log(user);

    const { firstname, lastname, email, username, phone, password } = user

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname, lastname, email, username, phone, password
      })
    });

    // console.log(res);

    if (res.status !== 200) {
      if (res.status === 403)
        setErrm("user already exist with this username");
      else if (res.status === 422)
        setErrm("fill all the fields");
      else

        setErrm("failed to register");


    } else {
      setErrm("sucessfully register");

      navigate("/signin");

    }

  }






  return (
    <>
      <div className="spaceSection box1">

<div className='signupimgsec center'>

<img className='pic1'  src={pic2} alt='user profile ' /> 
<img className='' src={pic0} alt='user profile ' /> 



</div>

        <form className="loginCard" method="post">

          <div className="heading center">
          <Link className="navbar-title rgb" to="/">CAMPUS</Link>

            <h1>Create a new account</h1>
            <p>It's quick and easy.</p>

            <p style={{ color: "red" }}>{errm}</p>
          </div>

          <div className="inputbody">

          


            <div className="formbox flexwarpcentercol">

              <h3>Login credentials</h3>

              <input type="text" placeholder="Username" name="username" value={user.username} onChange={handeler} maxlength="13" minlength="3" required />
              <input type="password" placeholder="Password" name="password" value={user.password} onChange={handeler} required />

      

              <div className="flexwrapcenter">
                {/* <input type="checkbox" onclick="visible()" ><p>Show Password</p></input> */}

              </div>



            </div>

            <div className="formbox flexwarpcentercol">

              <h3>Personal Information</h3>

              <input type="text" placeholder="First Name" name="firstname" required value={user.firstname} onChange={handeler} />
              <input type="text" placeholder="Last Name" name="lastname" value={user.lastname} onChange={handeler} />

              <input type="email" placeholder="Email" name="email" required value={user.email} onChange={handeler} />
              <input type="tel" placeholder="Phone no." name="phone" maxlength="12" minlength="10" value={user.phone} onChange={handeler} />

            </div>




          </div>




          <div className="center" >
          <p>You are agree with our T & C if you are creating account ! <Link to="" className='lbutton'>T & C</Link></p>

          <p>Already have an account ! <Link to="/signin" className='lbutton'>sign in </Link></p>
          <p>Already Signed in ! <Link to="/" className='lbutton'>HOME</Link></p>

            <button className="submitbutton rgb" onClick={postdata}>Sign Up</button>
            <hr className="" />

          </div>

        </form>

      </div>
    </>
  )
}

export default Signup