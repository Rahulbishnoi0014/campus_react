import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Updateuser = (props) => {

  const navigate = useNavigate();

  const [user, setuser] = useState({
    firstname: "", lastname: "", email: "", phone: ""
  })

  const [err, seterr] = useState("");


  const tostconfig = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const notifyErr = (text) => toast.error(text,tostconfig);
  const notifySuc = (text) => toast.success(text,tostconfig);
  const notifyWar = (text) => toast.warning(text,tostconfig);

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

    const { firstname, lastname, email, phone } = user;

    const res = await fetch("/updateUserInfo", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstname, lastname, email, phone })

    })

    if (res.status !== 200) {
      if (res.status === 422){
        seterr("Fill all the fields !");

        notifyWar("Fill all the fields !")
      
      }
      
      else if (res.status === 404){
        seterr("Not a valid user !");
        notifyWar("Not a valid user !")
      
      }




      else {
        console.log(res.status);
        seterr("something went wrong");

        notifyErr("something went wrong !")

        navigate("/error");
      }


    } else {
      seterr("sucessfully U P D A T E D ");

      notifySuc("sucessfully U P D A T E D ");

      navigate("/myaccount");

    }

  }

  return (



    <>
      <form className='infocard cardborder' style={{ display: props.dis ? "block" : "none" }} method='post'>

        <div className=" center">

          <h4>Update user info</h4>
          <h5 style={{ color: "red" }}>{err}</h5>


        </div>

        <div className='flexwrapcentercol'>

          <input type="text" placeholder="Firstname" name="firstname" maxLength="13" minLength="3" value={user.firstname} onChange={handeler} />
          <input type="text" placeholder="Last Name" name="lastname" value={user.lastname} onChange={handeler} />



          <input type="email" placeholder="Email" name="email" required value={user.email} onChange={handeler} />
          <input type="tel" placeholder="Phone no." name="phone" maxLength="12" minLength="10" value={user.phone} onChange={handeler} />



          <div className="center" >

            <button className="submitbutton rgb" onClick={postdata}>update</button>
            {/* <Link className="btn btn-danger " to="/myaccount" >cancle</Link> */}


          </div>

        </div>

        <ToastContainer></ToastContainer>

      </form>
    </>
  )
}

export default Updateuser