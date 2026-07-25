import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// In-memory store for rate limiting (Tracks IPs and timestamps)
const rateLimitMap = new Map();
const COOLDOWN_PERIOD = 60 * 1000; // 1 minute in milliseconds

export async function POST(req) {
  try {
    // 1. Rate Limiting Logic
    const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
    const now = Date.now();

    if (rateLimitMap.has(ip)) {
      const lastRequestTime = rateLimitMap.get(ip);
      if (now - lastRequestTime < COOLDOWN_PERIOD) {
        return NextResponse.json(
          { error: 'Please wait a minute before sending another message.' },
          { status: 429 }
        );
      }
    }
    
    // Update the IP's last request time
    rateLimitMap.set(ip, now);

    // 2. Parse the request
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // 3. Configure the Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // 4. Send the Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'shashwatshrivastava04@gmail.com', // Sending to yourself
      replyTo: email, // Allows you to hit "Reply" and email the visitor back
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}