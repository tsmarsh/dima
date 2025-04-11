# Slack Fuck Checker Bot

A fun Slack bot that verifies every message contains the word 'fuck'. This is a non-professional project for entertainment purposes.

## Setup

1. Create a new Slack app at https://api.slack.com/apps
2. Add the following bot token scopes:
   - `app_mentions:read`
   - `chat:write`
   - `im:history`
   - `im:write`
   - `channels:history`
   - `groups:history`
   - `mpim:history`
3. Install the app to your workspace
4. Copy the Bot User OAuth Token and Signing Secret
5. Create a `.env` file with the following variables:
   ```
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_SIGNING_SECRET=your-signing-secret
   ```
6. Enable Events API in your Slack app settings
7. Subscribe to the following bot events:
   - `message.channels`
   - `message.groups`
   - `message.im`
   - `message.mpim`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local server:
   ```bash
   npx serverless offline
   ```

3. Use ngrok or similar to expose your local server to the internet:
   ```bash
   ngrok http 3000
   ```

4. Update your Slack app's Event Subscriptions URL to point to your ngrok URL + `/slack/events`

## Deployment

1. Configure your AWS credentials
2. Deploy to AWS:
   ```bash
   npx serverless deploy
   ```

## Usage

The bot will automatically check all messages in channels where it's invited. If a message doesn't contain the word 'fuck', the bot will reply in a thread asking the user to try again.

## Troubleshooting

If you encounter issues:
1. Check that all required scopes are added to your Slack app
2. Verify that the Events API is enabled and the correct events are subscribed
3. Ensure your environment variables are correctly set
4. Check the Lambda logs for any errors

## Disclaimer

This is a fun project for non-professional settings. Please use responsibly and respect your workspace's guidelines. 