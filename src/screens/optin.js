import React from "react"
import PropTypes from "prop-types"
import SplitText from "../components/splitText"
import FormDataComponent from "../components/form"

import "../styles/optin.css";

export default class OptinPage extends React.Component {
  constructor(props){
    super(props);
    this.finish = this.finish.bind(this);
    this.forceNext = this.forceNext.bind(this);
    this.state = {
      finish:false
    }
  }
  finish(){
    this.setState({
      finish:true
    });
    if(this.props.onFinish){
      this.props.onFinish();
    }
  }
  forceNext(){
    if(this.props.onNext){
      this.props.onNext();
    }
  }
  render(){
    return(<>
      {!this.state.finish && (<div className="form">
        <h1>
        <SplitText>
        Plus qu'une<b> étape</b>
        </SplitText>
        </h1>
        <p>Afin de repartir avec un petit souvenir, laissez nous votre email.</p>
        {<FormDataComponent score={this.props.score} onFinish={this.finish} db={this.props.db}/>}
        <div role="button" tabIndex={0} className="pass" onClick={this.forceNext} onKeyDown={this.forceNext}>Passer cette étape</div>
      </div>)}
      {this.state.finish && (<div className="thanks">
        <h1>
        <SplitText>
        Merci !
        </SplitText>
        </h1>
      </div>)}
      </>);
  }
}
OptinPage.propTypes = {
  onNext:PropTypes.func,
  score:PropTypes.number,
  db:PropTypes.object
}
