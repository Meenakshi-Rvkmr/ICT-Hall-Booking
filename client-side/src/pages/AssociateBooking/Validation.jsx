const validation=(inputValues)=>{
        
    // var checkTime = value.split(':'); 
    // var checkValue = checkTime[0]*60+checkTime[1];

    let errors = {};
   
    if (!inputValues.title) {
        errors.title = "Entry Required";
        errors.showtitle = true;
    }
    if (!inputValues.hall) {
        errors.hall = "Entry Required";
        errors.showhall = true;
    } 
    if(!inputValues.date){
        errors.date = "Entry Required";
        errors.showdate = true;
    } 
    if (!inputValues.starttime) {
        errors.starttime = "Entry Required";
        errors.showstarttime = true;
    }
    if(!inputValues.endtime){
        errors.endtime = "Entry Required";
        errors.showendtime = true;
    } 
    console.log(errors)
    return errors;
}


export default validation;