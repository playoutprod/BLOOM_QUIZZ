import React from "react"
import line from "../images/line.svg";

class Background extends React.Component {
  componentDidMount(){
    this.randomizeRefs("start");
    const component = this;
    this.randomizeRefs("move");
    setInterval(function(){
      component.randomizeRefs("move");
    },4000);
  }
  randomizeRefs(type){
    let move = 30;
    if(type === "start"){
        move = 1000;
    }
    for (const property in this.refs) {
      const element = this.refs[property];
      if(type !== "start"){
        element.style.transition = "left 5s,opacity 5s,top 5s";
      }
      const directionX = Math.random()<.5 ? 1 : -1;
      const directionY = Math.random()<.5 ? 1 : -1;
      const directionO = Math.random()<.5 ? 1 : -1;

      const randomX = Math.round(Math.random()*move)*directionX;
      const randomY = Math.round(Math.random()*move)*directionY;
      const randomO = Math.round(Math.random())*directionO;
      element.style.left = (type === 'start' ? Math.random()*1080 : this.addCssValue(element,"left",randomX))+'px';
      element.style.top = (type === 'start' ? Math.random()*810 : this.addCssValue(element,"top",randomY))+'px';
      element.style.opacity = 0.5 +randomO*Math.random();
    }
  }
  addCssValue(element,property,value){
    const style = window.getComputedStyle(element);
    let prop = style[property];
    if(typeof(prop) === 'string'){
      prop = parseInt(prop.replace('px',''));
    }
    return(prop+value);
  }
  render(){
    const rectangles  = [];
    for(let i = 0;i<5;i++){
      rectangles.push(<div key={i} ref={"rectangle"+i} className="rectangle"/>);
    }
    const ellipses  = [];
    for(let i = 0;i<5;i++){
      ellipses.push(<div key={i} ref={"ellispe"+i} className="ellipse"/>);
    }
    const lines  = [];
    for(let i = 0;i<5;i++){
      lines.push(<img src={line} alt="line" key={i} ref={"line"+i} className="line"/>);
    }
    return(<div className="background">
      {rectangles}
      {ellipses}
      {lines}
    </div>)
  }
}
export default Background;
