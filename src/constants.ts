// Environment Variables - typescript doesn't typecheck process.env
// Throw if not defined
function assertEnv(envVar: string): string { 
  if (!process.env[envVar]) { 
    throw new Error(`Environment variable ${envVar} is not defined.`); 
  } else {
    return process.env[envVar] as string;
  }
}

export const Environment = {
  SLACK_APP_TOKEN: assertEnv('SLACK_APP_TOKEN'),
  SLACK_BOT_TOKEN: assertEnv('SLACK_BOT_TOKEN'),
  SLACK_SIGNING_SECRET: assertEnv('SLACK_SIGNING_SECRET'),

  MAIN_CHANNEL: assertEnv('MAIN_CHANNEL'),
  LOG_CHANNEL: assertEnv('LOG_CHANNEL'),

  PING_USERGROUP: assertEnv('PING_USERGROUP'),
  DEV_USERGROUP: assertEnv('DEV_USERGROUP'),

  POWERHOUR_ORG: assertEnv('POWERHOUR_ORG'),

  PORT: assertEnv('PORT'),

  PROD: (process.env.PROD === 'true'),
}

// Constants
export const Constants = {
  MIN_MS: 60 * 1000,
  HOUR_MS: 60 * 60 * 1000,
};

// Commands
export const Commands = process.env.PROD === 'true' ? {
  HACK: '/wack',
  CANCEL: '/cancel-wack',
  GOALS: '/wackstones',
  STATS: '/mywacks',
  REMINDERS: '/reminders-wack',
  EVENTS: '/wacknics',
  INSTRUCTIONS: '/wackstructions'
} : {
  HACK: '/ztesthack',
  HACK_ALIAS: '/testhour',
  CANCEL: '/testcancel',
  GOALS: '/testgoals',
  STATS: '/testmystats',
  REMINDERS: '/testreminders',
  EVENTS: '/testpicnics',
  INSTRUCTIONS: '/testinstructions'
};