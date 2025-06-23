function buildAddOn(e) {
  const sender = e.messageMetadata.from;
  const subject = e.messageMetadata.subject;
  const body = e.messageMetadata.plainBody || "";

  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Email Classifier"))
    .addSection(
      CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText(`From: ${sender}`))
        .addWidget(CardService.newTextParagraph().setText(`Subject: ${subject}`))
        .addWidget(
          CardService.newTextButton()
            .setText("Check Email")
            .setOnClickAction(
              CardService.newAction().setFunctionName("handleCheckEmail")
            )
        )
    )
    .build();
}

function handleCheckEmail(e) {
  const sender = e.messageMetadata.from;
  const subject = e.messageMetadata.subject;
  const body = e.messageMetadata.plainBody || "";

  const payload = JSON.stringify({ sender, subject, body });

  const options = {
    method: "post",
    contentType: "application/json",
    payload: payload,
  };

  // Replace with your own Render URL:
const response = UrlFetchApp.fetch("https://your-render-app.onrender.com/classify", options);
  const result = JSON.parse(response.getContentText());

  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Classification Result"))
    .addSection(
      CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText("Classification: " + result.classification))
    )
    .build();
}
