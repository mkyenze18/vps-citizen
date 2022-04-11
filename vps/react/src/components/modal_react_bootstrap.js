// TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
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
          <Button variant="danger" onClick={props.handleconfirm}>
            {props.isloading &&
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
            Yes, I'm sure!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }