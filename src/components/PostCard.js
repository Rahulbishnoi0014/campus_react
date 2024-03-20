import React, { useState } from 'react'

import like from "../images/heartnew.png";
import nlike from "../images/redheart.png";

import { useNavigate } from 'react-router-dom';

const { generateUsername } = require("unique-username-generator");

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

const PostCard = (props) => {

    const navigate = useNavigate();

    const [fakeuser, setFakeuser] = useState(generateUsername("_"));



    const likepost = async (id) => {
        try {

            var url = "https://campusapi-r8xp.onrender.com/like/" + id;
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

                alert("Failed to like ! try again later")
            }
            else {



                console.log(res.status);
            }


        }
        catch (err) {
            console.log(err);
            alert("Failed to like ! try again later")




        }
    }

    const dislikepost = async (id) => {
        try {

            var url = "https://campusapi-r8xp.onrender.com/dislike/" + id;
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

                alert("Failed ! try again later")
            }
            else {
                console.log(res.status);
            }


        }
        catch (err) {
            console.log(err);
            alert("Failed ! try again later")



        }
    }




    return (
        <>

            <div key={props.index} className='postcard borr bgcw'>
                <div className='posttop'>

                    <p className='time'>{props.curr.datetime}</p>



                    <p className="postuser rgb"><i className="fi fi-rr-portrait postuserimg"></i> {fakeuser}</p>


                </div>

                <ReadMore>
                    {props.curr.text}
                </ReadMore>

                <div className='likesec'>

                    {(props.likes.indexOf(props.curr._id) >= 0) ? <img src={nlike} onClick={() => dislikepost(props.curr._id)} alt="no img" /> : <img src={like} onClick={() => likepost(props.curr._id)} alt="no img" />}
                    <p>{props.curr.like}</p>
                </div>
            </div>

        </>
    )
}

export default PostCard