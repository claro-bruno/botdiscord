import { REST, Routes } from "discord.js";
import dotenv  from 'dotenv';
dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env; 

// importing commands
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname,  "commands");
const commandsFiles =  fs.readdirSync(commandsPath).filter((file: any) => file.endsWith(".ts"))

const commands = [];

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: '10'}).setToken(TOKEN as any);

(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos...`)
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID as any, GUILD_ID as any),
            {body: commands}
        )
        console.log("Comandos Registrados com sucesso!")
    } catch(err) {
        console.error(err)
    }
})()