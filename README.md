# SmartSpend

Your intelligent budget tracker! It revolutionizes how people budget and spend by connecting to Bank X’s accounts and
using a smart tracking system. Through real-time monitoring, valuable insights can be gained to help prevent overspending and gain financial discipline.

## Running the project
### Using npm
```
cd SmartSpend
npm install
npx expo start
```
### Using bun
```
cd SmartSpend
bun install
bun expo start
```


## Requirements

- a mock bank database
- DB Api: that approves transactions
- Allows user to categorise transactions
- User verification (OTP)
- Warning notification once close to limit
- Graph that displays spending (bar graph or bar graph) over TBD lengths

## Flow

### Onboarding
![Onboarding Flow](https://github.com/d-sql/smart-spend/blob/58ec17e9987e2d811772ab02cc0275ab32d7e62e/assets/SmartSpend%20Flow-Onboarding.png)

### App
![App Flow](https://github.com/d-sql/smart-spend/blob/58ec17e9987e2d811772ab02cc0275ab32d7e62e/assets/SmartSpend-App-Flow.png)

## Database Design

## V2
![DB Schema V2](https://github.com/d-sql/smart-spend/blob/58ec17e9987e2d811772ab02cc0275ab32d7e62e/assets/SmartSpend-App-DB-schema-v2.png)

### V1
#### User
- id
- first_name
- middle_name
- last_name
- email
- phone_number
- address
- identity_number

#### TransactionType ("withdrawal", "deposit", "eft")
- id
- name

#### Account
- id
- user (FK on User(id))

#### Transaction
- id
- to_account (FK on Account(id))
- from_account (FK on Account(id))
- date
- amount
- reference
- type (FK on TransactionType(id))



## Rubric

## Description
- Consuming API: A mock bank database that allows SmartSpend to remotely access user bank transactions in real time.

-  User Interface: A user-friendly interface where budget categories (e.g., food, rent, insurance) are set and allocated specific amounts. Application of sound mobile application UI and UX concepts should be demonstrated.

-  Bank Operations: The user approves each transaction using the SmartSpend app after the app crosschecks with the user’s preset budget. categories will be determined manually or through code implementing specific criteria. General security and confidentiality aspects of the app should be implemented. Appropriate developer comments should be sufficient, and not too many.


- Notifications & Visualisations: An appropriate warning is issued when a user is about to overspend or close to reaching the budget limits of a category. Use visual indicators, such as progress bars or color-coded categories, to highlight whether they are within or over budget. Other valuable insights including historical spending should also be provided.

