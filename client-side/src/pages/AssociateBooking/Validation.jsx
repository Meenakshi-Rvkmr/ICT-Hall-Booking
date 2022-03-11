const validation=(inputValues)=>{
        
    // var checkTime = value.split(':'); 
    // var checkValue = checkTime[0]*60+checkTime[1];
    console.log(`inside`)
    console.log(inputValues)
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
    
    console.log(errors)
    return errors;
}


export default validation;