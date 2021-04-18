import "./Sidebar.scss";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import SettingsIcon from "@material-ui/icons/Settings";
import TableChartIcon from "@material-ui/icons/TableChart";
import { useState } from "react";
import AddCardModal from "../AddCardModal/AddCardModal";

export interface Props {}

const Sidebar: React.FC<Props> = () => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  return (
    <>
      <div className="sidebar">
        <ul className="sidebar_container">
          <li className="logo">
            <TableChartIcon />
          </li>
          <li className="sidebar_item">
            <AddIcon onClick={() => setIsAddCardModalOpen(true)} />
            <span className="sidebar_item_text">New Task</span>
          </li>
          <li className="sidebar_item">
            <FilterListIcon />
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
    </>
  );
};

export default Sidebar;
