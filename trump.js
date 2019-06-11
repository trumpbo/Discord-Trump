"use strict";

console.log("LOADING LIBRARIES...");

const Discord = require("discord.js");
const client = new Discord.Client();

client.login("<SECRET_BOT_TOKEN>").catch(console.error);

function updateStatus() {
	const connections = client.voice && client.voice.connections;
	if (connections) {
		client.user.setActivity(connections.size + " Trump" + (connections.size === 1 ? "" : "s")).catch(console.error);
	} else {
		client.user.setActivity("0 Trumps").catch(console.error);
	}
}

client.on("ready", function() {
	updateStatus();
	console.log("READY FOR ACTION!");
});

client.on("message", function(message) {
	if (message.author.bot || !message.guild) return;
	const content = message.content.toLowerCase();
	if (content === "trump_join") {
		if (message.member.voice && message.member.voice.channel) {
			message.member.voice.channel.join().then(function() {
				updateStatus();
			}).catch(function() {
				message.channel.send("I need permission to join your voice channel! Believe me, it's true.").catch(console.error);
			});
		} else {
			message.channel.send("Join a voice channel first! You won't regret it, believe me.").catch(console.error);
		}
	} else if (content === "trump_leave") {
		const connection = message.guild.voice && message.guild.voice.connection;
		if (connection) {
			connection.disconnect();
			updateStatus();
		}
	} else if (content.startsWith("trump_say")) {
		const utterance = message.content.slice(9).trim();
		if (utterance) {
			console.log("Playing " + utterance + "!");
			const url = "http://api.jungle.horse/speak?v=trump&vol=3&s=" + encodeURIComponent(utterance);
			const connection = message.guild.voice && message.guild.voice.connection;
			if (connection) {
				connection.play(url);
			} else {
				message.channel.send({ files: [url] }).catch(console.error);
			}
		} else {
			message.channel.send("Give me something to say!").catch(console.error);
		}
	}
});