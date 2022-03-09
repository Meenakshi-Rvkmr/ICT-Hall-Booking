const validate=({value,type,times})=>{
    console.log("inside validate")
    let errorMsg = "";
    var checkTime = value.split(':'); 
    var checkValue = checkTime[0]*60+checkTime[1];

    if(type === "starttime"){
       console.log(checkValue) 
    }
    return errorMsg;
}

export default validate;