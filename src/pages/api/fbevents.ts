import type { APIRoute } from 'astro';

export const prerender = false;

const PIXEL_ID = '1398654025074894';
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

/**
 * Endpoint para proxy da API de Conversões do Meta (CAPI)
 * Captura o IP do cliente (incluindo IPv6) e envia para a Meta para melhorar o matching de eventos.
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!ACCESS_TOKEN) {
    console.warn('CAPI Error: FB_ACCESS_TOKEN logic bypassed (missing secret)');
    return new Response(JSON.stringify({ error: 'Configuração FB_ACCESS_TOKEN ausente' }), { status: 200 }); // Retorna 200 para evitar erro 500 no client, mas loga o aviso
  }

  try {
    const body = await request.json();
    const { event_name, event_id, event_source_url, user_data } = body;

    // Captura o IP do cliente (Vercel injeta isso, priorizando IPv6 se disponível)
    const client_ip_address = clientAddress || request.headers.get('x-forwarded-for')?.split(',')[0].trim();
    const client_user_agent = request.headers.get('user-agent');

    // Monta payload para Meta CAPI
    const payload = {
      data: [
        {
          event_name: event_name || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_id: event_id,
          event_source_url: event_source_url || request.headers.get('referer'),
          user_data: {
            client_ip_address: client_ip_address,
            client_user_agent: client_user_agent,
            ...user_data,
          },
        },
      ],
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
