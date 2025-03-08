module.exports = {
  apps: [
    {
      name: 'turqa-estate',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_BASE_URL: 'http://yourdomain.com',
        JWT_SECRET: 'your-secure-jwt-secret'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}; 