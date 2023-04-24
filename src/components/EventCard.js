import React, { useState } from 'react'



const EventCard = (props) => {

    const [buttonpopup, setpopup] = useState(false);

    return (

        <>
            <div key={props.index} className="eventCard">

                <div className='imgsec center'>
                    <h1>E v e n t</h1>
                </div>


                <div className='eventdetails'>
                    <h1 className='eventname rgb'>{props.curr.name}</h1>

                    <div className='timesec'>
                        <p className='eventtime'>From :- {props.datetime(props.curr.eventstart)}</p>
                        {/* <p className='eventtime'>- to -</p> */}
                        <p className='eventtime'>To :- {props.datetime(props.curr.eventend)}</p>
                    </div>


                    <p className='eventby'>By:- {props.curr.eventby}</p>

                    <p className='eventdis'>

                        {buttonpopup ? <span >{props.curr.discription}</span> : <span>{props.curr.discription.slice(0, 20)}...</span>}

                        <span className='rgb' style={{ cursor: "pointer" }} onClick={() => setpopup(!buttonpopup)}>

                            {!buttonpopup ? <i> More </i> : <i> Less</i>}

                        </span></p>


                </div>




            </div>

            
        </>


    );
}

export default EventCard