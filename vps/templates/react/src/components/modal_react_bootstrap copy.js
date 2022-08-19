// TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MyVerticallyCenteredModal(props) {
    const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.title}</h4>
          <p>
            {props.body}
          </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> 
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }