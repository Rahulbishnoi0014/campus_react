import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Allpost from './Allpost';
import Linkcard from './Linkcard';
import Navbar from './Navbar';
import Profilecard from './Profilecard';

import SubmitPost from './SubmitPost';
import Totalpost from './Totalpost';
import Trending from './Trending';

import toparrow from "../images/top.png"

import trendicon from "../images/trend.png"
import usericon from "../images/user.png"
import statsicon from "../images/stats.png"
import linksicon from "../images/links.png"


const Home = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({});
  const [secretslength, setsecretslength] = useState(0);
  const [refreshkey, setrefreshkey] = useState(0);
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true)
    }
    else if (scrolled <= 500) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
      
    });
  };

  window.addEventListener('scroll', toggleVisible);


  setTimeout(() => {
    setrefreshkey(refreshkey + 1);
  }, 5000)


  const [err, seterr] = useState({
    error: "", iserr: false
  });


  const getData = async () => {
    try {

      const res = await fetch("https://campusapi-r8xp.onrender.com/userinfo", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        credentials: "include"
      });

      const userdata = await res.json();
      setsecretslength(userdata.secrets.length);

      setuser(userdata);

      if (res.status !== 200) {
        if (res.status == 401)
          navigate("/signin");

        seterr({ ...err, error: "cannot fetch user profile data", iserr: false });
      }
      else {
        seterr({ ...err, error: "", iserr: false });


      }
    }




    catch (err) {
      seterr({ ...err, error: "cannot fetch user profile data", iserr: false });

      console.log(err)
      navigate("/signin");


    }

  }

  useEffect(() => {
    getData();
  }, [refreshkey]);



  return (
    <>
      <Navbar />

      <div className='spaceSection center'>

        <div className='phoneview'>

          <div className='box1'>
            {/* <img src={trendicon} className="navbar-toggler " data-toggle="collapse" data-target="#collapsecard1"  aria-controls="collapsecard1" aria-label="Toggle navigation"></img> */}
            
            <img src={trendicon}   data-toggle="collapse" data-target="#collapsecard1"  aria-controls="collapsecard1"></img>
           
            <img src={usericon} data-toggle="collapse" data-target="#collapsecard2"  aria-controls="collapsecard2"></img>
            <img src={statsicon} data-toggle="collapse" data-target="#collapsecard3"  aria-controls="collapsecard3"></img>
            <img src={linksicon} data-toggle="collapse" data-target="#collapsecard4"  aria-controls="collapsecard4"></img>

            


          </div>

          <div className=''>
            <div className="collapse " id="collapsecard1">
              <Trending />
            </div>
            <div className="collapse " id="collapsecard2">
              <Profilecard username={user.username} lastname={user.lastname} firstname={user.firstname} email={user.email} phone={user.phone} secretsLength={secretslength} />
            </div>
            <div className="collapse" id="collapsecard3">
              <Totalpost />

            </div>
            <div className="collapse" id="collapsecard4">
              <Linkcard />
            </div>

          </div>

          <hr></hr>

        </div>


        <div className='home'>
          <div className='left'>

            <Profilecard username={user.username} lastname={user.lastname} firstname={user.firstname} email={user.email} phone={user.phone} secretsLength={secretslength} />



          </div>

          <div className='centerbox center'>

            <div className='top'>
              <SubmitPost name={user.username}></SubmitPost>
            </div>

            <div className='feeds'>
              <Allpost />
            </div>

          </div>

          <div className='right'>


            <Trending />

            <Totalpost />

            <Linkcard />

          </div>
        </div>

      </div>

      <div title='On Top' className='ontop' onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }} >
        <img height="50" src={toparrow} alt="top arrow"></img>
      </div>
    </>

  )
}

export default Home