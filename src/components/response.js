import PropTypes from "prop-types"
import React from "react"


const Response = ({ data }) => (
  <div className="response">
  {data.entitled}
  </div>
)

Response.propTypes = {
  data: PropTypes.object,
}
Response.defaultProps = {
  data: {},
}

export default Response
