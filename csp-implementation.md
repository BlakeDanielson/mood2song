# Content Security Policy Implementation for Next.js

## Updated next.config.mjs

Copy and paste this updated configuration into your `next.config.mjs` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: generateCSP()
          },
          // Additional security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  }
}

// Function to generate CSP
function generateCSP() {
  const policy = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://open.spotify.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'frame-src': ["'self'", "https://open.spotify.com"],
    'connect-src': [
      "'self'", 
      "https://accounts.spotify.com", 
      "https://api.spotify.com", 
      "https://api.openai.com"
    ],
    'media-src': ["'self'", "https:", "blob:"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"]
  };

  // Convert policy object to string
  return Object.entries(policy)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

export default nextConfig
```

## Implementation Steps

1. Replace your current `next.config.mjs` with the code above
2. Restart your Next.js development server
3. Check the browser console for any CSP violation errors
4. Adjust the CSP directives as needed based on any violations

## Testing Your CSP

After implementing, test your application thoroughly:

1. Verify all Spotify embeds work correctly
2. Ensure API calls to Spotify and OpenAI function properly
3. Check that all styles and scripts load without CSP violations

## Monitoring and Refinement

Consider adding a reporting endpoint to collect CSP violations:

```javascript
// Add this to your policy object in the generateCSP function
'report-uri': ['https://your-reporting-endpoint.com/csp-reports']
```

You can use services like [Report URI](https://report-uri.com/) or set up your own endpoint to collect these reports.