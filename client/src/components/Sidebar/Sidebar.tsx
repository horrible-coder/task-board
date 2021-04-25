import "./Sidebar.scss";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import SettingsIcon from "@material-ui/icons/Settings";
import TableChartIcon from "@material-ui/icons/TableChart";
import { useState } from "react";
import AddCardModal from "../AddCardModal/AddCardModal";
import FilterCardsModal from "../FilterCardsModal/FilterCardsModal";
import { setCardList } from "../../redux/cards/actions";
import apis from "../../api";
import { useDispatch } from "react-redux";

export interface Props {}

const Sidebar: React.FC<Props> = () => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isFilterCardsModalOpen, setIsFilterCardsModalOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const dispatch = useDispatch();

  const fetchTasks = async () => {
    await apis
      .getCards()
      .then((data) => {
        dispatch(setCardList(data.data.cards));
      })
      .catch((err) => console.log(err));
  };

  const handleFilterIconClick = (event: React.MouseEvent<HTMLOrSVGElement>) => {
    if (isFilterApplied) {
      fetchTasks();
      setIsFilterApplied(false);
    } else {
      setIsFilterCardsModalOpen(true);
      setIsAddCardModalOpen(false);
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="sidebar_container">
          <li className="logo">
            <TableChartIcon />
          </li>
          <li className="sidebar_item">
            <AddIcon
              onClick={() => {
                setIsAddCardModalOpen(true);
                setIsFilterCardsModalOpen(false);
              }}
            />
            <span className="sidebar_item_text">New Task</span>
          </li>
          <li className="sidebar_item">
            <FilterListIcon
              onClick={handleFilterIconClick}
              style={
                isFilterApplied
                  ? {
                      backgroundColor: "white",
                      color: "darkgrey",
                      padding: "0.5rem",
                      borderRadius: "50px",
                    }
                  : { color: "white" }
              }
            />
            <span className="sidebar_item_text">Filter</span>
          </li>
          <li className="sidebar_item">
            <SettingsIcon />
            <span className="sidebar_item_text">Settings</span>
          </li>
        </ul>
      </div>
      <AddCardModal
        show={isAddCardModalOpen}
        onHide={() => setIsAddCardModalOpen(false)}
      />
      <FilterCardsModal
        show={isFilterCardsModalOpen}
        onHide={() => setIsFilterCardsModalOpen(false)}
        setIsFilterApplied={setIsFilterApplied}
      />
    </>
  );
};

export default Sidebar;
