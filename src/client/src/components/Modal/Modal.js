import "./Modal.css";

export const Modal = ({ onDelete, opneModal }) => {
  return (
    <div id="id01" className="modal">
      <div className="modal-content">
        <div className="modal-container">
          <h1>Delete Post</h1>
          <p>Are you sure you want to delete this post?</p>

          <div className="clearfix">
            <button type="button" className="cancelbtn" onClick={opneModal}>
              Cancel
            </button>
            <button type="button" className="deletebtn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
