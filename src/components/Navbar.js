import React from 'react'
import { Outlet, Link } from "react-router-dom";



const Navbar = () => {
    return (
        <>

            <nav className="navbar navbar-expand-lg ">

                <Link className="navbar-title rgb" to="/">CAMPUS</Link>

                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav ml-auto navitem">
                        <li className="nav-item" >
                            <Link className="nav-link" to="/"><p>Home</p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events"><p>Events</p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/myaccount"><p>My Account</p></Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/logout" ><p>Sign Out</p></Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/signup"><p>Sign Up</p></Link>
                        </li> */}

                    </ul>

                </div>
            </nav>




            <Outlet />
        </>
    )
}

export default Navbar