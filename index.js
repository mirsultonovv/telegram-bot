const TelegramBot = require('node-telegram-bot-api');
const { gameOptions, againOptinos } = require('./options')

const  token  ='7880173619:AAHXkWmTbj265xc8PGgyKX2BhZ5owS55dlM';

const bot = new TelegramBot(token, {polling: true});

const obj = {};

const startGame = async chatId => {
        await bot.sendMessage(chatId, "Kompyuter 0 dan 9 gacha son o'yladi, siz usha soni toposhga xarakat qiling."
        );
        const randomNumber = Math.floor(Math.random() * 10);
        obj[chatId] = randomNumber;
        await bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions )
}

const bootstrap = () => {
    bot.setMyCommands([
        {
            command:'/start',
            description:"Bot haqida ma'lumot",
        },
        {
            command:'/info',
            description:"O'zingiz haqingizda ma'lumot "
        },
        {
            command:'/game',
            description:"O'yin O'ynash"
        },

    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text === "/start") {
           return bot.sendMessage(chatId, `Assalamu Alaykum xurmatli ${msg.from?.first_name} sizni KOMETA oilasiga qo'shilganigiz bilan tabriklayman! `);
        }

        if (text === '/game') {
            return startGame(chatId);
        }
        if (text ==='/info') {
            await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/256/1.webp'
            );
            await bot.sendPhoto(chatId,'https://static.euronews.com/articles/stories/08/75/07/36/1200x675_cmsv2_c637fd71-561e-5406-9502-db5b9eb9e992-8750736.jpg'
            );
            return bot.sendMessage(chatId,`Siz KOMETA Jamosidasiz username bu ${msg.from?.username}, sizning ismingiz esa ${msg.from?.first_name} ${msg.form?.last_name}
                `)
          }

          bot.sendMessage(chatId, 'Uzur man sizning gapingizga tushunmayapman !!')
      });

    bot.on("callback_query", msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data === obj [chatId]){
            return bot.sendMessage(chatId, `Tabriklaymiz siz to'g'ri javob berdingiz , komyuter ${obj[chatId]} sonni tanlagan edi ` );
        }else{
            return bot.sendMessage(chatId, ` Siz noto'g'ri son tanladingiztanlagan soningiz ${data} , komyuter ${obj[chatId]} sonni tanlagan edi `, againOptinos )
        }

        bot.sendMessage(chatId, `Siz tanlagan son ${data}`);
        console.log(msg);
    })
};

bootstrap();
