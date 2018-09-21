"use strict";

console.log("LOADING LIBRARIES...");

const Discord = require("discord.js");
const client = new Discord.Client();

client.login("<SECRET_BOT_TOKEN>").catch(console.error);

client.on("ready", function() {
	updateStatus();
	console.log("READY FOR ACTION!");
});

function updateStatus() {
	client.user.setActivity(client.voiceConnections.size + " Trump" + (client.voiceConnections.size === 1 ? "" : "s")).catch(console.error);
}

client.on("message", function(message) {
	if (message.author.bot || !message.guild) return;
	const content = message.content.toLowerCase();
	if (content === "/join") {
		if (message.member.voiceChannel) {
			message.member.voiceChannel.join().then(function() {
				updateStatus();
			}).catch(function() {
				message.channel.send("I need permission to join your voice channel! Believe me, it's true.").catch(console.error);
			});
		} else {
			message.channel.send("Join a voice channel! You won't regret it, believe me.").catch(console.error);
		}
	} else if (content === "/leave") {
		const connection = message.guild.voiceConnection;
		if (connection) {
			connection.disconnect();
			updateStatus();
		}
	} else if (content) {
		const connection = message.guild.voiceConnection;
		if (connection) {
			console.log("Playing " + content + "!");
			connection.playArbitraryInput("async:http://api.jungle.horse/speak?v=trump&vol=3&s=" + encodeURIComponent(content + " um"));
		}
	}
});