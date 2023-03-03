require("dotenv").config();
//console.log(process.env)
//const { generateDependencyReport } = require('@discordjs/voice');
//console.log(generateDependencyReport());
const {Client, Events, GatewayIntentBits } = require('discord.js');
const { DisTube } = require("distube");

const client = new Client({ intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent ], });

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnEmpty: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    // emitAddListWhenCreatingQueue: false,
    
});

client.DisTube.on("error", (message, error) => {
    console.error(`Error: ${error}`);
});

client.once(Events.ClientReady, c => {
    console.log(`✅ ${c.user.tag} is online`)
});

client.on(Events.MessageCreate, message => {
    if (message.author.bot || !message.guild) return;
    const prefix = "?"
    const args = message.content.slice(prefix.length).trim().split(/ +/g)

    if (args.shift().toLowerCase() === "play") {
        client.DisTube.play(message.member.voice.channel, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message
            
        })
    }

    if (message.content.toLowerCase() === prefix + "pause") {
        client.DisTube.pause(message);
        message.reply("Musiikin toisto tauolla.");
        console.log('pause');
    }

     if (message.content.toLowerCase() === prefix + "resume") {
        client.DisTube.resume(message);
        message.reply("Musiikin toistoa jatkettu.");
        console.log('resume');
    }

    if (message.content.toLowerCase() === prefix + "stop") {
        client.DisTube.stop(message);
        message.reply("Musiikin toisto lopetettu.");
        console.log('stop');
    }
});

let voice_connection = Voice.joinVoiceChannel({
	adapterCreator: guild.voiceAdapterCreator,
	guildId: guild_id,
	channelId: channel_id,
	selfDeaf: true,
	selfMute: false
});

let player = new Voice.AudioPlayer({noSubscriber: Voice.NoSubscriberBehavior.Pause});
voice_connection.subscribe(player);

let resource = Voice.createAudioResource(local_file_or_stream);
player.play(resource);


client.DisTube.on("playSong", (queue,song) => {
    queue.textChannel.send("Nyt toistaa: " + song.name)
});

client.login(process.env.TOKEN);
