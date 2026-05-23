import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https:;
    img-src 'self' data: https:; 
    style-src 'self' 'unsafe-inline'; 
    font-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    connect-src 'self' https:;
    `.replace(/\s+/g, '')
  },
  { 
    key: 'Strict-Transport-Security', 
    value: 'max-age=63072000; includeSubDomains; preload' 
  },
  { 
    key: 'X-Content-Type-Options', 
    value: 'nosniff' 
  },
  { 
    key: 'Referrer-Policy', 
    value: 'strict-origin-when-cross-origin' 
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=(),'
  }
]

const nextConfig: NextConfig = {
  /* config options here */
    async headers(){
    return[
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  },

};

export default nextConfig;
