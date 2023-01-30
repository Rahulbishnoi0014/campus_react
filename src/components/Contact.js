import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Contact = () => {
    return (
        <>
        <Navbar/>
            <div className="box1 spaceSection">
                <div className="contactSection1 pad1">
                    <h1>
                        Let's make something awesome together.
                    </h1>
                    <br />
                    <h1>
                        We'd love to hear from you
                    </h1>


                </div>
                <div className="contactSection2 pad1 mar1">
                    <h2>Drop as a line ,or give us a heads up. If you're intrested in visiting us .</h2>
                    <br />
                    <br />
                    <div className="flexcentercol pad1 mar1">
                        <Link className="social-links " to="mailto:rahulbhadu14@gmail.com">E-Mail</Link>

                        <Link className="social-links" to="https://in.linkedin.com/in/rahul-bishnoi-55a855218" target="_blank">LinkedIn</Link>
                        <Link className="social-links" to="https://www.facebook.com/rahulbishnoiharyana" target="_blank">Facebook</Link>
                        <Link className="social-links" to="https://www.instagram.com/bishnoi_rahul14/" target="_blank">Instagram</Link>
                        <Link className="social-links" to="https://twitter.com/Rahul_bish9oi" target="_blank">Twitter</Link>

                    </div>
                </div>

            </div>
        </>

    )
}

export default Contact