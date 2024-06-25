# Module 8 Journal Reponses

1. **Architecture**
- Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
   - Express HTML involves using the Express framework to render HTML on the server, which is then sent to the client's browser, leading to full page reloads for navigation and better SEO due to server-side rendering. In contrast, JavaScript, often used with frameworks like React or Angular, runs on the client-side to dynamically update the content without full page reloads, allowing for more interactive and responsive user experiences. A single-page application (SPA) takes this further by loading a single HTML page and dynamically updating content as the user interacts with the app, offering a seamless and fast navigation experience similar to desktop applications, though potentially less SEO-friendly due to its client-side nature.
- Why did the backend use a NoSQL MongoDB database?
   - The syntax used when working with MongoDB is very similar to object notation used when working in JavaScript.

2. **Functionality**
- How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
   - JSON is a lightweight data interchange format that is easy to read and write, used primarily to transmit data between a server and a web application. Unlike JavaScript, which is a full-fledged programming language used to create dynamic and interactive web content, JSON is just a format for structuring data. JSON ties together frontend and backend development by providing a common format for data exchange, allowing the frontend to send requests and receive responses in a consistent and easily parseable format from the backend, facilitating seamless communication between the two.
- Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
   - Changing the application to an SPA helped a lot in increasing the efficiency of the project. Being able to create reusable UI components significantly cut down on reused code and freed up a lot of time that could be spent elsewhere.
 
3. **Testing**
- Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.
   - In a full stack application, methods refer to the HTTP methods (GET, POST, PUT, DELETE) used to perform actions on resources. Endpoints are specific URLs or routes in the server that handle these HTTP requests, often defined in the backend to perform operations like retrieving data, creating new entries, updating existing data, or deleting records. Security in a full stack application involves measures to protect data and ensure that only authorized users can perform certain actions. This includes implementing authentication (verifying user identity), authorization (ensuring users have permission to access resources), and data encryption (protecting data in transit and at rest), as well as following best practices like input validation and using HTTPS to secure communications.

4. **Reflection**
- How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
   - Through the completion of this course I have gained knowledge of new web development technologies and refined my existing abilities in parts of the MEAN stack. I also have added a valuable entry to my professional portfolio which I can use to showcase my skills to potential employers.

# Travlr Getaways

## Description
Travlr Getaways is a mock travel booking website. Users can register accounts as a regular user, an agent, or an admin. Regular users, known as travelers, can view available trips and bookings made for them. Agents can do all of the same but can also book trips for other users. Admin users have all of the above but can also add, edit, and delete trips from the database.

## Installation Instructions
To set up the project, follow these steps:

1. **Clone the Repository**: 
   ```sh
   git clone https://github.com/jciii91/cs465-fullstack.git
   cd cs465-fullstack

2. **Install Backend Dependencies**:
   ```sh
   npm install

3. **Start the Backend**:
   ```sh
   npm start

4. **Navigate to Frontend Directory and Install Dependencies**:
   ```sh
   cd app_admin
   npm install

5. **Start the Frontend**:
   ```sh
   ng serve

## Usage Instructions
To fully experience the functionality of the Travlr Getaways application, follow these steps:

1. **Register Users**: 

- Register at least four travelers at /register.
- Register at least two agents at /register/agent.
- Register one admin at /register/admin.
- Login and Book Trips:

2. **Login and Book Trips**:
- Log in as agents and book trips for different users.
- Log in as travelers to view available trips and their bookings.
- Log in as an admin to add, edit, and delete trips.

3. **View Dashboard**:

- Check the respective dashboards for travelers, agents, and the admin to see how the application filters results based on who is logged in.

## Technologies Required
To run this project, you need to have the following technologies installed:
- **Node.js**: Download and Install Node.js
- **Angular CLI**: Install via npm
  ```sh
  npm install -g @angular/cli
- **MongoDB**: Download and Install MongoDB
- **Express.js**: Included in the project dependencies
- **Angular**: Included in the project dependencies
- **Node Package Manager (npm)**: Comes with Node.js

## License
This project is licensed under the MIT License.

## Contact Information
For any questions or issues, please contact John Costello at jcostello711@gmail.com.
