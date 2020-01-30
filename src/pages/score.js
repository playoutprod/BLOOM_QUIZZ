import React from "react"
import {SplitText} from "../components/splitText"

class ScorePage extends React.Component {
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
      Ici un écran de<br/><b>SCORE</b>
      </SplitText>
      </h2>
      <p>Vous aurez atteind votre objectif en l'an <b>{this.props.score}</b> ce qui n'est pas terrible</p>
      </>);
  }
}

export default ScorePage
