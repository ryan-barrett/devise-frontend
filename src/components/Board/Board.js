import React, { useRef } from 'react';
import Modal             from 'react-modal';
import Ticket            from '../Ticket/Ticket';
import AddTicketButton   from '../AddTicket/AddTicketButton';

import './Board.css';

const ticketStatusTypes = {
  todo: 'todo',
  inProgress: 'in progress',
  done: 'done',
};

const customStyles = {
  content: {
    width: '40%',
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('body');

const ticketMapping = ({ id, title, estimate, description, assignee }) => {
  return <Ticket key={id} title={title} description={description} estimate={estimate} assignee={assignee}/>;
};

function Board({ id, name, tickets, createTicketHandler }) {
  const [newTask, setNewTask] = React.useState({
    title: '',
    description: '',
    estimate: null,
    assignee: '',
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const titleInput = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const setMissingTitleError = () => {
    titleInput.current.classList.add('title-error');
  };

  const titleChanged = (event) => {
    const { target: { value: newTitle } } = event;
    const updatedNewTask = { ...newTask, title: newTitle };
    setNewTask(updatedNewTask);
  };

  const assigneeChanged = (event) => {
    const { target: { value: newAssignee } } = event;
    const updatedNewTask = { ...newTask, assignee: newAssignee };
    setNewTask(updatedNewTask);
  };

  const estimateChanged = (event) => {
    const { target: { value: newEstimate } } = event;
    const updatedNewTask = { ...newTask, estimate: newEstimate };
    setNewTask(updatedNewTask);
  };

  const descriptionChanged = (event) => {
    const { target: { value: newDescription } } = event;
    const updatedNewTask = { ...newTask, description: newDescription };
    setNewTask(updatedNewTask);
  };

  const thisCreateTicketHandler = (e) => {
    e.preventDefault();
    const { title } = newTask;

    if (title) {
      createTicketHandler(newTask);
      closeModal();
    }
    else {
      setMissingTitleError();
    }
  };

  const todo = [];
  const inProgress = [];
  const done = [];

  for (let i = 0; i < tickets.length; i++) {
    switch (tickets[i].status) {
      case ticketStatusTypes.todo: {
        todo.push(tickets[i]);
        break;
      }
      case ticketStatusTypes.inProgress: {
        inProgress.push(tickets[i]);
        break;
      }
      case ticketStatusTypes.done: {
        done.push(tickets[i]);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div>
      <h1>
        {name}
      </h1>
      <div id="board">
        <div className="board-col">
          <h3>To Do</h3>
          {todo.map(ticketMapping)}
          <AddTicketButton createTicketHandler={openModal}/>
        </div>
        <div className="board-col">
          <h3>In Progress</h3>
          {inProgress.map(ticketMapping)}
        </div>
        <div className="board-col">
          <h3>Done</h3>
          {done.map(ticketMapping)}
        </div>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          style={customStyles}
          contentLabel="Add Ticket Modal"
        >
          <div id="add-task">
            <h2>Add Task</h2>
            <form id="add-task-form">
              <label>Title</label>
              <input ref={titleInput} onChange={titleChanged} className="add-task-input"/>
              <label>Assignee</label>
              <input onChange={assigneeChanged} className="add-task-input"/>
              <label>estimate</label>
              <input onChange={estimateChanged} className="add-task-input"/>
              <label>description</label>
              <textarea onChange={descriptionChanged} className="add-task-textarea"/>
              <div id="button-container">
                <button id="add-task-cancel-button" onClick={closeModal}>Cancel</button>
                <button id="add-task-button" onClick={thisCreateTicketHandler}>Submit</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Board;
