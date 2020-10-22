import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";

import { setServerError } from '../store/actions/application'

const ServerErrorModal = ({serverError}) => { 
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setServerError(false))
  
  return (
      <Modal show={serverError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Server error</Modal.Title>
        </Modal.Header>
        <Modal.Body>It seems that server is unreachable or encountered an issue.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Refresh
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
  
function mapStateToProps(state) {
  const { application } = state;
  const { serverError } = application || {
    serverError: false
  }

  return {
    serverError
  }
}
export default connect(mapStateToProps)(ServerErrorModal)