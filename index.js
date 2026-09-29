const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');

// Веб-сервер для Koyeb (чтобы бот не спал и работал 24/7)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Zyxn Stream Bot is active 24/7!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// Инициализация Discord бота
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
    console.log(`Бот успешно запущен как ${client.user.tag}!`);

    // Функция установки статуса Стриминга с гифкой и Application ID
    const setBotPresence = () => {
        client.user.setPresence({
            activities: [{
                name: 'ZYXN CLIENT v2.0', // Текст, который идет после "Стримит"
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/5opka', // Обязательная ссылка для фиолетового статуса стрима
                // Явно указываем Application ID вашего приложения
                applicationId: '1526758044262989884',
                assets: {
                    // Префикс "mp:" для внешней гифки, привязанной к этому приложению
                    largeImageKey: 'mp:https://files.catbox.moe/nb9ufd.gif', 
                    largeImageText: 'ZYXN CLIENT v2.0' // Текст при наведении мышки на гифку
                }
            }],
            status: 'online', // Зеленый кружок "В сети" поверх фиолетового значка стрима
        });
    };

    // Устанавливаем статус сразу при запуске
    setBotPresence();

    // Обновляем статус каждые 30 секунд
    setInterval(setBotPresence, 30000);
});

client.login(process.env.DISCORD_TOKEN);
