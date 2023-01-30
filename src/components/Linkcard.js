import React from 'react'
import { Link } from 'react-router-dom'

const Linkcard = () => {
    return (
        <>
    
        <div className='center borr bgcw pad1 martb1'>
    
        <Link className="lbutton" to="/signup"><p>Create New Account</p></Link>
        <Link className="lbutton" to="/events"><p>Events</p></Link>

        <Link className="lbutton" to="/feedback"><p>Feedback</p></Link>
        <Link className="lbutton" to="/contact"><p>Contact</p></Link>

        <Link className="lbutton" to="/join"><p>Join us</p></Link>

        <a className="lbutton" target="_blank" href="https://rahulbishnoi0014.github.io/Rahul-bishnoi/"><p>Developer ❤️</p></a>


 
        
        </div>
    
        </>
    
        )
}

export default Linkcard