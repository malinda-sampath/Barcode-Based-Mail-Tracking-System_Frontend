# **University of Ruhuna - Mail Tracking System (Frontend)**

## **Overview**

The **Mail Tracking System** frontend for the University of Ruhuna is a user-friendly web interface designed to provide seamless interaction with the backend system. Developed using **React** and **Tailwind CSS**, the frontend ensures an intuitive user experience for Super Admins, Mail Admins, and Branch Agents while offering real-time mail tracking updates for faculty and students. 

This repository contains all the necessary code and configurations for the frontend application, focusing on simplicity, efficiency, and responsiveness.

---

## **Features**

- **Role-Based Dashboards**:
  - Customized views for Super Admins, Mail Admins, and Branch Agents.
  - Real-time updates on mail activities, claimed/unclaimed statuses, and performance metrics.

- **Mail Tracking Portal**:
  - Allow faculty and students to monitor mail status and activate urgent tracking services.

- **Interactive UI**:
  - Built with **React** for dynamic functionality.
  - Styled with **Tailwind CSS** for a responsive and modern design.

- **Barcode Integration**:
  - Support for scanning and entering barcode IDs to claim mail or track updates.

- **Notifications**:
  - Display alerts and status messages for pending mail and urgent updates.

---

## **Technologies Used**

- **React**: Core framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Axios**: For seamless API integration with the backend.
- **React Router**: For navigation and routing between different pages.
- **Redux (Optional)**: State management for consistent data flow.
- **Postman**: Used during development to test backend API endpoints.

---

## **Setup Instructions**

### **Prerequisites**

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### **Steps to Setup**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/malinda-sampath/mail-tracking-frontend.git
   cd mail-tracking-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add the backend API base URL:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start the Development Server**:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

---

## **Project Structure**

- **src/components**: Reusable UI components.
- **src/pages**: Screens for various user roles (e.g., dashboards, mail tracking portal).
- **src/services**: API service functions using Axios.
- **src/styles**: Custom Tailwind CSS styles and configurations.
- **src/store**: State management using Redux (if applicable).

---

## **Key Pages**

- **Super Admin Dashboard**: Manage users, branches, and monitor system performance.
- **Mail Admin Dashboard**: Record incoming mail, generate barcodes, and track mail status.
- **Branch Agent Dashboard**: View and claim daily mail records.
- **Mail Tracking Portal**: Accessible to faculty and students for real-time updates.

---

## **Future Enhancements**

- Add a **mobile-friendly version** for improved accessibility.
- Introduce **push notifications** for urgent mail updates.
- Integrate advanced **analytics dashboards** for Super Admins.

---

## **Contributors**

| Name                  | Stack/Role                       |
| --------------------- | -------------------------------- |
| G.K. Malinda Sampath  | FullStack Developer/Team Lead    |
| L.A.S. Ayeshani       | FullStack Developer              |
| M.R. Hewage           | FullStack Developer              |
| A.M.T.P. Aththanayaka | FullStack Developer              |
| S.S.N. Edirisinghe    | Backend Developer                |
| K.P.G.L.R. Kossinna   | Frontend Developer               |
| D.M.G.C. Sandakelum   | Frontend Developer               |

---
