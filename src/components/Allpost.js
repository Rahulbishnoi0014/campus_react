import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import like from "../images/heartnew.png";
import nlike from "../images/redheart.png";


const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="posttext">
            {isReadMore ? text.slice(0, 100) : text}
            {(text.length > 100) ? <span onClick={toggleReadMore} className="read-or-hide">{isReadMore ? "...read more" : " show less"}</span> : <span><br /><br /><br /></span>}
        </p>
    );
};

const Allpost = () => {

    const navigate = useNavigate();

    const [posts, setposts] = useState([]);
    const [likes, setlikes] = useState([]);

    // const [liked,setliked]=useState(false);

    const [refreshkey, setrefreshkey] = useState(0);

    setTimeout(() => {
        setrefreshkey(refreshkey + 1);
    }, 2000)

    const [err, seterr] = useState({
        error: "", iserr: false
    });


    const getData = async () => {
        try {

            const res = await fetch("/posts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            const postData = await res.json();

            setposts(postData);



            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                seterr({ ...err, error: "failed to fetch POSTS", iserr: true });
            }
            else {
                seterr({ ...err, error: "", iserr: false });


            }



        }
        catch (err) {

            console.log(err)
            seterr({ ...err, error: "failed to fetch POSTS", iserr: true });

            // navigate("/signin");


        }

    }
    const getLikedata = async () => {
        try {

            const res = await fetch("/userlikes", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });


            const likes = await res.json();

            setlikes(likes);




            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                seterr({ ...err, error: "failed to fetch data", iserr: true });
            }
            else {
                seterr({ ...err, error: "", iserr: false });


            }




        }
        catch (err) {


        }

    }

    const likepost = async (id) => {
        try {

            var url = "like/" + id;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            setrefreshkey(refreshkey + 1);
            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                seterr("error occur ! cannot like");
            }
            else {

                console.log(res.status);
            }


        }
        catch (err) {
            console.log(err);
            seterr("error occur ! cannot delete");




        }
    }

    const dislikepost = async (id) => {
        try {

            var url = "dislike/" + id;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });



            setrefreshkey(refreshkey + 1);

            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");

                seterr("error occur ! cannot like");
            }
            else {
                console.log(res.status);
            }


        }
        catch (err) {
            console.log(err);
            seterr("error occur ! cannot delete");




        }
    }


    useEffect(() => {
        getData();
        getLikedata();
    }, [refreshkey]);
    return (
        <div>
            {
                err.iserr ? <p>{err.error}</p> : posts.map((curr, index) => {
                    return (
                        <>
                            <div key={index} className='postcard borr bgcw'>
                                <div className='posttop'>

                                    <p className='time'>{curr.datetime}</p>
                                    <p className="postuser rgb"><i class="fi fi-rr-incognito"></i> no-body</p>


                                </div>
                                <hr></hr>
                                
                                <ReadMore>
                                    {curr.text}
                                </ReadMore>

                                <hr></hr>
                                <div className='likesec'>

                                    {(likes.indexOf(curr._id) >= 0) ? <img src={nlike} onClick={() => dislikepost(curr._id)} alt="no img" /> : <img src={like} onClick={() => likepost(curr._id)} alt="no img" />}
                                    <p>{curr.like}</p>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Allpost