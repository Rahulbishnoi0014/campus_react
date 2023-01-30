import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


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
                if (res.status == 401)
                    navigate("/signin");
            seterr({...err,error:"failed to fetch trending data",iserr:true});
            }
            else{
                seterr({...err,error:"",iserr:false});


            }



        }
        catch (err) {

            console.log(err)
            seterr({...err,error:"failed to fetch trending data",iserr:true});


        }

    }

    useEffect(()=>{
        getData();
    }
      ,[refreshkey]);

    return (

        

        <div className='borr bgcw pad1 martb1'>
            {
               err.iserr?<p>{err.error}</p>:trend.map((curr,index)=>{
                    return (
                        <>
                        <p  className="rgb"><i className="fi fi-rr-arrow-trend-up"></i> <b>Trending #{index+1} ^{curr.like}</b></p>

                            <p key={index} className="padleft1">
                            <ReadMore>
                            {curr.text}

                            </ReadMore>
                            </p>
                        </>
                    )
                }) 
            }
        </div>
       
    )
}

export default Trending