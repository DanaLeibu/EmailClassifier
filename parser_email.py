from home_task import parse_email, classify_email, classify_with_model

email_content = """From: support@paypal.com
Subject: Action required

Click the link to update your account.
"""

sender, subject, body = parse_email(email_content)
result = classify_email(sender, subject, body)
ml_result =  classify_with_model(sender, subject, body)
print("Sender:", sender)
print("Subject:", subject)
print("Body:", body)
print("first Classification:", result)
print("Ml Classification:", ml_result)