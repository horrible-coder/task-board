import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import apis from "../../api";
import { setCardList } from "../../redux/cards/actions";
import "./AddCardModal.scss";

export interface Props {
  show: boolean;
  onHide: any;
}

const AddCardModal: React.FC<Props> = ({ show, onHide }) => {
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState("To Do");

  const dispatch = useDispatch();

  const fetchTasks = async () => {
    await apis
      .getCards()
      .then((data) => {
        dispatch(setCardList(data.data.cards));
      })
      .catch((err) => console.log(err));
  };

  const handleCreatedByChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreatedBy(event.target.value);
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
      title: title,
      createdBy: createdBy,
      taskColumn: column,
    };
    await apis
      .addCard(payload)
      .then((res) => fetchTasks())
      .catch((err) => console.log(err));

    setTitle("");
    setCreatedBy("");
    setColumn("");
    onHide();
  };

  return (
    <div className="addCardModal">
      <Modal isOpen={show} onRequestClose={onHide}>
        <h1 className="modal_heading">Add New Card</h1>
        <input
          type="text"
          value={createdBy}
          onChange={handleCreatedByChange}
          placeholder="Created By"
        ></input>
        <textarea
          rows={2}
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

export default AddCardModal;
