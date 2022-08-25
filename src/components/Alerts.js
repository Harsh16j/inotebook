import React from 'react'
import Alert from 'react-bootstrap/Alert';
const Alerts = (props) => {
  return (
    <div>
<Alert variant="primary">
    {props.message}
</Alert>
    </div>
  )
}

export default Alerts