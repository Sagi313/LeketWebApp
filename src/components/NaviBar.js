import React, { Component } from "react";
import { Link } from "react-router-dom";


export default function NaviBar(){
return(
<div>


<Link to="/farmers"><button className='nav-bar-button'>farmers
</button></Link>

<Link to="/map"><button className='nav-bar-button'>map
  </button></Link>

</div>
)
}