/** @type {import('next').NextConfig} */

const envVariables = {
  NETWORK_ID: process.env.NETWORK_ID,
  GRAPHQL_QUERIES_URL: process.env.GRAPHQL_QUERIES_URL,
  PLATFORM_CONTRACT_ADDRESS: process.env.PLATFORM_CONTRACT_ADDRESS,
  DISCORD_API_URL: process.env.DISCORD_API_URL,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  PINATA_URL: process.env.PINATA_URL,
  PINATA_API_KEY: process.env.PINATA_API_KEY, 
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
  NEXT_PUBLIC_ENVIRONMENT_PHASE: process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE,
  NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
  HONEYBADGER_API_KEY: process.env.HONEYBADGER_API_KEY,
  MAIN_URL: process.env.MAIN_URL,
  HEROKU_SLUG_COMMIT: process.env.HEROKU_SLUG_COMMIT,
  NFT_SMART_CONTRACT_ADDRESS: process.env.NFT_SMART_CONTRACT_ADDRESS
};

const HoneybadgerSourceMapPlugin = require('@honeybadger-io/webpack')

const moduleConfig = {
  reactStrictMode: true,
  env: envVariables,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: true,
  },
  images: {
    domains: ['gateway.pinata.cloud', 'asia.olympus-imaging.com', 'ipfs.doubledice.com', 'res.cloudinary.com', 'via.placeholder.com', 'upload.wikimedia.org'],
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['honeybadger'] = 'honeybadger-js'
    }
    config.devtool = 'hidden-source-map'
    config.plugins.push(
      new HoneybadgerSourceMapPlugin({
        apiKey: process.env.HONEYBADGER_API_KEY,
        assetsUrl: `${process.env.MAIN_URL}/_next`,
        revision: process.env.HEROKU_SLUG_COMMIT,
      })
    )
    return config
  },
}

process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE === 'production' && (
  moduleConfig.images = {
    loader: 'cloudinary',
    path: process.env.IMAGE_OPTIMIZATION_URL,
    domains: ['gateway.pinata.cloud'],
  }
)

module.exports = moduleConfig;
