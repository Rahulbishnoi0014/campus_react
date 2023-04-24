import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import toparrow from "../images/top.png"
import EventCard from './EventCard';
import Loading from './Loading';


const Events = () => {

    const navigate = useNavigate();

    const [event, setevent] = useState([]);
    const [admin, setadmin] = useState([]);

    const [err, seterr] = useState("");

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);


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



    const getData = async () => {
        try {

            const res = await fetch("/events", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            // console.log(res);
            setevent(await res.json());

            const adminuser = await fetch("/isadmin", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            const admindata = await adminuser.json();

            // console.log(admindata);

            setadmin(admindata);
            setLoading(false);




            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");
                seterr("failed to fetch Event data");
            }
            else {
                seterr("");


            }



        }
        catch (err) {

            console.log(err)
            seterr("failed to fetch Event data");


        }

    }

    const datetime = (x) => {
        x = new Date(x);


        var hours = x.getUTCHours(),
            minutes = x.getUTCMinutes(),
            ampm = 'am';

        if (hours === 12) {
            ampm = 'pm';
        } else if (hours === 0) {
            hours = 12;
        } else if (hours > 12) {
            hours -= 12;
            ampm = 'pm';

            if (minutes < 10) {
                minutes = "0" + minutes

            }
        }



        const datetimestr = x.getUTCDate() + "-" + `${x.getUTCMonth() + 1}` + "-" + x.getUTCFullYear() + " | " + hours + ':' + minutes + ' ' + ampm
        return datetimestr
    }

    useEffect(() => {
        getData();
    }
        , []);



    return (

        <>
            <Navbar />
            <div className='flexwrapcentercol pad1'>


                <div className=' center'>
                    <h1 className='coheading'>E V E N T S</h1>

                    {admin.admin === true ? <Link className='rgb' to={"/addevent"}>Add event</Link> : <p>Contact Admin to add events</p>}

                    {err === "" ? <p></p> : <p>{err}</p>}
                    {event.length > 0 ? null : <h1 className='center'>NO EVENT TO SHOW</h1>}

                    <h4 className='coheading1'>T O T A L <br /><span className='rgb'> E V E N T S  : {event.length}</span></h4>
                </div>


                <div className='spaceSection box1'>
                    {event.map((curr, index) => {

                        return (
                            <>
                                <EventCard curr={curr} index={index} datetime={datetime}></EventCard>
                                

                            </>
                        )

                    })}
                </div>

                {loading && <Loading/>}







            </div>

            <div title='On Top' className='ontop' onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} >
                <img height="50" src={toparrow} alt="top arrow"></img>
            </div>

        </>


    )
}

export default Events