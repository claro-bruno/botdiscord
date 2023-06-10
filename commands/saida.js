const { SlashCommandBuilder } = require("discord.js");

module.exports = {
        data: new SlashCommandBuilder()
        .setName("saida")
        .setDescription("Registrar Saida"),

        
        async execute(interaction) {
            const date = Date.now();
            // const novaData = new Date(Date.UTC(date., 09, 20, 10, 11, 08));
            const dataComIntl = new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'long',
                timeZone: 'America/Belem',
            });
            const dataFormatada = dataComIntl.format(date);
            // const dataFormatada = date.toLocaleString('pt-BR', { timezone: 'UTC' })
            // today.toISOString();
            await interaction.reply(`Registro de Saida: \n Nome: ${interaction.member.nickname}  \n Horário: ${dataFormatada}`)
    }

}
