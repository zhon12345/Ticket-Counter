import { Col, Card, Form, Badge, Button } from "react-bootstrap";
import styles from "./Counter.module.css";
import { Ticket } from "../hooks/useTicket";

interface Props {
	index: number;
	online: boolean;
	ticket: Ticket | null;
	isManage?: boolean;
	onToggle?: () => void;
	onResolve?: () => void;
}

function Counter({ index, online, ticket, isManage, onToggle, onResolve }: Props) {
	let hasNum = ticket !== null;

	return (
		<Col>
			<Card border={online ? (hasNum ? "danger" : "success") : "secondary"}>
				<Card.Body>
					{isManage ? (
						<Form.Check type="switch" id={`${index}`} checked={online} onChange={onToggle} />
					) : (
						<Badge bg={online ? (hasNum ? "danger" : "success") : "secondary"} className="position-absolute p-2 rounded-circle">
							<span className="visually-hidden">Status</span>
						</Badge>
					)}
					<Card.Title>Counter {index}</Card.Title>
					<Card.Text className={styles["card-text"]}>
						<strong>{online ? (ticket !== null ? ticket.number : "-") : "Offline"}</strong>
					</Card.Text>

					{isManage === true && (
						<Button variant="success" onClick={onResolve} disabled={!hasNum}>
							Resolve
						</Button>
					)}
				</Card.Body>
			</Card>
		</Col>
	);
}

export default Counter;
