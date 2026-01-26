import { Resend } from 'resend';
import { jwtVerify } from 'jose';

export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const JWT_SECRET = import.meta.env.JWT_SECRET;

export async function GET({ request, redirect }) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Missing token', { status: 400 });
  }

  if (!RESEND_API_KEY || !JWT_SECRET) {
    console.error('Missing env vars');
    return new Response('Server configuration error', { status: 500 });
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;

    const resend = new Resend(RESEND_API_KEY);

    // Add to Resend Audience
    const { error } = await resend.contacts.create({
      email: email,
    });

    if (error) {
      console.error('Resend contact creation error:', error);
    }

    return redirect('/verify-success');

  } catch (e) {
    console.error('Token verification failed:', e);
    return new Response('Invalid or expired token', { status: 400 });
  }
}
