import PropTypes from "prop-types"
import React from "react"

import "../styles/button.css"

class Button extends React.Component {
  constructor(props){
    super(props);
    this.dataClass = this.props.dataClass ? this.props.dataClass : '';
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    if(this.status.indexOf('disable')==-1){
      if(this.props.clickAction){
        this.props.clickAction(this);
      }
    }
  }
  render(){
    this.status = this.props.status ? this.props.status : 'enable';
    this.show = this.props.show !== undefined ? (this.props.show ? 'block' : 'none') : 'block';
    return(
      <button style={{display:this.show}} onClick={this.handleClick} className={"button "+this.dataClass+" "+this.status}>{this.props.text}</button>
    );
  }
}
Button.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
}
Button.defaultProps = {
  text: "Suivant",
  link : ""
}
export default Button
