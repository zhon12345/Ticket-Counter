# Ticket Counter

An interview challenge to create a Ticket Counter Website with separate pages for customer and counter manager. It is built using **Vite**, **React.js** and **TypeScript**.

**Date submitted:** 25th October 2024

## Features

-   **User-friendly Interface**: Simple and intuitive design for both customers and counter managers.
-   **Dynamic Ticket Generation**: Automatically generates a unique ticket number for customers.
-   **Counter Management**: Counter managers can easily toggle the counter's status between online and offline.
-   **Ticket Resolution**: Allows counter managers to resolve tickets with one click.
-   **Automatic Ticket Assignment**: The system automatically assigns any new tickets to available counters.

## Installation

To run the project locally, follow these steps:

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/prebuilt-installer)

### Setup

1. Clone the repository

```bash
  https://github.com/zhon12345/Ticket-Counter.git
```

2. Navigate to the project directory

```bash
  cd Ticket-Counter
```

3. Install dependencies:

```bash
  npm install
```

4. Start the server:

```bash
  npm run dev
```

5. The website will run on `http://localhost:5173` by default.

## Usage

-   **Customer View** (`/`): Click "Get Number" to generate a unique ticket number.

-   **Counter Manager** (`/manage`): Use the toggle switch to switch the counter between online or offline. Click "Resolve" to resolve the current ticket; if a new ticket is available, it will be automatically assigned to the counter.
