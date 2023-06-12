import { SlashCommandBuilder } from "discord.js";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('registrar')
		.setDescription('Registrar Entrada ou Saída')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Registrar Entrada ou Saida')
				.setRequired(true)
				.addChoices(
					{ name: 'entrada', value: 'entrada' },
					{ name: 'saida', value: 'saida' },				)),
	async execute(interaction: any) {
		const type = interaction.options.getString('type');
		const date = Date.now();
            // const novaData = new Date(Date.UTC(date., 09, 20, 10, 11, 08));
            const dataComIntl = new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'long',
                timeZone: 'America/Belem',
            });
            const dataFormatada = dataComIntl.format(date);
            const tipo = type === 'entrada' ? 'Entrada' : 'Saida';
			await interaction.reply('Working on it');
            await interaction.editReply(`Registro de ${tipo}: \n Nome: ${interaction.member.nickname}  \n Horário de ${tipo}: ${dataFormatada}`)
	},
};