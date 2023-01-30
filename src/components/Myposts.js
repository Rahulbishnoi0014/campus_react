import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import like from "../images/redheart.png";
import deleteicon from "../images/delete.png"


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

    const [err, seterr] = useState("");

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

            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                seterr("error occur");
            }


        }
        catch (err) {

            console.log(err)
            seterr("error occur");
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

                seterr("error occur ! cannot delete");
            }
            else {
                console.log("delted");
                getData();
            }


        }
        catch (err) {
            console.log(err);
            seterr("error occur ! cannot delete");




        }
    }



    useEffect(() => {
        getData();

    }, []);


    return (
        <>

            {/* <p>{err}</p> */}

            {err===""?<></>:<p>{err}</p>}


            {
                userposts.map((curr, index) => {
                    return <div className='userpost borr '>
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



        </>
    )
}

export default Myposts