const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'
const time = require('./timeLib');



let checkEventForTime = (eventArray) =>{

    let event1MinArray = [];
    for (let x in eventArray){

        if ((((moment( eventArray[x].startTime).diff(moment().seconds(0).milliseconds(0).toISOString()))))==1000*60)
         {    
            
            //console.log((((moment(eventArray[x].startTime).diff(moment(time.now()))))/60000))
            event1MinArray.push(eventArray[x])
        //     if (Math.floor(((moment(eventArray[x].startTime).diff(moment(time.now()))))/60000) == 1)
        //    {

        //     console.log("---------------------------------------------------")
        //         console.log((((moment(eventArray[x].startTime).diff(moment(time.now()))))/60000))
        //        // console.log(eventArray[x])
        //       event1MinArray.push(eventArray[x])
        //     }

        }
       
     



    }
    //console.log("main array")
    //console.log(event1MinArray);
    return event1MinArray;
} 

let compareEmail = (eventArr,userArr) =>{

    let matchedEventArr = [];  // jiska user online hai. or uska event v hai.
    for(let x in eventArr){
        for(let y in userArr){
            if((eventArr[x].userEmail) === (userArr[y].email)){

                let eventData ={ eventDetails:eventArr[x] , userSoketId : userArr[y].userSocketId }

                //eventArr[x].socketId =userArr[y].userSocketId

                matchedEventArr.push(eventData);


            }
        }
    }
    //console.log("eertfgyh",matchedEventArr)
    return matchedEventArr;
}

module.exports = {
   checkEventForTime:checkEventForTime,
   compareEmail:compareEmail

}