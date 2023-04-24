import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Totalpost = () => {

  const navigate = useNavigate();

  const [postcount, setpostcount] = useState(0);
  const [usercount,setusercount]=useState(0);
  const [err, seterr] = useState("");
  const [refreshkey, setrefreshkey] = useState(0);


  setTimeout(() => {
    setrefreshkey(refreshkey + 1);
  }, 7000)

  const getData = async () => {
    try {

      const postdata = await fetch("/postsTotal", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        credentials: "include"
      });

      const userdata = await fetch("/usersTotal", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        credentials: "include"
      });


      const users=await userdata.json();

      setusercount(users.count);


      const postData = await postdata.json();
      

      setpostcount(postData.count);



      if (postdata.status !== 200) {
        if (postdata.status === 401)
          navigate("/signin");
        else
          seterr("server error")
      }




    }
    catch (err) {

      console.log(err)
      seterr("failed to fetch");

      // navigate("/signin");


    }

  }


  useEffect(() => {
    getData();
  }, [refreshkey])

  return (
    <>

      <div className=' borr bgcw pad1'>

        <h6>{err}</h6>

    <h4 className='rgb center'>WEBSITE INFO.</h4>
        <p><b><i className="fi fi-rr-paper-plane"></i> TOTAL POST </b></p>
        <p className='padleft1'> {postcount}</p>
        <p><b><i className="fi fi-rr-users"></i> TOTAL USER </b></p>
        <p className='padleft1'>{usercount}</p>
      </div>

    </>

  )
}

export default Totalpost