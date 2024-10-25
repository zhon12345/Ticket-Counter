import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "./NotFound.module.css";

function NotFound() {
	return (
		<Container className={styles["not-found"]}>
			<div className={styles.message}>
				<h1>Error 404: Page Not Found</h1>
				<p>Uh Oh, we've search high and low but could not find what you're looking for. Let's head back!</p>

				<Link to="/" className="btn btn-primary">
					Back to Home
				</Link>
			</div>
		</Container>
	);
}

export default NotFound;
