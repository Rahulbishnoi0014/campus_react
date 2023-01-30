import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {
       try{
        const res =await fetch("/logout", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",

            },
            credentials: "include"

        });

        if (res.status == 200)
            navigate("/signin");
        else {
            alert("cannot signOut");
            navigate("/");
        }

       }
       catch(err){
        console.log(err);
        alert("cannot signOut");
            navigate("/");

       }
    }



    useEffect(() => {
        logout();
    })
    return (
        <div className='center'>
            <h1>L O G O U T  </h1>
        </div>
    )
}

export default Logout