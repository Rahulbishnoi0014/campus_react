import React from 'react'
import { Link } from 'react-router-dom'

import hellouser from "../images/plant4.png"

const Profilecard = (props) => {
    return (
        <div className='borr bgcw pad1 martb1'>
            <br />
            <h1 className="username">{props.username}

            <img className=' borr' style={{float:"right",height:"100px",zIndex:"-1"}} src={hellouser} alt='user profile' /> 

</h1>
            <p className="fullname"><i className="fi fi-rr-user"></i>
                {props.firstname}
                {props.lastname}
            </p>

            <div className="box">

                <p><i className="fi fi-rr-paper-plane"></i> <b>Total posts</b></p>
                <p className='padleft1' >{props.secretsLength}</p>

                <p><i className="fi fi-rr-info"></i> <b>Full Name</b></p>
                <p className='padleft1' >{props.firstname} {props.lastname}</p>

                <p><i className="fi fi-rr-phone-call"></i> <b>Phone</b></p>
                <p className='padleft1' >{props.phone} </p>
                <p><i className="fi fi-rr-phone-call"></i> <b>Email</b></p>
                <p className='padleft1' >{props.email} </p>

                <br />
                
                <Link className="lbutton center" to="/myaccount" role="button">My Account</Link>

                

            </div>

        </div>
            )
}
export default Profilecard