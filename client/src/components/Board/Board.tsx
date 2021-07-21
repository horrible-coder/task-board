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
	createdAt: string;
	updatedAt: string;
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

	const onDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		card_id: string
	) => {
		event.dataTransfer.setData("id", card_id);
	};

	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDrop = async (
		event: React.DragEvent<HTMLDivElement>,
		taskColumn: string
	) => {
		let cardInfo = event.dataTransfer.getData("id");
		if (cardInfo.split(" - ")[1] === taskColumn) {
			return;
		}
		let id = cardInfo.split(" - ")[0];
		const payload = {
			id,
			taskColumn,
		};
		await apis
			.moveCard(payload)
			.then((res) => fetchTasks())
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="board">
			<div
				className="todo_column"
				onDragOver={(event) => onDragOver(event)}
				onDrop={(event) => {
					onDrop(event, "To Do");
				}}
			>
				<div className="column_header">To Do</div>
				<div className="todo_cards">
					{tasks.map(
						(task: Task) =>
							task.task_column === "To Do" && (
								<Card
									key={task.id}
									task={task}
									color="#5FCFFC"
									onDragStart={onDragStart}
								/>
							)
					)}
				</div>
			</div>
			<div
				className="in_progress_column"
				onDragOver={(event) => onDragOver(event)}
				onDrop={(event) => {
					onDrop(event, "In Progress");
				}}
			>
				<div className="column_header">In Progress</div>
				<div className="in_progress_cards">
					{tasks.map(
						(task: Task) =>
							task.task_column === "In Progress" && (
								<Card
									key={task.id}
									task={task}
									color="#FCB35F"
									onDragStart={onDragStart}
								/>
							)
					)}
				</div>
			</div>
			<div
				className="done_column"
				onDragOver={(event) => onDragOver(event)}
				onDrop={(event) => {
					onDrop(event, "Done");
				}}
			>
				<div className="column_header">Done</div>
				<div className="done_cards">
					{tasks.map(
						(task: Task) =>
							task.task_column === "Done" && (
								<Card
									key={task.id}
									task={task}
									color="#5FFC9B"
									onDragStart={onDragStart}
								/>
							)
					)}
				</div>
			</div>
		</div>
	);
};

export default Board;
