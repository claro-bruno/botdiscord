import {SlashCommandBuilder } from "discord.js";
import { prisma } from "../database/prismaClient";

module.exports = {
        data: new SlashCommandBuilder()
        .setName("saida")
        .setDescription("Registrar Saida"),

        
        async execute(interaction: any) {
            const dt = new Date();
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
                orderBy: [{
                    id: "asc",
                }],
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

            if(+result_entrada.length > +result_saida.length) {
                
                const dataFormatada = dataComIntl.format(dt);
                const dataEntrada = result_entrada[result_entrada.length - 1]?.data;
                await interaction.reply('Working on it');
                await interaction.editReply(`Registro de Saida: \n Nome: ${interaction.member.nickname}  \n Horário de Entrada: ${dataEntrada} \n Horário de Saída: ${dataFormatada}`)
                await prisma.ponto.create({
                    data: {
                        type: 'saida',
                        data: dataFormatada,
                        // data_saida: dataFormatada,
                        dia,
                        mes,
                        ano,
                        nome: interaction.member.nickname
                    }
                 })
            } else {
                await interaction.reply('Registo de Saída Inválido!');
                await interaction.deleteReply();
            }
        }

}
