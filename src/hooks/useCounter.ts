import { useEffect, useState } from "react";
import { Ticket } from "./useTicket";

interface Counter {
	id: number;
	online: boolean;
	ticket: Ticket | null;
}

const URL = "http://localhost:5000/counters";

const useCounters = () => {
	const [counters, setCounters] = useState<Counter[]>([]);

	const fetchCounters = async () => {
		const response = await fetch(URL);
		const data: Counter[] = await response.json();
		setCounters(data);
	};

	const toggleStatus = async (index: number) => {
		const counter = counters[index];
		const updatedStatus = { online: !counter.online };
		await fetch(`${URL}/${counter.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedStatus),
		});
		setCounters((prevCounters) => prevCounters.map((c, i) => (i === index ? { ...c, online: !c.online } : c)));
	};

	const updateCounter = async (id: number, ticket: Ticket | null) => {
		await fetch(`${URL}/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ticket }),
		});

		setCounters((prevCounters) => prevCounters.map((counter) => (counter.id === id ? { ...counter, ticket } : counter)));
	};

	useEffect(() => {
		fetchCounters();
	}, []);

	return { counters, toggleStatus, updateCounter };
};

export default useCounters;
