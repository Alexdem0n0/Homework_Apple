/**
 * Cloudflare Worker for Homework Tracker (Phantom OS) Private Cross-Device Sync
 *
 * Setup Guide (takes 2 minutes):
 * 1. Log in to your Cloudflare dashboard (free account: https://dash.cloudflare.com)
 * 2. Go to "Workers & Pages" -> Click "Create Application" -> "Create Worker".
 * 3. Give it a name (e.g. "phantom-sync") and click "Deploy".
 * 4. Click "Edit code", paste THIS ENTIRE FILE into worker.js, and click "Deploy".
 * 5. Go back to Worker Settings -> "Variables and Secrets" -> "KV Namespace Bindings":
 *    - Click "Add binding"
 *    - Variable name: HOMEWORK_KV
 *    - KV namespace: Click "Create a namespace", name it "homework-storage", and select it.
 *    - Click "Save and Deploy".
 * 6. Copy your Worker URL (e.g. https://phantom-sync.<your-subdomain>.workers.dev/api/sync)
 *    and paste it into the app's "Cloud Sync" settings on your laptop and your phone.
 * 7. Choose any private passphrase as your Secret Sync Key (e.g. "alex_secret_key_2026").
 *    Done! Both devices will now stay seamlessly in sync.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request, env) {
    // 1. Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const syncKey = url.searchParams.get('key');

    if (!syncKey || syncKey.trim().length < 3) {
      return new Response(JSON.stringify({
        error: 'Valid ?key= query parameter (at least 3 characters) is required.'
      }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const kvKey = 'backup:' + syncKey.trim();

    // 2. GET: Download latest database payload
    if (request.method === 'GET') {
      if (!env.HOMEWORK_KV) {
        return new Response(JSON.stringify({
          error: 'HOMEWORK_KV binding is missing. Please bind a KV namespace in Worker Settings.'
        }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const data = await env.HOMEWORK_KV.get(kvKey, { type: 'text' });
      if (!data) {
        return new Response(JSON.stringify({
          error: 'No backup found for this key yet.',
          key: syncKey
        }), {
          status: 404,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      return new Response(data, {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    // 3. POST: Upload and update database payload
    if (request.method === 'POST') {
      if (!env.HOMEWORK_KV) {
        return new Response(JSON.stringify({
          error: 'HOMEWORK_KV binding is missing. Please bind a KV namespace in Worker Settings.'
        }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const body = await request.text();
      if (!body || body.length < 10) {
        return new Response(JSON.stringify({ error: 'Payload body is empty or invalid.' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      // Store in KV
      await env.HOMEWORK_KV.put(kvKey, body);

      return new Response(JSON.stringify({
        success: true,
        savedAt: new Date().toISOString(),
        bytes: body.length
      }), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
  },
};
