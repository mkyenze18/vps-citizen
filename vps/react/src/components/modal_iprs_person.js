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
          <table className="table table-hover">
              <thead>
              <tr>
                  <th>#</th>
                  <th>ID No</th>
                  <th className="d-none d-md-block d-lg-none">Passport</th>
                  <th>First name</th>
                  <th>Last name</th>
              </tr>
              </thead>
              <tbody>
              {props.resources.map(item => (
                  <tr key={item.id} onClick={(e) => props.getResource(item.id, e)}>
                    <th scope="row">{item.id}</th>
                    <td>{item.id_no ? item.id_no : '-'}</td>
                    <td className="d-none d-md-block d-lg-none">{item.passport_no ? item.passport_no : '-' }</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                  </tr>
              ))}
              </tbody>
          </table>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="danger" onClick={props.handleconfirm}>
            {props.isloading &&
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
            Yes, I'm sure!
          </Button>
        </Modal.Footer> */}
      </Modal>
    );
  }