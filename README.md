# 📧 Phishing Email Detection & Gmail Add-on  

🧠 Overview
This project aims to detect phishing emails using both rule-based heuristics and a machine learning model, and to integrate the detection into Gmail via a Google Workspace Add-on. It enables users to scan an email with a click and receive a phishing classification.


# 🚀 Phishing Email Detection System 
✅ Rule-based classification (suspicious links, misleading senders, urgent language).  
✅ Machine Learning model (Decision Tree) trained on a custom dataset.  
✅ Email parsing using Python's email module.  
✅ Classification output: Safe, Suspicious, or Phishing.  

# Gmail Add-on 
✅ UI button "Check Email" inside Gmail.  
✅ Sends email metadata (sender, subject, body) to the backend via HTTP POST.  
✅ Shows classification result inside Gmail UI.  
✅ Communicates with a Python Flask backend deployed externally (Render).  

📬 Gmail Add-on Setup 
To integrate the classifier with Gmail:  

1) Go to Google Apps Script and create a new project.
2) Paste the content of code.gs file + appsscript.json file (included in this repository).
3) The code already includes the correct backend URL for demonstarion.
4) Go to Deploy → Test deployments
5) Set the deployment type to: Workspace Add-on with Gmail scope
6) Authorize the required permissions
7) Open Gmail, and you'll see the add-on in the right-hand panel.

"Scan for Phishing" button will send the content to your backend for classification.  

## 📉 Limitations
- Doesn’t handle attachments or embedded HTML parsing
- The model is trained on a small dataset (~100 examples)
- No confidence score returned from the classification model


## 🌱 Possible Improvements
- Add confidence score
- Add support for email header analysis and HTML body parsing.


# Installation & Setup
git clone https://github.com/DanaLeibu/EmailClassifier.git  
cd EmailClassifier  

pip install -r requirements.txt  
python app.py  
The backend for this project is deployed on Render for testing and demonstration.


