import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';

export interface Inquiry {
    id: string;
    name: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
    timestamp: string;
    read: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, subject, message } = body;

        if (!name || !phone || !message) {
            return NextResponse.json({ error: 'Name, phone, and message are required' }, { status: 400 });
        }

        // Save inquiry
        const inquiries = readData<Inquiry[]>('inquiries.json', []);
        const newInquiry: Inquiry = {
            id: `inq-${Date.now()}`,
            name, phone, email, subject, message,
            timestamp: new Date().toISOString(),
            read: false,
        };
        inquiries.push(newInquiry);
        writeData('inquiries.json', inquiries);

        // Send email
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(resendKey);
                await resend.emails.send({
                    from: 'Gift Real Estate <noreply@giftrealestate.et>',
                    to: ['amanuelchuffa@gmail.com'],
                    subject: `📩 New Contact Inquiry: ${subject || 'Website Contact'}`,
                    html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
              <div style="background: #dcda13; padding: 16px 24px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; color: #0f0f0f;">📩 New Website Inquiry — Gift Real Estate</h2>
              </div>
              <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 80px;">Name:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>
                  ${email ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>` : ''}
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Subject:</td><td style="padding: 8px 0;">${subject}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;">Message:</td><td style="padding: 8px 0;">${message}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Received:</td><td style="padding: 8px 0; font-size: 12px; color: #999;">${new Date().toLocaleString()}</td></tr>
                </table>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                  <a href="tel:${phone}" style="background: #dcda13; color: #0f0f0f; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; margin-right: 8px;">📞 Call Client</a>
                  <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px;">💬 WhatsApp</a>
                </div>
              </div>
            </div>
          `,
                });
            } catch (emailErr) {
                console.error('Email error:', emailErr);
            }
        }

        return NextResponse.json({ success: true, id: newInquiry.id });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
