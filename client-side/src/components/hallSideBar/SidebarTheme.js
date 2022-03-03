var customStyle = {};

function sidebar_theme(type){    

    switch (type) {
        case "Flex1":
            return flexstyle1();
        case "Title1":
            return textstyle1();
        case "HallInfo":
            return hallInfostyle1();
        case "Container1":
            return containerstyle1();
        case "SubTitle1":
            return textstyle3();   
        case "Flex2":
            return flexstyle2();         
        default:
            const defaultval={};
            return defaultval;               
      }
}

export default sidebar_theme;


//---------------------First Flex Style---------------------------------

function flexstyle1(){
    customStyle = {
        flex: '4',
        mr:"3em",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        borderRadius: '5',
        fontFamily: 'Open Sans, sans-serif',
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
      }

      return customStyle;
}

//---------------------Title Style---------------------------------

function textstyle1(){
   customStyle = {        
        fontSize: '28px',
        margin: '5px',
        borderBottom: '2px solid white',
        color:"whitesmoke",
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
        lineHeight: '42px',
        letterSpacing: '2px',
      }

      return customStyle;
    }


    //hallInfostyle1

    function hallInfostyle1(){
        customStyle = {        
             fontSize: '4xl',
             margin: '25px',
             padding: '8px',
             color: 'white',
             fontWeight: '400',
             textAlign: 'center',
             lineHeight: '32px',
           }
     
           return customStyle;
     }
    



 //---------------------Container1 Style---------------------------------

function containerstyle1(){
    customStyle = {        
         width: '70%',
         marginTop: '25px',
         marginBottom: '25px',
         boxShadow : 2
       }
 
       return customStyle;
 }

//---------------------SubTitle Style---------------------------------

function textstyle3(){
    customStyle = {        
        fontSize: '18px',
        margin: '15px',
        padding: '8px',
        color: '#222',
        fontWeight: '700',
        textAlign: 'center',
       }
 
       return customStyle;
 }

 
 //---------------------Flex2 Style---------------------------------

function flexstyle2(){
    customStyle = {        
        bg: 'white',
        mt: '3em',       
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        color:"orange",
       }
 
       return customStyle;
 }


  

 