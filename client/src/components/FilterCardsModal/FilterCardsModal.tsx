import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import apis from "../../api";
import { filterCards } from "../../redux/cards/actions";
import "./FilterCardsModal.scss";

export interface Props {
  show: boolean;
  onHide: any;
  setIsFilterApplied: any;
}

export interface User {
  id: number;
  email: string;
  password: string;
  fullname: string;
}

Modal.setAppElement("#root");

const FilterCardsModal: React.FC<Props> = ({
  show,
  onHide,
  setIsFilterApplied,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const dispatch = useDispatch();

  const fetchUsers = async () => {
    await apis
      .getUsers()
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked)
      setSelectedUsers([...selectedUsers, event.target.value]);
    else {
      const tempUsers = selectedUsers.filter(
        (user) => user !== event.target.value
      );
      setSelectedUsers(tempUsers);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!selectedUsers.length) return;
    dispatch(filterCards(selectedUsers));
    setIsFilterApplied(true);
    setSelectedUsers([]);
    onHide();
  };

  return (
    <div className="filterCardsModal">
      <Modal isOpen={show} onRequestClose={onHide}>
        <h1 className="modal_heading">Filter Cards</h1>
        <div className="modal_users_container">
          {users.map((user: User, index: number) => (
            <div className="modal_checkboxes" key={index}>
              <input
                type="checkbox"
                value={user.fullname}
                onChange={handleChange}
              />
              <label>{user.fullname}</label>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Apply</button>
      </Modal>
    </div>
  );
};

export default FilterCardsModal;
