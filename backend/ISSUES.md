
---
Urls --> budgets/<str:user>/

are recognizing "budgets/user2ahoiwh" as User2 and returning that User (Correct this)

- This issue persists with Budgets, Loans, Savings, and Stocks


---
Plaid API - integration

Procedure (Flow):
1. User registers through frontend
2. User auto or manually logs-in
3. User is prompted to register their banking accounts through Plaid API
4. User registers with credentials (Sends credentials to backend)
5. Backend establishes WebHook with those credentials (and saves credentials and WebHook url to DB)
6. IF ERROR --> send ERROR back to the frontend (ex: credentials or connection error)
7. When updates are sent to that WebHook url (backend functions are triggered: updating the DB...)

- So as seen, Requirements to establish WebHook (registered and logged in User).

- We will probably have to list the Banks/ Financial platforms we support.

Example endpoint: 8000/plaid/webhook/user_id
(Maybe something extra if we need different endpoints for Budgets, Loans, Savings, and Stocks)


Plaid Environment:
1. Production --> Unlimited Access to real data (but billed for usage)
2. Development  --> real data @ real banks (but limited # of accounts)
3. Sandbox --> fake data

---

New Dependencies after Plaid Integration for Requirements.txt:
1. plaid-python==27.0.0 --> Django dependency
2. "react-plaid-link": "^3.6.1" --> React dependency


---

Plan of Attack for Next Sprint:

Services Required:
1. Monthly Income
2. Monthly Expenses
3. Budgets --> savings goal<int>, current spending<int>
4. Monthly subscriptions (recurring transactions)
5. Transactions (All)

Services Plaid Provides:
    "assets",
    "balance",
    "signal",
    "identity",
    "identity_match",
    "income_verification",
    "liabilities",
    "recurring_transactions",
    "auth",
    "transactions"


Plaid Sandbox Limitations:
    auth, transactions, etc. returns the same JSON no matter the access_code you use.
