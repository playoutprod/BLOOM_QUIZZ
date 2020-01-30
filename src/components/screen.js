import React from "react"
import Button from "./button"
import {motion} from "framer-motion"

import "../styles/screen.css";

export class Screen extends React.Component {
  constructor(props){
    super(props);
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.finish = this.finish.bind(this);
    this.state = {
      next : this.props.onNext ? true : false,
      prev : this.props.onPrev ? true : false,
      finished : false
    }
  }
  getNext(){
    if(this.props.onNext){
      this.props.onNext();
    }
  }
  getPrev(){
    if(this.props.onPrev){
      this.props.onPrev();
    }
  }
  finish(){
    this.setState({
      finished : true
    })
  }
  render(){
    return(
      <motion.div initial={{ y: window.innerHeight }} animate={{ y: 0 }} transition={{type:"spring",duration:.5,damping:50,stiffness:300,velocity:100}} id={this.props.id} className="screen">
        <div className="content">
          {this.state.prev && <Button text={"Retour"} clickAction={this.getPrev}></Button>}
           {
             this.props.children && (React.cloneElement(this.props.children, {onFinish: this.finish}))
           }
          {this.state.next && <Button dataClass="next" show={this.state.finished} text={this.props.button} clickAction={this.getNext}></Button>}
        </div>
        <motion.div initial={{height:window.innerHeight}} animate={{height:0}} transition={{type:"tween",duration:.5,delay: 0.2}} className="transition"></motion.div>
        </motion.div>
    );
  };
}
