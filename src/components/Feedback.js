import React from 'react'
import Navbar from './Navbar'

const Feedback = () => {
  return (
<>
<Navbar/>
        <center className='spaceSection'>
        <iframe className="googleforms"
            src="https://docs.google.com/forms/d/e/1FAIpQLSedpkFoINAtNnoiSjOHX8AW65e1Ok9WedikHj2dPQqNF496JA/viewform?embedded=true"
             scrolling="no" frameborder="0" marginheight="0" marginwidth="0">Loading…
        </iframe>
    </center>
    
    </>  )
}

export default Feedback