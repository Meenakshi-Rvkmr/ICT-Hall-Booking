var customStyle = {};

function halldetail_theme(type){    

    switch (type) {
        case "Flex1":
            return flexstyle1();
        case "Box1":
            return boxstyle1();
        case "Stack1":
            return stackstyle1();
        case "Heading1":
            return headerstyle1();
        case "Text1":
            return textstyle1();   
        case "Text2":
            return textstyle2();         
        default:
            const defaultval={};
            return defaultval;               
      }
}

export default halldetail_theme;


//---------------------First Flex Style---------------------------------

function flexstyle1(){
    customStyle = {
        padding: '6',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: '1',
      }

      return customStyle;
}

//---------------------Box Style---------------------------------

function boxstyle1(){
   customStyle = {          
        pos: 'relative',
        boxShadow : 2
      }

      return customStyle;
    }

//---------------------Stack1 Style---------------------------------

function stackstyle1(){
    customStyle = {
         width: '100%',
         color: '#222',
         alignItems: 'center',
         textAlign: 'center',
         lineHeight: '32px',
         fontFamily: 'Josefin Sans, sans-serif',
         border: '1px solid red'
       }
       
       return customStyle;
 }


 //---------------------Header1 Style---------------------------------

function headerstyle1(){
    customStyle = {        
         fontSize: '28px',
         fontWeight: '500',
         fontFamily: 'body',
       }

       return customStyle;
 }

//---------------------Text1 Style---------------------------------

function textstyle1(){
    customStyle = {
        color: '#2a4158',
        fontWeight: '500',
        mt: '-50px',
       }
 
       return customStyle;
 }

 
 //---------------------Text2 Style---------------------------------

function textstyle2(){
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


  

 