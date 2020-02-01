import React from "react"
import {SplitText} from "../components/splitText"
import { motion } from "framer-motion"

import "../styles/start.css";

class StartPage extends React.Component {
  constructor(props){
    super(props);
    if(props.onFinish){
      props.onFinish();
    }
  }
  render(){
    return(
      <div className="intro">
        <img alt="Logo Bloom" id="logo" src="images/Logo_Bloom_black_anim.svg"/>
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{type:"tween",duration:.5,delay:.5}}>
          <SplitText delay={.5}>TIME MACHINE</SplitText>
        </motion.h1>
      </div>
    );
  }
}

export default StartPage
