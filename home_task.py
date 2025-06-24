import pandas as pd
from email import message_from_string
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

df = pd.read_csv("phishing_emails_dataset.csv")



def suspicious_sender(sender):
    suspicious_keywords = [
        "paypal", "verify", "secure", "access", "login",
        "alert", "update", "account", "info", "freemoney"
    ]
    return any(word in sender.lower() for word in suspicious_keywords)

def suspicious_subject(subject):
    suspicious_keywords = [
        "urgent", "update", "verify", "action", "account",
        "payment failed", "limited time", "reset", "security"
    ]
    return any(word in subject.lower() for word in suspicious_keywords)

def suspicious_body(body):
    suspicious_keywords = [
        "click here", "login", "verify your account", "reset your password",
        "confirm your details", "act now", "locked out", "at risk", "resolve your issue"
    ]
    return any(word in body.lower() for word in suspicious_keywords)

def parse_email(email_text):
    msg = message_from_string(email_text)
    sender = msg["From"]
    subject = msg["Subject"]
    body = msg.get_payload()
    return sender, subject, body

def classify_email(sender, subject, body):
    score = sum([
        suspicious_sender(sender),
        suspicious_subject(subject),
        suspicious_body(body)
    ])
    if score >= 2:
        return "Phishing"
    elif score == 1:
        return "Suspicious"
    return "Safe"

df["classification"] = df.apply(lambda row: classify_email(row["sender"], row["subject"], row["body"]), axis=1)


df["text_combined"] = df["sender"] + " " + df["subject"] + " " + df["body"]
df["label"] = df["classification"].map({"Safe": 0, "Suspicious": 1, "Phishing": 2})

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df["text_combined"])
y = df["label"]

X_train, X_test, y_train, y_test, train_idx, test_idx = train_test_split(X, y, df.index, test_size=0.2, random_state=42)
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

def classify_with_model(sender, subject, body):
    combined = sender + " " + subject + " " + body
    vec = vectorizer.transform([combined])
    pred = clf.predict(vec)[0]
    return {0: "Safe", 1: "Suspicious", 2: "Phishing"}[pred]

if __name__ == "__main__":
    for i in range(X_test.shape[0]):
        idx = test_idx[i]
        subject = df.loc[idx, "subject"]
        body = df.loc[idx, "body"]
        sender = df.loc[idx, "sender"]
        actual = df.loc[idx, "classification"]
        predicted = classify_with_model(sender, subject,body)

        print(f"Email {i+1}:")
        print(f"Predicted: {predicted} | Actual: {actual}")
    

