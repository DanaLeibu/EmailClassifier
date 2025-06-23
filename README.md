📧 Phishing Email Detection & Gmail Add-on

🧠 Overview
This project aims to detect phishing emails using both rule-based heuristics and a machine learning model, and to integrate the detection into Gmail via a Google Workspace Add-on. It enables users to scan an email with a click and receive a phishing classification.



🚀 Features
Phishing Email Detection System (Python)
✅ Rule-based classification (suspicious links, misleading senders, urgent language).
✅ Machine Learning model (Decision Tree) trained on a custom dataset.
✅ Email parsing using Python's email module.
✅ Classification output: Safe, Suspicious, or Phishing.

Gmail Add-on (Apps Script)
✅ UI button "Check Email" inside Gmail.
✅ Sends email metadata (sender, subject, body) to the backend via HTTP POST.
✅ Shows classification result inside Gmail UI.
✅ Communicates with a Python Flask backend deployed externally (Render).

📬 2. Gmail Add-on Setup (Frontend)
To integrate the classifier with Gmail:

1) Go to Google Apps Script and create a new project.
2) Paste the content of your code.gs file (included in this repository).
3) Replace this placeholder line: 
const response = UrlFetchApp.fetch("https://your-server-url.com/classify", options) with your actual backend URL
4) Go to Deploy → Test deployments or Deploy → Add-on.
5) Set the deployment type to: Workspace Add-on with Gmail scope
6) Authorize the required permissions
7) Open Gmail, and you'll see the add-on in the right-hand panel.

"Check Email" button will send the content to your backend for classification.

📉 Limitations
Doesn’t handle attachments or embedded HTML parsing
Email classification model is trained on a small dataset (~100 examples)
No confidence score returned from the classification model


🌱 Possible Improvements
Add confidence score
Add support for email header analysis and HTML body parsing.


