const { SlashCommandBuilder } = require("discord.js");


module.exports = {
        data: new SlashCommandBuilder()
        .setName("entrada")
        .setDescription("Registrar Entrada"),

        
        async execute(interaction) {
            const date = Date.now();
            // const novaData = new Date(Date.UTC(date., 09, 20, 10, 11, 08));
            const dataComIntl = new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'long',
                timeZone: 'America/Belem',
            });
            const dataFormatada = dataComIntl.format(date);
            // await interaction.deferReply();
            await interaction.reply('Working on it');
            // const result = await YOUR_FUNCTION();
            await interaction.editReply(`Registro de Entrada: \n Nome: ${interaction.member.nickname}  \n Horário de Entrada: ${dataFormatada}`);
            // await interaction.reply(`Registro de Entrada: \n Nome: ${interaction.member.nickname}  \n Horário de Entrada: ${dataFormatada}`)
    }

}