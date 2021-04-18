import { useEffect } from "react";
import Card from "../Card/Card";
import apis from "../../api/index";
import "./Board.scss";
import { setCardList } from "../../redux/cards/actions";
import { useDispatch, useSelector } from "react-redux";

export interface Props {}

export interface Task {
  id: number;
  title: string;
  created_by: string;
  task_column: string;
}

//const defaultTasks: Task[] = [];

const Board: React.FC<Props> = () => {
  /* const [tasks, setTasks]: [Task[], (tasks: Task[]) => void] = useState(
    defaultTasks
  );
  const [tasks, setTasks] = useState<Task[]>([]) */
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.cardList.cardList);

  const fetchTasks = async () => {
    await apis
      .getCards()
      .then((data) => {
        //setTasks(data.data.cards);
        dispatch(setCardList(data.data.cards));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="board">
      <div className="todo_column">
        <div className="column_header">To Do</div>
        <div className="cards">
          {tasks.map(
            (task: Task) =>
              task.task_column === "To Do" && (
                <Card key={task.id} task={task} color="#5FCFFC" />
              )
          )}
        </div>
      </div>
      <div className="in_progress_column">
        <div className="column_header">In Progress</div>
        <div className="cards">
          {tasks.map(
            (task: Task) =>
              task.task_column === "In Progress" && (
                <Card key={task.id} task={task} color="#FCB35F" />
              )
          )}
        </div>
      </div>
      <div className="done_column">
        <div className="column_header">Done</div>
        <div className="cards">
          {tasks.map(
            (task: Task) =>
              task.task_column === "Done" && (
                <Card key={task.id} task={task} color="#5FFC9B" />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
