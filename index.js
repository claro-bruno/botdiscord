// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv  = require('dotenv')
dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env; 
// const { token } = require('./config.json');


// importing commandssss
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname,  "commands");
const commandsFiles =  fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandsFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);


	
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`Error! This command in ${filePath} dont have "data" or "execute"`);
	}
}


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);


// Listener

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	// await interaction.deferReply({ ephemeral: true });
	// console.log(command)
	if (!command) {
		console.error("Comando não encontrado!")
		
		return
	} 
	try 
	{
		// await interaction.deferReply({ ephemeral: true });
		// await wait(3000);
		// interaction.reply({ embeds: [embed] })
		await command.execute(interaction)
	}
	catch(err) {
		console.error(err);
		await interaction.reply({ content: `Command you requested help for does not exist!`, ephemeral: true  });
	}
	// console.log(interaction)
})