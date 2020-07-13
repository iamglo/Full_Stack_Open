import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

const AlertMsg = ({ alert }) => {
  return (
    <div className="alert">
      {alert && <Alert variant="success">
        {alert}
      </Alert>}
    </div>)
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert
  }
}

const ConnectedAlert = connect(
  mapStateToProps,
  null)(AlertMsg)

export default ConnectedAlert