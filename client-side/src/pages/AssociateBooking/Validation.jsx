import moment from 'moment';

let checkBookTimings=[],myArray=[],i,stime,etime;
const validation=(inputValues,bookedTimings)=>{
    checkBookTimings = bookedTimings; 
    stime = moment(inputValues.starttime).format("hh:mm a") 
    etime = moment(inputValues.endtime).format("hh:mm a") 
    
    let errors = {};
   
    if (!inputValues.title) {
        errors.title = "Entry Required";
        errors.showtitle = true;
    }
    
    if(inputValues.starttime >= inputValues.endtime){
        errors.starttime = "Invalid timing";
    }
    
    else if(bookedTimings.length>0){

        if(!validateTimings(stime)){
            errors.starttime = "Choose another time.....meeting is already booked";
            errors.showtime = true;
        } 
        else if(!validateTimings(etime))  {
            errors.starttime = "Choose another time.....meeting is already booked";
            errors.showtime = true;
        } 
    }

    console.log(errors)
    return errors;
}

const validateTimings=(checkVal)=>{
   console.log(`starttime checkVal`,checkVal)
    let nFlag= true;
    for(i = 0;i<checkBookTimings.length;i++){
        console.log("start Value "+checkBookTimings[i].starttime);
        console.log("end Value "+checkBookTimings[i].endtime);
        if(checkVal===checkBookTimings[i].starttime){
                nFlag=false;
                break;
        }
        else if(checkBookTimings[i].starttime<checkVal){
                nFlag=false;
                break;
        }
        else if(checkVal<checkBookTimings[i].endtime){
                nFlag=false;
                break;
        }
    }
    return nFlag;
}
export default validation;