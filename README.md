# 🎓 Student Life Toolkit
## Overview
The Student Life Toolkit is a comprehensive React-based web application designed to address common challenges faced by students, streamlining their academic and personal responsibilities. The application integrates tools for managing class schedules, tracking budgets, generating exam practice questions, and planning study tasks. It features two unique components: a Synonyms & Antonyms Tool to enhance vocabulary for academic writing and a Quick Overview Dashboard with an interactive task manager to keep students organized. Built with modern web technologies, including a backend for data persistence, the toolkit ensures a responsive, user-friendly, and visually appealing experience.
---

## 🚀 Features

### 📅 Class Schedule Tracker

Functionality: Enables students to manage their class schedules.
Capabilities:
- Add, edit, or delete classes with details such as subject, time, day, and instructor.
- Color-coded subjects for visual clarity.
- Displays schedule view to avoid missing lectures.


Validation: Validates time formats (e.g., HH:MM) .
Error Handling: Provides user-friendly messages (e.g., "Invalid time format").

![Schedule Tracker Screenshot](./screenshots/Schedule.png)

### 💰 Budget Tracker

Functionality: Assists students in managing their finances.
Capabilities:
- Add income (e.g., allowance, scholarships, part-time jobs).
- Record expenses (e.g., food, transport, books).
- Visualize financial data using Chart.js (e.g., pie charts for income & expense categories).
- Displays income, expenses, and balance in the Quick Overview dashboard.


Validation: Ensures numerical inputs are positive and valid.
Error Handling: Alerts users to invalid entries (e.g., "Expense cannot be negative").

![Budget Tracker Screenshot](./screenshots/Budget.png)

### 📝 Exam Q&A Generator

Functionality: Supports exam preparation by generating practice questions.
Capabilities:
- Generates random Multiple Choice questions based on selected subjects.
- Allows customization of difficulty levels (Easy, Medium, Hard).
- Provides instant score with true answer when clicking submit button.
- Helps students practice for exams.


Validation: Ensures questions match the selected subject and difficulty.
Error Handling: Notifies users if no questions are available.

![Exam Q&A Screenshot](./screenshots/ExamQ.png)
![Exam Q&A Generator Screenshot](./screenshots/ExamQ2.png)

### 📖 Study Planner

Functionality: Breaks down study goals into manageable tasks.
Capabilities:
- Create subject/topic, priority (Low, Medium, High), and deadlines.
- Allocate time slots in planner.
- Stay organized with reminders and task management.


Error Handling: Displays warnings for scheduling issues.

![Study Planner Screenshot](./screenshots/StudyPlanner.png)

### 🌟 Unique Feature: Synonyms & Antonyms Tool

Functionality: Enhances students’ vocabulary for academic writing and comprehension.
Capabilities:
- Fetches synonyms and antonyms for a given word using the Dictionary API.
- Displays results in a visually appealing format with color-coded tags (green for synonyms, red for antonyms).
- Includes an accordion with tips for mastering vocabulary (e.g., memory tricks, reading strategies).
- Animated UI with Framer Motion and error handling via react-hot-toast.


Impact: Improves students’ language skills, crucial for essays, exams, and communication.

![Synonyms & Antonyms Screenshot](./screenshots/Synonym.png)

### 🌟 Unique Feature 2: Quick Overview Dashboard with Task Manager

Functionality: Provides a centralized dashboard for key student activities.
Capabilities:
- Displays the last added class, budget overview (income, expenses, balance), exam prep link, and a motivational quote.
- Interactive task manager allows adding, viewing, and deleting tasks with a modal interface.
- Animates components with Framer Motion for a dynamic user experience.


Impact: Keeps students organized by offering a quick snapshot of their responsibilities and progress.

![ Quick Overview Dashboard with Task Manager Screenshot](./screenshots/Overview.png)


### 🌟 Unique Feature 3: Motivational Quotes

Functionality: Provides a Motivational Quote to keep them motivated.
Capabilities:
- Display Motivation
- Help them mentally

![ Motivational Quotes Screenshot](./screenshots/Motivation.png)

## 🛠️ Tech Stack

### Frontend
React
Tailwind CSS / DaisyUI (for responsive styling)
Axios / Fetch API 
Framer Motion (for animations)
Chart.js (for budget visualizations)
react-hot-toast (for notifications)
Firebase for Authentication/Login
### Backend
Node.js with Express
MongoDB (for persistent storage of classes, budgets, and tasks).
### Others
APIs: Dictionary API (for Synonyms & Antonyms), RealInspire API (for motivational quotes).
Cors 
dotenv


Deployment: Hosted on Vercel for seamless access.

## 📂 Project Structure
student-life-app/
- │── backend/ # Backend API (Node.js, Express, MongoDB)
- │── frontend/ # React app (UI + client logic)
- │── README.md # Documentation

Setup Instructions
Prerequisites

Node.js (v16 or higher)
npm or yarn
MongoDB account (for backend database)

Installation

Clone the Repository: git clone https://github.com/Tandith0005/student-life-toolkit
cd student-life-toolkit


Install Dependencies: npm install


Set Up Environment Variables:
Create a .env file in the client and server.
Add the following:MONGODB_URI= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@practicecoffee.ru33usd.mongodb.net/?retryWrites=true&w=majority&appName=PracticeCoffee`
PORT=5000




Run the Backend:cd backend
npm run dev


Run the Frontend:cd frontend
npm run dev


Access the Application:
Open http://localhost:5173 in your browser.
Open http://localhost:5000 in your browser.




Quick Overview Dashboard: Displays last class, budget, tasks, and motivational quote.
Synonyms & Antonyms Tool: Input word and view results with tips accordion.
Class Schedule Tracker: Weekly calendar view with color-coded classes.
Budget Tracker: Pie chart of expenses and financial overview.
Exam Q&A Generator: Sample quiz interface with feedback.
Study Planner: Task list with priorities and deadlines.

Submission Details

Hosted Project Link: Vercel Link
GitHub Repository: [GitHub Link](https://github.com/Tandith0005/student-life-toolkit)
Presentation Video: Video Link (5–10 minutes showcasing features and functionalities)
Submission Form: Google Form
Deadline: September 10, 2025


Future Enhancements:
Integration with Google Calendar for automatic syncing of classes and tasks.
Offline support for accessing schedules and tasks without internet.
AI-powered study tips based on user performance and task completion.

Contact
For questions or feedback, please reach out via the GitHub repository or the submission form.