import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import PostCard from './PostCard';
import Loading from './Loading';




const Allpost = () => {

    const navigate = useNavigate();

    const [posts, setposts] = useState([]);
    const [likes, setlikes] = useState([]);


    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // const [refreshkey, setrefreshkey] = useState(0);

    // setInterval(()=>{
    //     setrefreshkey(refreshkey+1);
    // },5000);


    const [err, seterr] = useState({
        error: "", iserr: true
    });


    const getData = async () => {
        try {

            const res = await fetch("/posts/" + page, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            const postData = await res.json();

            // setposts(postData);

            setposts((prev) => [...prev, ...postData]);
            setLoading(false);



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

    const handelInfiniteScroll = async () => {
        // console.log("scrollHeight" + document.documentElement.scrollHeight);
        // console.log("innerHeight" + window.innerHeight);
        // console.log("scrollTop" + document.documentElement.scrollTop);
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                setLoading(true);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);


    useEffect(() => {
        getData();
        getLikedata();
    }, [page])

    

    return (
        <div>
            {
                posts.map((curr, index) => {
                    return (
                        <>

                            <PostCard curr={curr} likes={likes} index={index} key={index}>

                            </PostCard>

                        </>
                    )
                })
            }

            {loading && <Loading />}

        </div>
    )
}

export default Allpost