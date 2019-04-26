const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'
const time = require('./timeLib');



let checkEventForTime = (eventArray) =>{

    let event1MinArray = [];
    for (let x in eventArray){

       
        if ((((moment( eventArray[x].startTime).diff(moment().seconds(0).milliseconds(0)))))==1000*60)
         {    
            

            
            event1MinArray.push(eventArray[x])
       

        }
       
     



    }
    
    return event1MinArray;
} 

let compareEmail = (eventArr,userArr) =>{

    let matchedEventArr = []; 
    for(let x in eventArr){
        for(let y in userArr){
            if((eventArr[x].userEmail) === (userArr[y].email)){

                let eventData ={ eventDetails:eventArr[x] , userSoketId : userArr[y].userSocketId }

                

                matchedEventArr.push(eventData);


            }
        }
    }
    
    return matchedEventArr;
}

module.exports = {
   checkEventForTime:checkEventForTime,
   compareEmail:compareEmail

}