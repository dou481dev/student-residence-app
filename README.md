# Student Residence Application System

A complete web application for managing student residence applications.

Frontend:
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- GitHub Pages compatible

Backend:
- Google Apps Script
- Google Sheets database
- Google Drive PDF storage
- Gmail notifications


---

# 1. Project Structure

```
Student-Residence-App

│
├── frontend
│   │
│   ├── index.html
│   │
│   ├── css
│   │   └── style.css
│   │
│   └── js
│       ├── app.js
│       └── validation.js
│
│
└── AppsScript
    │
    ├── Code.gs
    └── appsscript.json

```


---

# 2. Google Sheet Setup


Create a Google Sheet.

Copy the Spreadsheet ID from the URL.


Example:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```


Update in `Code.gs`:

```javascript
const SPREADSHEET_ID =
"YOUR_SHEET_ID";
```


The application will automatically create the header row:

```
Timestamp
Name
Mobile Number
Email ID
Date of Birth
Gender
State
BAC ID
Year
Residence PDF
IP Address
```


---

# 3. Google Drive Setup


Create a folder:

```
NEW STUDENTS
```


The backend will automatically upload:

```
BAC_NUMBER_Residence.pdf
```


Example:

```
37012345_Residence.pdf
```


---

# 4. Apps Script Installation


Open:

```
Extensions
    ↓
Apps Script
```


Delete existing files.

Add:

```
Code.gs
appsscript.json
```


Enable:

```
Project Settings
    ↓
Show appsscript.json
```


Replace the manifest.


---

# 5. Authorization


Run manually:

```
testCreateFile()
```

or deploy the Web App.

Google will request permissions:

Allow:

- Drive access
- Sheets access
- Gmail sending


---

# 6. Deploy Backend


Apps Script:

```
Deploy
   ↓
New Deployment
```


Select:

```
Type:
Web App
```


Settings:

```
Execute as:
Me


Who has access:
Anyone
```


Click:

```
Deploy
```


Copy URL:

Example:

```
https://script.google.com/macros/s/XXXXXXXX/exec
```


---

# 7. Connect Frontend


Open:

```
frontend/js/app.js
```


Find:

```javascript
const API_URL =
"YOUR_APPS_SCRIPT_WEB_APP_URL";
```


Replace with your deployment URL:


Example:

```javascript
const API_URL =
"https://script.google.com/macros/s/XXXXXXXX/exec";
```


Save.


---

# 8. GitHub Pages Deployment


Create repository:

```
student-residence-app
```


Upload only:

```
frontend
```


Repository:

```
student-residence-app

└── frontend
    ├── index.html
    ├── css
    └── js
```


For GitHub Pages:


```
Settings

↓

Pages

↓

Deploy from branch

↓

main

↓

/frontend
```


Your website will become:


```
https://username.github.io/student-residence-app/frontend/
```


---

# 9. Testing


Test these items:


## Form

✔ Name

✔ Phone number

✔ Email

✔ Municipality

✔ BAC number

✔ BAC year

✔ PDF upload



## Backend

Check:

Google Sheet:

```
Applications
```


Google Drive:

```
NEW STUDENTS
```


Email:

Student receives confirmation.

Admin receives notification.



---

# 10. Common Errors


## Error:

```
You do not have permission to call DriveApp
```


Solution:

Run the script manually once and authorize Drive access.



---


## Error:

```
Failed to fetch
```


Solution:

Check:

- Apps Script deployed as Web App
- Access = Anyone
- Correct API_URL



---


## Error:

```
PDF upload failed
```


Check:

- File is PDF
- Size less than 5MB
- Drive permission granted



---


# 11. Production Checklist


Before publishing:


☑ Change Spreadsheet ID

☑ Deploy Apps Script

☑ Update API_URL

☑ Test email sending

☑ Test PDF upload

☑ Test duplicate prevention

☑ Enable GitHub Pages



---

# Version

```
Student Residence Application v1.0
```
