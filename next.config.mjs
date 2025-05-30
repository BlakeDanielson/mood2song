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
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://open.spotify.com", "https://cdnjs.buymeacoffee.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'frame-src': ["'self'", "https://open.spotify.com"],
    'connect-src': [
      "'self'",
      "https://accounts.spotify.com",
      "https://api.spotify.com",
      "https://api.openai.com",
      "https://www.buymeacoffee.com"
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
