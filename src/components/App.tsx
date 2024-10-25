import { useState, useEffect } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import useCounter from "../hooks/useCounter";
import useTicket from "../hooks/useTicket";
import Counter from "./Counter";
import styles from "./App.module.css";

function App() {
	const { counters } = useCounter();
	const { tickets, resolved, addTicket, loading, error } = useTicket();
	const [userNumber, setUserNumber] = useState<number | null>(null);

	const assigned = tickets.filter((ticket) => ticket.assigned);
	const nowServing = assigned.length ? Math.max(...assigned.map((ticket) => ticket.number)) : null;
	const lastNumber = resolved.reduce((highest, num) => Math.max(highest, num), nowServing !== null ? nowServing - 1 : 0);
	const currNumber = tickets.length ? Math.max(...tickets.map((ticket) => ticket.number)) : 1000;

	useEffect(() => {
		const userNumber = localStorage.getItem("userNumber");

		if (userNumber) {
			setUserNumber(Number(userNumber));
		}
	}, []);

	useEffect(() => {
		if (userNumber !== null) {
			localStorage.setItem("userNumber", userNumber.toString());
		}
	}, [userNumber]);

	const handleClick = async () => {
		const newTicket = currNumber + 1;
		addTicket(newTicket);

		setUserNumber(newTicket);
	};

	function UserNumber() {
		if (userNumber !== null) {
			return (
				<>
					<Card.Title>Your Number:</Card.Title>
					<Card.Text>
						<strong>{userNumber}</strong>
					</Card.Text>
				</>
			);
		}

		return (
			<Button variant="primary" onClick={handleClick}>
				Get Number
			</Button>
		);
	}

	if (loading) return <p>Loading tickets...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<Container>
			<div className={styles.numbers}>
				<Card className={styles.card}>
					<Card.Body className={styles["card-body"]}>
						<div className={styles.system}>
							<div className={styles.past}>
								<Card.Title>Last Number:</Card.Title>
								<Card.Text>
									<strong>{lastNumber}</strong>
								</Card.Text>
							</div>

							<div className={styles.current}>
								<Card.Title>Now Serving:</Card.Title>
								<Card.Text>
									<strong>{nowServing}</strong>
								</Card.Text>
							</div>
						</div>

						<div className={styles.user}>
							<UserNumber />
						</div>
					</Card.Body>
				</Card>
			</div>

			<div className="counters">
				<Row xs={4} className="g-3">
					{counters.map((counter, index) => (
						<Counter key={index} index={counter.id} online={counter.online} ticket={counter.ticket} />
					))}
				</Row>
			</div>
		</Container>
	);
}

export default App;
