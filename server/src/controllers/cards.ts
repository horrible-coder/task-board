import Cards from "../models/cards";

interface Card {
	id: number | string;
	title: string;
	createdBy: string;
	taskColumn: string;
}

export const getCards = async () => {
	const res = await Cards.findAll();
	return res;
};

export const addCard = async (data: Card) => {
	const res = await Cards.create({
		title: data.title,
		created_by: data.createdBy,
		task_column: data.taskColumn,
	});
	return res;
};

export const updateCard = async (data: Card) => {
	const res = await Cards.update(
		{
			title: data.title,
			created_by: data.createdBy,
			task_column: data.taskColumn,
		},
		{ where: { id: data.id } }
	);
	return res;
};

export const moveCard = async (data: Card) => {
	const res = await Cards.update(
		{ task_column: data.taskColumn },
		{ where: { id: data.id } }
	);
	return res;
};

export const deleteCard = async (data: any) => {
	const res = await Cards.destroy({ where: { id: data } });
	return res;
};
