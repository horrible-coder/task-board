import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../api";
import { setCardList } from "../../redux/cards/actions";
import { Task } from "../Board/Board";
import "./CardDetailsModal.scss";

export interface Props {
  show: boolean;
  onHide: any;
  task: Task;
}

Modal.setAppElement("#root");

const CardDetailsModal: React.FC<Props> = ({ show, onHide, task }) => {
  const [createdBy] = useState(task.created_by);
  const [title, setTitle] = useState(task.title);
  const [column, setColumn] = useState(task.task_column);

  const userLoggedIn = useSelector((state: any) => state.username.username);
  const dispatch = useDispatch();

  const fetchTasks = async () => {
    await apis
      .getCards()
      .then((data) => {
        dispatch(setCardList(data.data.cards));
      })
      .catch((err) => console.log(err));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColumn(event.target.value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const payload = {
      id: task.id,
      title: title,
      createdBy: userLoggedIn,
      taskColumn: column,
    };
    await apis
      .updateCard(payload)
      .then((res) => fetchTasks())
      .catch((err) => console.log(err));

    onHide();
  };

  return (
    <div className="cardDetailsModal">
      <Modal isOpen={show} onRequestClose={onHide}>
        <h1 className="modal_heading">Card ID - {task.id}</h1>
        <input
          type="text"
          value={createdBy}
          placeholder="Created By"
          disabled
        ></input>
        <textarea
          rows={3}
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        ></textarea>
        <select value={column} onChange={handleColumnChange}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button onClick={handleSubmit}>Save</button>
      </Modal>
    </div>
  );
};

export default CardDetailsModal;
