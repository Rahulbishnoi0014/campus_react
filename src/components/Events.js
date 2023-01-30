import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import toparrow from "../images/top.png"


const Events = () => {

    const navigate = useNavigate();

    const [event, setevent] = useState([]);
    const [refreshkey, setrefreshkey] = useState(0);
    const [err, seterr] = useState("");

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
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    setTimeout(() => {
        setrefreshkey(refreshkey + 1);
    }, 5000)

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

            const eventsdata = await res.json();

            setevent(eventsdata)


            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");
                seterr("cannot get  E V E N T  data");
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

    useEffect(() => {
        getData();
    }
        , [refreshkey]);


    return (

        <>
            <Navbar />
            <div className='flexwrapcentercol pad1'>


                <div className=' center'>
                    <h1 className='coheading'>E V E N T S</h1>
                    {err === "" ? <p></p> : <p>{err}</p>}
                    {event.length > 0 ? <h1></h1> : <h1 className='center'>NO EVENT TO SHOW</h1>}

                    <h4 className='coheading1'>T O T A L <br /><span className='rgb'> E V E N T S  : {event.length}</span></h4>
                </div>


                <div className='spaceSection box1'>
                    {event.map((curr, index) => {

                        return (
                            <>
                                <div key={index} className="eventCard">

                                    <img src={curr.image} alt="event img"></img>


                                    <h1>{curr.name}</h1>
                                    <p>{curr.discription}</p>


                                </div>
                            </>
                        )

                    })}
                </div>






            </div>

            <div title='On Top' className='ontop' onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} >
                <img height="50" src={toparrow} alt="top arrow"></img>
            </div>

        </>


    )
}

export default Events