# QuizTime

QuizTime is a web-based quiz application designed for creating, taking, and managing quizzes. Built with TypeScript, HTML, and SQL, it offers a user-friendly interface for both administrators and participants.

## Features

- Quiz Creation: Administrators can create and manage quizzes with multiple questions.
- User Authentication: Secure login system for users.
- Responsive Design: Optimized for both desktop and mobile devices.
- Real-time Results: Instant feedback and results after quiz submission.

## Technologies Used

- **Frontend:** HTML, TypeScript
- **Backend:** SQL for database management
- **Build Tools:** Vite for bundling and development server

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A SQL database set up for storing quiz data.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BalintoDaB/QuizTime.git
   ```
2. Navigate into the project directory:

```bash
cd QuizTime
```

3. Install the required dependencies:

```bash
npm install
```

4. Set up your SQL database and configure the connection in the project settings.

5. Run the development server:

```bash
npm run dev
```

6. Access the application at http://localhost:3000 in your web browser.

## Usage

### For Administrators

- Log in to the application using your admin credentials.
- Create new quizzes by adding questions and possible answers.
- Manage existing quizzes by editing or deleting them.
- Monitor user participation and quiz results through the admin dashboard.

### For Participants

- Browse and select from the list of available quizzes.
- Answer the quiz questions within the allotted time.
- Submit your answers to receive immediate feedback and results.

## Contributing

We welcome contributions to improve QuizTime! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request on the original repository.

Please make sure your code follows the existing style and includes relevant tests if applicable.

## License

This project is licensed under the [MIT License](LICENSE).
   
