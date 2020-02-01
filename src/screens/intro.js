import React from "react"
import { motion } from "framer-motion"

import "../styles/intro.css";

class IntroPage extends React.Component {
  constructor(props){
    super(props);
    if(props.onFinish){
      props.onFinish();
    }
  }
  render(){
    return(<div className="text">
      <span className="firstLine">Janvier 2320 <br/>Vous découvrez le message laissé par les derniers pollueurs :</span>
      <span className="quote">”Nous regrettons de ne pas avoir pris plus tôt les bonnes décisions en matière d’écologie”.</span>
      <motion.h2 style={{display:"inline-block",position:"relative",width:"80%",left:"10%",textAlign:"center"}} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{type:"tween",duration:.5}}>Votre mission : </motion.h2>
      <span style={{display:"inline-block",position:"relative",width:"80%",left:"10%"}}>Reconnaître les innovations et alternatives disponibles dès 2020  afin de participer au développement d’un monde plus écologique.</span>
    </div>);
  }
}

export default IntroPage
