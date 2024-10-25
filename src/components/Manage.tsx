import { useEffect } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import useCounters from "../hooks/useCounter";
import useTickets, { Ticket } from "../hooks/useTicket";
import Counter from "./Counter";
import styles from "./Manage.module.css";

function Manage() {
	const { counters, toggleStatus, updateCounter } = useCounters();
	const { tickets, updateTicket, markResolved } = useTickets();

	const assignTickets = async () => {
		let available = tickets.filter((ticket) => !ticket.assigned);

		for (const counter of counters) {
			if (counter.online && counter.ticket === null && available.length > 0) {
				const toAssign = available.shift();
				if (toAssign) {
					counter.ticket = toAssign;
					toAssign.assigned = true;
					await updateTicket(toAssign.id, toAssign);
					await updateCounter(counter.id, toAssign);
				}
			}
		}
	};

	const resolveTicket = async (ticket: Ticket | null) => {
		if (ticket !== null) {
			const counter = counters.find((counter) => counter.ticket?.id === ticket.id);

			if (counter) {
				const userNumber = localStorage.getItem("userNumber");
				if (userNumber && Number(userNumber) === ticket.number) {
					localStorage.removeItem("userNumber");
				}

				counter.ticket = null;
				await updateCounter(counter.id, null);
				await markResolved(ticket.number);
			}
		}
	};

	useEffect(() => {
		assignTickets();
	}, [counters, tickets]);

	return (
		<Container className={styles.container}>
			<div className="tickets">
				<h3>Ticket Queue</h3>
				<ListGroup as="ol" numbered>
					{tickets.map(
						(ticket) =>
							!ticket.assigned && (
								<ListGroup.Item as="li" key={ticket.id} className="d-flex justify-content-between align-items-start">
									<div className="ms-2 me-auto">
										<div className="fw-bold">{ticket.number}</div>
									</div>
								</ListGroup.Item>
							)
					)}
				</ListGroup>
			</div>

			<div className="counters">
				<Row xs={2} className="g-3">
					{counters.map((counter, index) => (
						<Counter key={index} index={counter.id} online={counter.online} ticket={counter.ticket} isManage={true} onToggle={() => toggleStatus(index)} onResolve={() => resolveTicket(counter.ticket)} />
					))}
				</Row>
			</div>
		</Container>
	);
}

export default Manage;
