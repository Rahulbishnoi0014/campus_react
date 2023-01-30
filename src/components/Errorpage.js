import React from 'react'
import { Link } from 'react-router-dom'

const Errorpage = () => {
  return (
    
    <div className="colour-gradient " >
        
           <div className="errorSection center">
            <br/><br/>
            <h1>
                OOPS ! something went wrong .
               </h1>
               
               <img src="https://media2.giphy.com/media/FYUnDtud95kMKCovAY/giphy.gif?cid=ecf05e47o0alcxkmq84jadhgfwoevez7fskcw8lcwp9aerkl&rid=giphy.gif&ct=g" alt="error gif"/>
               
               {/* <Link className="btn ibutton" style="background-color:black;" to="/feedback">Report</Link> */}
              
               <code>
                <h3>Error</h3>
                
              </code>
               
            </div>
  
    </div>
  )
}

export default Errorpage