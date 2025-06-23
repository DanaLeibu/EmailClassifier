function onGmailMessage(e) {
  return [createScanButton()];
}

function createScanButton() {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Phishing Scanner'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newButtonSet()
        .addButton(CardService.newTextButton()
          .setText('Scan for Phishing')
          .setOnClickAction(CardService.newAction().setFunctionName('scanForPhishing'))
        )
      )
    )
    .build();
}

function scanForPhishing(e) {
  try {
    const messageId = e.gmail.messageId;
    if (!messageId) {
      return createResultCard('Error: No message found');
    }
    
    // Get email content using Gmail API interactions
    const message = GmailApp.getMessageById(messageId);
    const emailData = {
      sender: message.getFrom(),
      subject: message.getSubject(),
      body: message.getPlainBody()
    };
    
    // Send to backend phishing detection system
    const result = callPhishingDetectionAPI(emailData);
    
    return createResultCard(result);
    
  } catch (error) {
    return createResultCard('Error: ' + error.toString());
  }
}

function callPhishingDetectionAPI(emailData) {
  try {
    
    const response = UrlFetchApp.fetch('https://your-render-app.onrender.com/classify', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      payload: JSON.stringify(emailData)
    });
    
    if (response.getResponseCode() === 200) {
      const result = JSON.parse(response.getContentText());
      return formatClassification(result.classification);
    }
    return 'API Error: ' + response.getResponseCode();
  } catch (error) {
    return 'Detection Error: ' + error.toString();
  }
}

function formatClassification(classification) {
  switch (classification) {
    case 'Safe':
    case '0':
      return 'SAFE - No phishing detected';
    case 'Suspicious':
    case '1':
      return 'SUSPICIOUS - Potential phishing indicators';
    case 'Phishing':
    case '2':
      return 'PHISHING - High confidence phishing detected';
    default:
      return 'Classification: ' + classification;
  }
}

function createResultCard(result) {
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation()
      .updateCard(CardService.newCardBuilder()
        .setHeader(CardService.newCardHeader().setTitle('Scan Results'))
        .addSection(CardService.newCardSection()
          .addWidget(CardService.newKeyValue()
            .setTopLabel('Phishing Analysis')
            .setContent(result)
            .setMultiline(true)
          )
          .addWidget(CardService.newButtonSet()
            .addButton(CardService.newTextButton()
              .setText('Scan Again')
              .setOnClickAction(CardService.newAction().setFunctionName('scanForPhishing'))
            )
          )
        )
        .build()
      )
    )
    .build();
}