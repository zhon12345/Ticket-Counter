import { useEffect, useState } from "react";

export interface Ticket {
	id: string;
	number: number;
	assigned: boolean;
}

const URL = "http://localhost:5000/tickets";

const useTickets = () => {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [resolved, setResolved] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const response = await fetch(URL);
				if (!response.ok) {
					throw new Error("Failed to fetch tickets");
				}
				const data = await response.json();
				setTickets(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchTickets();
	}, [setTickets]);

	const addTicket = async (number: number) => {
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ number, assigned: false }),
			});
			if (!response.ok) {
				throw new Error("Failed to add ticket");
			}
			const newTicket = await response.json();
			setTickets((prevTickets) => [...prevTickets, newTicket]);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	const updateTicket = async (id: string, ticket: Ticket) => {
		await fetch(`${URL}/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(ticket),
		});

		setTickets((prevTickets) => prevTickets.map((prevTicket) => (prevTicket.id === id ? { ...prevTicket, ...ticket } : prevTicket)));
	};

	const markResolved = (number: number) => {
		setResolved((prevResolved) => [...prevResolved, number]);
	};

	return { tickets, resolved, loading, error, addTicket, updateTicket, markResolved };
};

export default useTickets;
