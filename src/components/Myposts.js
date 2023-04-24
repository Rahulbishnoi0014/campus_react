import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import like from "../images/redheart.png";
import deleteicon from "../images/delete.png"

import Loading from './Loading';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="">
            {isReadMore ? text.slice(0, 100) : text}
            {(text.length > 100) ? <span onClick={toggleReadMore} className="read-or-hide">{isReadMore ? "...read more" : " show less"}</span> : <span><br /><br /><br /></span>}
        </p>
    );
};




const Myposts = () => {

    const navigate = useNavigate();

    const [userposts, setuserposts] = useState([]);

    const [loading, setLoading] = useState(true);

    const tostconfig = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    const notifyErr = (text) => toast.error(text,tostconfig);
    const notifySuc = (text) => toast.success(text,tostconfig);

    const getData = async () => {
        try {

            const res = await fetch("/myposts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            const userpost = await res.json();


            setuserposts(userpost.reverse());
            setLoading(false);

            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                notifyErr("Failed to Fetch !")
            }


        }
        catch (err) {

            // console.log(err)

            notifyErr("Failed to Fetch !")

            navigate("/signin");


        }

    }

    const deletepost = async (id) => {
        try {

            var url = "delete/" + id;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                notifyErr("Failed to Delete!")

            }
            else {
                notifySuc("Successfully deleted")
                getData();
            }


        }
        catch (err) {
            notifyErr("Failed to Delete!")

        }
    }

    

    useEffect(() => {
        getData();

    }, []);



    return (
        <>

            {
                userposts.map((curr, index) => {
                    return <div className='userpost borr ' key={index+"1"}>
                        <p className='time'>{curr.datetime}</p>


                        <hr />
                        <div className='box1'>

                            <div className='myposttext'>
                               
                                        <ReadMore>
                                            {curr.text}
                                        </ReadMore>
                                    
                            </div>

                            <div className='iconsection'>
                                <img className="myposticon" src={deleteicon} onClick={() => deletepost(curr._id)} alt="delte " />
                                <img className="myposticon" src={like} alt="like pic" />
                                <p className="myposticon center" >{curr.like}</p>
                            </div>



                        </div>

                        <hr />

                    </div>
                })
            }

            {loading && <Loading/>}

            <ToastContainer/>





        </>
    )
}

export default Myposts