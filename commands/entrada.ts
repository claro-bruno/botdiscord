import { SlashCommandBuilder } from "discord.js";
import { prisma } from "../database/prismaClient";

module.exports = {
        data: new SlashCommandBuilder()
        .setName("entrada")
        .setDescription("Registrar Entrada"),

        
        async execute(interaction: any) {
            const dt: any = new Date();
            // const novaData = new Date(Date.UTC(date., 09, 20, 10, 11, 08));
            const dataComIntl = new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'long',
                timeZone: 'America/Belem',
            });
            const dia: any = dt.getDate();
            const mes: number = dt.getMonth() + 1;
            const ano: number = dt.getFullYear();

            const result_entrada = await prisma.ponto.findMany({
                where: {
                    type: 'entrada',
                    dia,
                    mes,
                    ano
                }
            });

            
            const result_saida = await prisma.ponto.findMany({
                where: {
                    type: 'saida',
                    dia,
                    mes,
                    ano
                }
            });

            const checkResult =  result_entrada.length === 0 && result_saida.length === 0 ? true : false; 

            if(+result_entrada.length === +result_saida.length || checkResult === true) {
                const dataFormatada = dataComIntl.format(dt);
               

                
                // await interaction.deferReply();
                await interaction.reply('Working on it');
                // const result = await YOUR_FUNCTION();
                await interaction.editReply(`Registro de Entrada: \n Nome: ${interaction.member.nickname}  \n Horário de Entrada: ${dataFormatada}`);
                // await interaction.reply(`Registro de Entrada: \n Nome: ${interaction.member.nickname}  \n Horário de Entrada: ${dataFormatada}`)

                await prisma.ponto.create({
                    data: {
                        data: dataFormatada,
                        type: 'entrada',
                        dia,
                        mes,
                        ano,
                        nome: interaction.member.nickname
                    }
                 })
            }
            else {
                await interaction.reply('Working on it');
                await interaction.deleteReply();
            }
            
    }

}