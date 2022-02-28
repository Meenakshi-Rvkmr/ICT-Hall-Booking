function validation(inputValues,timeValues){
    let time1 = '';
    let time2 = '';
    const errors = {};
    if (!inputValues.name) {
        errors.name = "Entry Required";
    }
    if (!inputValues.address) {
        errors.address = "Entry Required";
    }  
    if (!timeValues.starttime || !timeValues.endtime) {
        errors.time = "Entry Required";
    }
    else{
        time1=timeValues.starttime;
        time2=timeValues.endtime;
        const seconds='00';
        const [hours1, minutes1] = time1.split(':');
        const [hours2, minutes2] = time2.split(':');
        const date1 = new Date(2022, 0, 1, +hours1, +minutes1, +seconds);
        const date2 = new Date(2022, 0, 1, +hours2, +minutes2, +seconds);

        if (date1.getTime() >= date2.getTime()) {
            errors.time = "Invalid Time";
          }
        
        
    } 






    return errors;
}

export default validation;