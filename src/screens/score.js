import React from "react"
import PropTypes from "prop-types"
import SplitText from "../components/splitText"

export default class ScorePage extends React.Component {
  constructor(props){
    super(props);
    if(props.onFinish){
      props.onFinish();
    }
  }
  render(){
    return(<>
      <h1>
      <SplitText>
      Grâce à<br/><b> vos efforts</b>
      </SplitText>
      </h1>
      <h2>La planète pourrait atteindre une empreinte carbone neutre en <b>{this.props.score}</b></h2>
      </>);
  }
}
ScorePage.propTypes = {
  onFinish: PropTypes.func
}
