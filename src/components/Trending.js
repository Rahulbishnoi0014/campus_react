import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 100) : text}
        {(text.length>100)?<span onClick={toggleReadMore} className="read-or-hide">{isReadMore ? "...read more" : " show less"}</span>:<span></span>}
      </p>
    );
  };



const Trending = () => {

    const navigate = useNavigate();

    const [trend, settrend] = useState([]);
    const [refreshkey,setrefreshkey]=useState(0);


    const [err,seterr]=useState({
        error:"",iserr:false
    });

    setTimeout(() => {
        setrefreshkey(refreshkey+1);
    },3000)


    const tostconfig = {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    
      const notifyErr = (text) => toast.error(text,tostconfig);
      const notifySuc = (text) => toast.success(text,tostconfig);
      const notifyWar = (text) => toast.warning(text,tostconfig);

    const getData = async () => {
        try {

            const res = await fetch("/trend", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                credentials: "include"
            });

            const trendData = await res.json();


            // console.log(trendData);
            
            settrend(trendData);



            if (res.status !== 200) {
                if (res.status === 401)
                    navigate("/signin");
            seterr({...err,error:"failed to fetch trending data",iserr:true});

            notifyWar("Failed to fetch Trending List");
            }

            else{
                seterr({...err,error:"",iserr:false});

            }



        }
        catch (err) {

            console.log(err)
            seterr({...err,error:"failed to fetch trending data",iserr:true});
            notifyErr("Server Error")



        }

    }

    useEffect(()=>{
        getData();
    }
      ,[refreshkey]);

    return (

        

        <div className='borr bgcw pad1 martb1'>

            {err.iserr&&<div className='center'><p>{err.err}</p></div>}
            {
               trend.map((curr,index)=>{
                    return (
                        <>
                        <p key={index+"!"} className="rgb"><i className="fi fi-rr-arrow-trend-up"></i> <b>Trending #{index+1} ^{curr.like}</b></p>

                            <h6  className="padleft1">
                            <ReadMore>
                            {curr.text}

                            </ReadMore>
                            </h6>
                        </>
                    )
                }) 
            }

            <ToastContainer/>
        </div>
       
    )
}

export default Trending