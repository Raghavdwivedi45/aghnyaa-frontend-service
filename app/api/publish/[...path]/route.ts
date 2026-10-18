import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { URLGenerator } from '@/utils/helperFunctions';

type RouteContext = { params: Promise<{ path: string[] }> };

const proxyPublishRequest = async (request: NextRequest, path: string[]) => {
  const token = (await cookies()).get('accessToken')?.value;
  const endpoint = `/${path.map(encodeURIComponent).join('/')}`;

  try {
    const upstreamResponse = await fetch(
      `${URLGenerator('PUBLISH', endpoint)}${request.nextUrl.search}`,
      {
        method: request.method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: request.method === 'GET' ? undefined : JSON.stringify(await request.json()),
        cache: 'no-store',
      },
    );
    return NextResponse.json(await upstreamResponse.json(), { status: upstreamResponse.status });
  } catch (error) {
    console.error('Publish API proxy request failed:', error);
    return NextResponse.json({ message: 'Publish service request failed' }, { status: 502 });
  }
};

export const GET = async (request: NextRequest, { params }: RouteContext) =>
  proxyPublishRequest(request, (await params).path);
export const POST = async (request: NextRequest, { params }: RouteContext) =>
  proxyPublishRequest(request, (await params).path);
export const PATCH = async (request: NextRequest, { params }: RouteContext) =>
  proxyPublishRequest(request, (await params).path);
export const DELETE = async (request: NextRequest, { params }: RouteContext) =>
  proxyPublishRequest(request, (await params).path);
