module.exports = {
  apps: [
    {
      name: 'Tailwind',
      script: 'postcss styles/**/*.css --base ./styles --dir ./app/styles -w',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development'
      }
    },
    {
      name: 'Remix',
      script: 'remix watch',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID
      }
    },
    {
      name: 'Wrangler',
      script: 'wrangler dev --local --experimental-enable-local-persistence --node-compat',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        BROWSER: 'none',
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID
      }
    }
  ]
};
