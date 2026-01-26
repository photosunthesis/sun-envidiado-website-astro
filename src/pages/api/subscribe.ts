import { Resend } from 'resend';
import { SignJWT } from 'jose';

export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const JWT_SECRET = import.meta.env.JWT_SECRET;
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://sun-envidiado.com';

export async function POST({ request }) {
  if (!RESEND_API_KEY || !JWT_SECRET) {
    return new Response(JSON.stringify({ message: 'Server configuration error' }), { status: 500 });
  }

  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email address' }), { status: 400 });
    }

    // Generate JWT token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h') // Token valid for 24 hours
      .sign(secret);

    const verifyUrl = `${SITE_URL}/api/verify?token=${token}`;

    const resend = new Resend(RESEND_API_KEY);

    // Send verification email
    const { error } = await resend.emails.send({
      from: `Sun Envidiado's Blogs <blogs@sun-envidiado.com>`,
      to: email,
      subject: `Confirm your subscription – Sun Envidiado's Blogs`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222; max-width: 500px; padding: 20px; line-height: 1.6;">
          <p style="font-size: 16px; margin-bottom: 24px;">Hi there,</p>
          <p style="font-size: 16px; margin-bottom: 24px;">Thanks for subscribing. To finalize everything you just need to confirm your email address below; it helps me keep the list clean and secure.</p>
          <div style="margin: 32px 0;">
            <a href="${verifyUrl}" style="background-color: #09090b; color: #ffffff; padding: 12px 22px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block; font-size: 14px;">Confirm Subscription</a>
          </div>
          <p style="color: #666; font-size: 16px; margin-top: 32px;">
            If you didn't request this you can safely ignore it.
          </p>
          <p style="margin: 16px 0 0; font-size: 16px; color: #333; font-weight: 600;">
            Sun Envidiado
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ message: 'Failed to send verification email' }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: 'Verification email sent' }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
