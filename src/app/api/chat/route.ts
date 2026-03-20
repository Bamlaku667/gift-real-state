import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';

export interface ChatMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
    read: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Save message to data store
        const messages = readData<ChatMessage[]>('messages.json', []);
        const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            name: name || 'Anonymous',
            email: email || '',
            message,
            timestamp: new Date().toISOString(),
            read: false,
        };
        messages.push(newMessage);
        writeData('messages.json', messages);

        // Send email via Resend if API key is available
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(resendKey);
                await resend.emails.send({
                    from: 'Gift Real Estate <noreply@giftrealestate.et>',
                    to: ['amanuelchuffa@gmail.com'],
                    subject: `💬 New Chat Message from ${name || 'Website Visitor'}`,
                    html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
              <div style="background: #dcda13; padding: 16px 24px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; color: #0f0f0f; font-size: 18px;">🏠 Gift Real Estate - New Chat Message</h2>
              </div>
              <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 80px;">Name:</td><td style="padding: 8px 0; font-weight: 600;">${name || 'Anonymous'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email:</td><td style="padding: 8px 0;">${email || 'Not provided'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;">Message:</td><td style="padding: 8px 0;">${message}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Time:</td><td style="padding: 8px 0; font-size: 12px; color: #999;">${new Date().toLocaleString()}</td></tr>
                </table>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                  <a href="https://wa.me/251976133918" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; margin-right: 8px;">Reply on WhatsApp</a>
                  ${email ? `<a href="mailto:${email}" style="background: #dcda13; color: #0f0f0f; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px;">Reply by Email</a>` : ''}
                </div>
              </div>
            </div>
          `,
                });
            } catch (emailErr) {
                console.error('Email send error:', emailErr);
            }
        }

        return NextResponse.json({ success: true, id: newMessage.id });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
