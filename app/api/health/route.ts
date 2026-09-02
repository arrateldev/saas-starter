import { NextResponse } from 'next/server';
import { deploymentMode } from '@/lib/config/feature-flags';
import { siteConfig } from '@/lib/site-config';

const headers = {
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      product: siteConfig.product.name,
      brand: siteConfig.brand.name,
      deploymentMode,
      timestamp: new Date().toISOString()
    },
    { headers }
  );
}

export function HEAD() {
  return new NextResponse(null, {
    status: 204,
    headers
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers
  });
}
