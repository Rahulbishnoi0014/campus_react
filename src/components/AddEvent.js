import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AddEvent = () => {

    const navigate = useNavigate();

    const [event, setevent] = useState({
        name: "", eventby: "", eventdatestart: "", eventdateend: "", eventtimefrom: "", eventtimeupto: "", discription: ""
    });

    const [err, seterr] = useState("");
    const [disable, setdisable] = useState(false);





    const handler = (e) => {
        e.preventDefault();
        var value = e.target.value;
        var name = e.target.name;

        console.log(name + "  " + value)

        setevent({ ...event, [name]: value })
    }

    const postdata = async (e) => {

        e.preventDefault();

        setdisable(true);


        const { name, eventby, eventdatestart, eventdateend, eventtimefrom, eventtimeupto, discription } = event;

        const res = await fetch("/addevent", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"

            },
            body: JSON.stringify({ name, eventby, eventdatestart, eventdateend, eventtimefrom, eventtimeupto, discription })

        });




        if (res.status === 200) {

            seterr("sucessfully added");


            setTimeout(() => {
                setdisable(false);

                navigate("/events");

            }, 2000);

        } else {
            setdisable(false);

            if (res.status === 422) {
                seterr("fill correct date and time")
            }
            if (res.status === 204) {
                console.log(res);
                seterr("fill all inputs")
            }


        }


    }



    return (

        <>
            <div className='spaceSection center'>
                <form className='loginCard' method='post'>

                    <div className="heading center">
                        <Link className="navbar-title rgb" to="/">CAMPUS</Link>

                        <p>Add new event</p>
                        <p style={{ color: "red" }}>{err}</p>


                    </div>

                    <div className='flexwrapcentercol mainsubmit'>

                        <input id="eventname" name="name" type="text" placeholder="Event Name" value={event.name} onChange={handler} required maxLength="15" minLength="3" />

                        <input id="eventby" name="eventby" type="text" placeholder="Event By" value={event.eventby} onChange={handler} required maxLength="20" minLength="3" />

                        <div className='datetimesec'>


                            <div className='datetimebox'>
                                <label htmlFor="eventdatestart">Start Date</label>
                                <input type="date" id="eventdatestart" name="eventdatestart" value={event.eventdatestart} onChange={handler} source="time" />

                                <label htmlFor="eventtimefrom">Start Time</label>
                                <input type="time" id="eventtimefrom" name="eventtimefrom" value={event.eventtimefrom} onChange={handler} />

                            </div>

                            <div className='datetimebox'>
                                <label htmlFor="eventdateend">End on Date</label>
                                <input type="date" id="eventdateend" name="eventdateend" value={event.eventdateend} onChange={handler} min={event.eventdatestart} />

                                <label htmlFor="eventtimeupto">Time upto</label>
                                <input type="time" id="eventtimeupto" name="eventtimeupto" value={event.eventtimeupto} onChange={handler} />

                            </div>



                        </div>


                        <label htmlFor='eventdiscription' >Discription</label>
                        <textarea id="eventdiscription" name="discription" value={event.discription} onChange={handler} placeholder="tell something about event" required
                            maxLength="500"></textarea>

                        <div className='box1'>
                            <button disabled={disable} className="submitbutton rgb" onClick={postdata}>P O S T</button>

                            <button className="submitbutton rgb" onClick={() => navigate("/events")}>GO BACK</button>


                        </div>

                        <hr />



                    </div>

                </form>
            </div>
        </>


    )
}

export default AddEvent