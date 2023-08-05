import React from "react";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import linkicon from '../assets/link.svg';
import { ToastContainer, toast } from "react-toastify";


const SourceModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [value, copy] = useCopyToClipboard();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const showToastMessage = () => {
        toast.success("Copied to clipboard", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false
        });}

        
  return (
    <div className="modal-container">
      <div className="modal">
        {!modalOpen && (
          <div onClick={openModal} className="post-source">
            Source
          </div>
        )}
        {modalOpen && (
          <div className="modal-window" onClick={closeModal}>
            <div className="modal-content">
              {props.source}
              <div className="copy-button" onClick={() => copy(props.source)}>
                <img onClick={showToastMessage} src={linkicon} />
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SourceModal;
