import "./Card.scss";
import { Task } from "../Board/Board";
import React, { useState } from "react";
import CardDetailsModal from "../CardDetailsModal/CardDetailsModal";
import ClearIcon from "@material-ui/icons/Clear";
import apis from "../../api";
import { useDispatch } from "react-redux";
import { setCardList } from "../../redux/cards/actions";
import { format } from "date-fns";

export interface Props {
	task: Task;
	color: string;
	onDragStart: any;
}

const Card: React.FC<Props> = ({ task, color, onDragStart }) => {
	const [isCardDetailsModalOpen, setIsCardDetailsModalOpen] = useState(false);
	const dispatch = useDispatch();

	const fetchTasks = async () => {
		await apis
			.getCards()
			.then((data) => {
				dispatch(setCardList(data.data.cards));
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteButton = async (event: any) => {
		event.stopPropagation();
		const taskId = event.currentTarget.id;
		await apis
			.deleteCard(taskId)
			.then((res) => fetchTasks())
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div
				className="card"
				draggable
				onDragStart={(event) =>
					onDragStart(event, task.id + " - " + task.task_column)
				}
				onClick={() => setIsCardDetailsModalOpen(true)}
			>
				<div className="user_info" style={{ backgroundColor: color }}>
					<div className="card_id">
						<p>{task.id}</p>
					</div>
					<p className="card_created_by">{task.created_by}</p>
					<ClearIcon id={task.id.toString()} onClick={handleDeleteButton} />
				</div>
				<div className="status_content">
					<p className="status_text">{task.title}</p>
				</div>
				<div className="update_date">
					<p>{format(new Date(task.updatedAt), "dd MMM, yyyy hh:mm")}</p>
				</div>
			</div>
			<CardDetailsModal
				show={isCardDetailsModalOpen}
				onHide={() => setIsCardDetailsModalOpen(false)}
				task={task}
			/>
		</>
	);
};

export default Card;
