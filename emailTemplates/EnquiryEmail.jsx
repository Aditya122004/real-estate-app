export const generateEnquiryEmail = (buyerName, propertyName) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { padding: 20px; }
      h2 { color: #333; }
      .blockquote { background: #f4f4f4; padding: 10px; border-left: 4px solid #7f57f1; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Property Inquiry</h2>
      <p>Dear Agent,</p>
      <p>
        I am interested in the property <strong>${propertyName}</strong> and would like to get more details regarding its pricing, availability, and any additional information.
      </p>
      <p><strong>Message:</strong></p>
      <div class="blockquote">
        Hello, I came across the listing for <strong>${propertyName}</strong> and I am very interested in learning more about it.<br>
        Could you please provide full details on the final discounted price, amenities, and availability?<br>
        I would appreciate it if we could schedule a visit at your earliest convenience.<br>
        Looking forward to your response.
      </div>
      <p>Best regards,</p>
      <p><strong>${buyerName}</strong></p>
    </div>
  </body>
  </html>`;
};
