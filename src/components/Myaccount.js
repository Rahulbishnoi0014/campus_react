import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Myposts from './Myposts';
import Updateuser from './Updateuser';
import Navbar from './Navbar';

import toparrow from "../images/top.png"
import hellouser from "../images/hellouser3.png"


const Myaccount = () => {

    const navigate = useNavigate();

    const [user, setuser] = useState({});
    const [secretslength, setsecretslength] = useState(0);

    const [img, setimg] = useState(null);

    const [err, seterr] = useState("");

    const [update, setupdate] = useState(false);

    const [visible, setVisible] = useState(false);

    const [refreshkey, setrefreshkey] = useState(0);


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
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    const clicked = () => {
        setrefreshkey(refreshkey+1)
        setupdate(!update);
    }

    const getData = async () => {
        try {

            const res = await fetch("/userinfo", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            const userdata = await res.json();

            console.log(userdata);

            setuser(userdata);
            setsecretslength(userdata.secrets.length);

            if (res.status !== 200)
                if (res.status === 401)
                    navigate("/signin");



        }
        catch (err) {

            console.log(err)
            seterr("error occur");
            navigate("/signin");


        }

    }


    const imghandle = (e) => {
        console.log(e.target.file)
        setimg(e.target.file);
    }

    const postimg = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData();

            data.append('image', img);

            console.log(data);
            const res = await fetch("/uploadProfilePic", {

                method: 'POST',
                Accept: 'application/json',
                headers: {
                    "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundary2lZSUsxEA3X5jpYD",
                    "Connection": "keep-alive"

                },



                body: data
            });


            // const res=await axios.post("/uploadProfilePic", data, { headers: {'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundary2lZSUsxEA3X5jpYD'}})

            if (res.status !== 200)
                seterr("failed to upload Image res");

            else
                seterr("sucessfully uploaded");



        }
        catch (err) {
            console.log(err);
            seterr("failed to upload Image catch");
        }


    }


    useEffect(() => {
        getData();
    }, [refreshkey]);

    return (
        <>
            <Navbar />

            <h4>{err}</h4>

            <div className='box1 spaceSection'>
                <div className='center'>
                    {/* {user.profilePic ? <img className='imgsec borr' src={user.profilePic} alt='user profile image' /> : <img className='imgsec borr' src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60' alt='user profile pic' />} */}

                    <img className='imgsec borr' src={hellouser} alt='user profile' /> 
                   
                    <Link className='lbutton updatelink' onClick={clicked}>{!update ? <p>update info</p> : <p className="text-danger updatelink">C A N C L E</p>}</Link>



                    <div className='center ' >
                        {/* <input style={{ display: update ? "block" : "none" }} className='imguploadinput' type="file" id="image" name="image" placeholder="select Image" onChange={imghandle} />
                        <button style={{ display: update ? "block" : "none" }} class="btn btn-primary" onClick={postimg}>upload</button>
 */}

                    </div>

                </div>

                <div className='userinfo cardborder'>
                    <div className='infocard cardborder' style={{ display: !update ? "block" : "none" }}>

                        <p title='U S E R N A M E' className='rgb'><b>@ {user.username}</b></p>

                        <p><b className='rgb'>firstname :</b> {user.firstname}</p>
                        <p><b className='rgb'>lastname :</b> {user.lastname}</p>
                        <p><b className='rgb'>email :</b> {user.email}</p>
                        <p><b className='rgb'>phone :</b> {user.phone}</p>

                        <hr></hr>

                        <p className='rgb'><b>S E C R E T S : {secretslength}</b></p>




                    </div>


                    <Updateuser dis={update} />
                </div>



            </div>
            <br /><br />

            <div className='center'>
                <h1 className='coheading'>MY POSTS</h1>

            </div>
            <div className='spaceSection box1' >
                <Myposts />
            </div>




            <div title='On Top' className='ontop' onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} >
                <img height="50" src={toparrow} alt="top arrow"></img>
            </div>


        </>
    )
}

export default Myaccount