# [Discord Trump](https://discordapp.com/oauth2/authorize?client_id=484622857041608705&scope=bot)
Text to speech Discord bot using the [Jungle Horse API](http://jungle.horse).

Speaks every message sent on the server.

## Commands
### Join
*Joins the voice channel you are currently in.*

`/join`

### Leave
*Leaves the voice channel.*

`/leave`

## Setup
1. [Create your app with a Bot](https://discordapp.com/developers/applications/me).
2. Copy your bot's secret token and [paste it on this line](https://github.com/MysteryPancake/Discord-Trump/blob/master/trump.js#L8).
3. Go to `https://discordapp.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot`, with `<CLIENT_ID>` as your app's client ID.
4. [Install Node.js](https://nodejs.org/en/download): `brew install node`
5. [Install FFmpeg](https://www.ffmpeg.org/download.html): `brew install ffmpeg`
6. [Install the dependencies](https://github.com/MysteryPancake/Discord-Trump/blob/master/package.json#L37-L40): `npm install`
7. [Run the bot](https://github.com/MysteryPancake/Discord-Trump/blob/master/trump.js): `npm start`
8. You won't regret it, believe me!

![Icon](trump.jpg?raw=true)
