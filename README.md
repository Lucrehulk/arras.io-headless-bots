# arras.io-headless-bots
This was an old project I made for arras.io, smart headless bots that utilized a reversed protocol.

Unlike bots that solely run in a headless tab, these bots execute modified code that allows them to interact with the game's protocol.
For example, these bots send packets that allow them to auto upgrade, auto respawn, and auto send messages.
They also listen for data such as kicks or deaths in order to analyze whether they may need to respawn or reconnect entirely. 

Notably, I utilized my own wat parsing tool (https://github.com/Lucrehulk/watparser) in order to reverse a large portion of this, including things like the key generation function for the encryption/decryption of packets. In fact I really made that parser for reversing this io game, though it could be used for the same purpose regarding other games too.

The bots worked (and as I am writing this still work) by first loading in the proxies and user agents into their respective files, then modifying the config variables in the bot_build folder (bot_count, min_player_count, worker_count) to whatever you want for the bots and then executing the bot_build file. This "builds" the bot data that tells it where to spawn and with what proxies. From there, you could execute the bot_loader file and it'd spawn in the bots. Pretty simple.
