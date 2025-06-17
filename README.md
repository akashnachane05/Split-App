# Split App – Backend Assignment

## 📌 Project Overview
A backend system to split group expenses fairly and calculate simplified settlements.

## 🚀 Hosted Backend & Frontend
🔗 https://split-app-production-7372.up.railway.app/

## ⚙️ Tech Stack
- Node.js + Express
- MongoDB Atlas
- Railway

## 📂 API Endpoints

### ➤ Expense Management
- POST /expenses
- GET /expenses
- PUT /expenses/:id
- DELETE /expenses/:id

### ➤ Settlements
- GET /balances
- GET /settlements
- GET /people

## 🧪 Postman Collection
🔗 [Public Gist Link](https://gist.github.com/akashnachane05/59c9252c88e6d2f6dfbcaa9f83aa6a89)

## 🧾 Sample Test Data
- People: Shantanu, Sanket, Om
- Expenses:
  - Dinner ₹600 (Shantanu)
  - Groceries ₹450 (Sanket)
  - Petrol ₹300 (Om)
  - Movie Tickets ₹500 (Shantanu)
  - Pizza ₹280 (Sanket)

## ✅ Features
- Add / Update / Delete expenses
- Auto-track people
- Calculate individual balances
- Generate simplified settlements

## 🧠 Logic Summary
Each person's share is calculated equally among participants.
Balances are computed by comparing paid vs fair share.
Settlements minimize number of transactions between people.

🛠️ Setup Instructions
1. Clone the Repo
git clone https://github.com/akashnachane05/Split-App.git
cd Split-App

