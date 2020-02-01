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
    if (typeof window !== `undefined`) {
      this.defaultHeight = window.innerHeight
      this.defaultWidth = window.innerWidth
    }else{
      this.defaultHeight = 1112
      this.defaultWidth = 834
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
  finish(delay){
    const component = this;
    if(delay){
      const int = setInterval(function(){
        component.setState({
          finished : true
        });
        clearInterval(int);
      },delay*1000);
    }else{
      component.setState({
        finished : true
      });
    }

  }
  componentDidMount(){
    if (typeof window !== `undefined`) {
      this.defaultHeight = window.innerHeight
      this.defaultWidth = window.innerWidth
    }
  }
  render(){
    return(
      <motion.div className={"screen "+(this.props.className ? this.props.className : '')} initial={{ y: this.defaultHeight }} animate={{ y: 0 }} transition={{type:"spring",duration:.5,damping:50,stiffness:300,velocity:100}} id={this.props.id}>
        <div className="content">
          {this.state.prev && <Button text={"Retour"} clickAction={this.getPrev}></Button>}
           {
             this.props.children && (React.cloneElement(this.props.children, {onFinish: this.finish}))
           }
          {this.state.next && <Button dataClass="next" show={this.state.finished} text={this.props.button} clickAction={this.getNext}></Button>}
        </div>
        <motion.div initial={{height:this.defaultHeight}} animate={{height:0}} transition={{type:"tween",duration:.5,delay: 0.2}} className="transition"></motion.div>
      </motion.div>
    );
  };
}
