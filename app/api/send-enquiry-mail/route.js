import nodemailer from 'nodemailer';
import { generateEnquiryEmail } from '@/emailTemplates/EnquiryEmail';
import { NextResponse } from 'next/server';
import React from 'react';

export async function POST(req) {
  try {
    const { buyerName, buyerEmail, propertyName, agentEmail } = await req.json(); 

    // Generate email HTML content
    const emailHtml = generateEnquiryEmail(buyerName, propertyName);

    // Nodemailer Transporter Setup (Using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password (Use App Passwords, not your real password)
      },
    });

    // Email options
    const mailOptions = {
      from: `"${buyerName}" <${buyerEmail}>`,
      to: agentEmail,
      subject: `Inquiry about ${propertyName}`,
      html: emailHtml, // Rendered HTML email template
      replyTo: buyerEmail, // Ensures replies go to the buyer
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ status: 200, message: info });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
