import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'rgb(245,220,220)',
    border: '2px solid red',
    width: '80%',
    maxWidth: '400px',
    borderRadius: '5px',
    padding: '20px'
  },
};


Modal.setAppElement('#root');

const AlertReport = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(100);

  function openModal() {
    setIsOpen(true);
    setShowLoading(true);

    const intervalId = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress === 0) {
          setShowLoading(false);
          closeModal();
          clearInterval(intervalId);
          return 100;
        }
        return prevProgress - 10;
      });
    }, 500);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    setSocket(ws);

    ws.onopen = () => {
      ws.send('Hello, server!');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data);
      openModal(); // open modal when accident is detected
    };

    ws.onclose = () => {
      // console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div> 
      <Modal 
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 >Accident Detected</h2>
        {message && (
          <div>
            <p>
              Time: <b>{moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</b>
            </p>
            <p>
              Location:{' '}
              <b>
                <a href={message.accidentLocation} target="_blank">
                  {message.accidentLocation}
                </a>
              </b>
            </p>
            <p>
              Status: <b>{message.status}</b>
            </p>
          </div>
        )}
        {showLoading && (
          <hr
            style={{
              borderColor: 'red',
              marginTop: '10px',
              width: `${loadingProgress}%`,
              transition: 'width 0.5s ease-in-out',
            }}
          />
        )}
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default AlertReport;
