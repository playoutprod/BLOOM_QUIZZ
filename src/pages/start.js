import React from "react"
import {SplitText} from "../components/splitText"
import { motion } from "framer-motion"

class StartPage extends React.Component {
  constructor(props){
    super(props);
    if(props.onFinish){
      props.onFinish();
    }
  }
  render(){
    return(<>
      <h2>
      <SplitText>
      Janvier 2300, on découvre un message des derniers pollueurs. Leur message est simple : <b>”Nous regrettons de ne pas avoir pris les bonnes décisions en matière d’écologie”</b>.<br/>Ta mission : reconnaître les innovations et alternatives disponibles dès 2020 pour participer à la création d’un monde plus écologique.
      </SplitText>
      </h2>
      <motion.h3 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{type:"tween",duration:.5,delay:13}} >Une seule réponse par question est possible.</motion.h3>
    </>);
  }
}

export default StartPage
