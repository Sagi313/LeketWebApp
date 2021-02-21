import React, { Component } from "react";

export default function FarmerUpperBlock(){

    return(
<div>
<div>
        <h2>חקלאים</h2>
</div>
     <div className = 'farmer-uper-block'>
<button className = 'button-last-month'>
   <p>מהחודש האחרון</p>
</button>
<button className = 'button-new-old'>
     <p>מחדש לישן</p>
</button>
<button className = 'button-a-z'>
   <p>א'-ת'</p>
</button>
</div>
</div>

    )

}
