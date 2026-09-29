const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');

// Поднимаем легкий веб-сервер, чтобы бесплатный хостинг (Koyeb) не усыплял бота
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
    console.log(`Бот успешно авторизован как ${client.user.tag}!`);

    // Установка статуса Стриминга с картинкой
    client.user.setPresence({
        activities: [{
            name: 'ZYXN CLIENT', // Текст, который идет после "Стримит"
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/5opka', // Обязательная ссылка для фиолетового статуса стрима
            // Настройки внешнего вида (картинка берется из Rich Presence -> Art Assets вашего приложения)
            assets: {
                largeImageKey: 'https://files.catbox.moe/nb9ufd.gif', // ЗАМЕНИТЕ 'logo' НА ИМЯ ВАШЕЙ КАРТИНКИ В DEVELOPER PORTAL
                largeImageText: 'ZYXN CLIENT v2.0' // Текст при наведении мышки на картинку
            }
        }],
        status: 'online', // Зеленый кружок "В сети" поверх фиолетового значка стрима
    });
});

// Запуск бота с токеном из секретных переменных Koyeb
client.login(process.env.DISCORD_TOKEN);
