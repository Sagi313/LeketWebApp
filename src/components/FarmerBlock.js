
import React, { Component } from "react";

export default function FarmerBlock(){
    const farmerName = 'יוסי ' ;
    const phoneNum = "050";
    const location = "link map";
    const area = "מודיעין";
    const date = "00/00/00";
    const crop = "בננה" ;


    return (
        <button className='farmer-block-button'>

<div className = 'right-farmer-block'>
        <p>{date}</p>
        <p>{location}</p>
        <p>{phoneNum}</p>
        </div>
        <div className = 'left-farmer-block'>
        <h5>{farmerName}</h5>
        <p>{area}</p>
        <p>{crop}</p>
        </div>


        </button>

          
         

)
    }
