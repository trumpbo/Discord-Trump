"use strict";

console.log("LOADING LIBRARIES...");

const Discord = require("discord.js");
const client = new Discord.Client();

client.login("<SECRET_BOT_TOKEN>");

client.on("ready", function() {
	client.user.setActivity(client.voiceConnections.size + " Trump" + (client.voiceConnections.size === 1 ? "" : "s")).catch(console.error);
	console.log("READY FOR ACTION!");
});

client.on("message", function(message) {
	if (message.author.bot || !message.guild) return;
	if (message.content === "/join") {
		if (message.member.voiceChannel) {
			message.member.voiceChannel.join().then(function() {
				client.user.setActivity(client.voiceConnections.size + " Trump" + (client.voiceConnections.size === 1 ? "" : "s")).catch(console.error);
			}).catch(function() {
				message.channel.send("I need permission to join your voice channel! Believe me, it's true.").catch(console.error);
			});
		} else {
			message.channel.send("Join a voice channel! You won't regret it, believe me.").catch(console.error);
		}
	} else if (message.content === "/leave") {
		const connection = message.guild.voiceConnection;
		if (connection) {
			connection.disconnect().then(function() {
				client.user.setActivity(client.voiceConnections.size + " Trump" + (client.voiceConnections.size === 1 ? "" : "s")).catch(console.error);
			});
		}
	} else {
		const connection = message.guild.voiceConnection;
		if (connection) {
			console.log("Playing " + message.content + "!");
			connection.playArbitraryInput("async:http://api.jungle.horse/speak?v=trump&vol=3&s=" + encodeURIComponent(message.content));
		}
	}
});