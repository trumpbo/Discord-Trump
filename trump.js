"use strict";

console.log("LOADING LIBRARIES...");

const request = require("request");
const crypto = require("crypto");
const fs = require("fs");

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
			message.member.voice.channel.join().then(updateStatus).catch(function() {
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
			const fileName = crypto.randomBytes(48).toString("hex") + ".wav";
			request.post({
				url: "https://mumble.stream/speak",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					speaker: "donald-trump",
					text: utterance
				}),
			}, function(error, response, body) {
				if (error) {
					console.error(error);
					fs.unlinkSync(fileName);
				} else if (response.statusCode !== 200) {
					message.channel.send(body).catch(console.error);
					fs.unlinkSync(fileName);
				} else {
					const connection = message.guild.voice && message.guild.voice.connection;
					if (connection) {
						connection.play(fs.createReadStream(fileName)).on("speaking", function(speaking) {
							if (!speaking) {
								fs.unlinkSync(fileName);
							}
						}).on("error", console.error);
					} else {
						message.channel.send({
							files: [{
								attachment: fileName,
								name: utterance.replace(/[^a-z0-9]/gi, "_") + ".wav"
							}]
						}).then(function() {
							fs.unlinkSync(fileName);
						}).catch(console.error);
					}
				}
			}).pipe(fs.createWriteStream(fileName));
		} else {
			message.channel.send("Give me something to say!").catch(console.error);
		}
	}
});