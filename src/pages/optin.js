import React from "react"
import {SplitText} from "../components/splitText"
import FormDataComponent from "../components/form"

class OptinPage extends React.Component {
  constructor(props){
    super(props);
    this.finish = this.finish.bind(this);
  }
  finish(){
    if(this.props.onFinish){
      this.props.onFinish();
    }
  }
  render(){
    return(<>
      <h2>
      <SplitText>
      Ici un écran d'<br/><b>OPT-IN</b>
      </SplitText>
      </h2>
      {<FormDataComponent score={this.props.score} onFinish={this.finish}/>}
      </>);
  }
}

export default OptinPage
