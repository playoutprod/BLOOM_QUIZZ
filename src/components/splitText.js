import React from "react"
import { motion } from "framer-motion"


export class SplitText extends React.Component {
  constructor(props){
    super(props);
    const animation = props.animation ? props.animation : "spring";
    this.containerVariants = {
      before: {},
      after: {
      transition: {
        staggerChildren: 0.04
      }},
    }
    this.letterVariants = {
      before: {
        opacity: 0,
        y: 20
      },
      after: {
        opacity: 1,
        y: 0,
        transition:{type:animation,damping:50,stiffness:300,velocity:100}
      }

    }
  }
  render(){

    let string = [];
    const childs = this.props.children;


    childs.forEach(function(child){
      if (typeof child === 'string') {
        const text = Array.from(child);
        text.forEach(function(letter){
          string.push({class:'',content:letter})
        });
      }else{
        if(child.type === 'br'){
          string.push({class:"break",content:''})
        }else{
          const text = Array.from(child.props.children);
          text.forEach(function(letter){
            string.push({class:child.type,content:letter})
          });
        }
      }
    })
    return(
      <motion.p
  width={ "100%" }
  background={ "" }
  variants={ this.containerVariants }
  initial={ "before" }
  animate={ "after" } style={{display: "flex",flexWrap:"wrap",position:"relative"}}>
      {
        string.map((letter, index) =>(
          <motion.span className={letter.class} key={index} width={ "auto" } height={ 35 } background={ "" } variants={ this.letterVariants }>
          {letter.content === " " ? "\u00A0" : letter.content}
          </motion.span>
        ))
      }
      </motion.p>
    );
  };
}
