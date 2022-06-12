export const HoneyBadgerConfig = {
  apiKey: process.env.HONEYBADGER_API_KEY,
  environment: process.env.NODE_ENV,
  developmentEnvironments: ['development', 'dev', 'test'],
  revision: process.env.HEROKU_SLUG_COMMIT || '',
  reportData: process.env.NODE_ENV === 'production',
  projectRoot: 'webpack://_N_E/./',
}
