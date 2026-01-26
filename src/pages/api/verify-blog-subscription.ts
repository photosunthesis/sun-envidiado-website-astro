import { Resend } from 'resend';
import { jwtVerify } from 'jose';
import type { APIRoute } from 'astro';

export const prerender = false;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
const BLOG_AUDIENCE_ID = process.env.BLOG_AUDIENCE_ID;

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Missing token', { status: 400 });
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;

    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.contacts.create({
      email: email,
      segmentId: BLOG_AUDIENCE_ID,
    });

    if (error) {
      console.error('Resend contact creation error:', error);
    }

    return redirect('/blog-subscription-success');
  } catch (e) {
    console.error('Token verification failed:', e);
    return new Response('Invalid or expired token', { status: 400 });
  }
};
