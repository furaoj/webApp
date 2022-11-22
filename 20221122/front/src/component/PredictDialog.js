import { Button, Modal } from "react-bootstrap";

export function PredictDialog(props) {
  //親のメソッドを呼び出す
  const handleClose = () => {
    props.handleCallbackClose();
  };

  return (
    <div>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>株価予測</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            width="780"
            height="300"
            src={"data:image/png;base64," + props.data}
            alt=""
          ></img>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PredictDialog;
