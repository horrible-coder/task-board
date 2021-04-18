import "./Card.scss";
import PersonIcon from "@material-ui/icons/Person";
import { Task } from "../Board/Board";

export interface Props {
  task: Task;
  color: string;
}

const Card: React.FC<Props> = ({ task, color }) => {
  return (
    <div className="card">
      <div className="user_info" style={{ backgroundColor: color }}>
        <PersonIcon />
        <p>{task.created_by}</p>
      </div>
      <div className="status_content">
        <p className="status_text">{task.title}</p>
      </div>
    </div>
  );
};

export default Card;
