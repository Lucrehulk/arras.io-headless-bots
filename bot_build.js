// Set this for bot data
let bot_count = 50;
let min_player_count = 10;
let worker_count = 4;

const fs = require('fs').promises;
const path = require('path');

(async () => {
    let targets = [];
    let servers = await (await fetch("https://ak7oqfc2u4qqcu6i.uvwx.xyz:2222/status")).json();
    for (let server in servers.status) {
        if (servers.status[server].clients >= min_player_count) {
            targets.push(server);
        }
    }
    let proxies = (await fs.readFile(path.resolve(__dirname, './bot_proxies.txt'))).toString().split("\n");
    if (bot_count > proxies.length) {
        bot_count = proxies.length;
        console.log(`The bot count has been set to be more than the total proxies. Setting the bot count to ${proxies.length}.`);
    }
    let total = bot_count * targets.length;
    let bots_per_worker = Math.ceil(total / worker_count);
    let result_bot_data = [];
    let current_bot = 0;
    let current_server = 0;
    for (let worker = 0; worker < worker_count; worker++) {
        let worker_bot_data = {};
        if (current_bot % bot_count !== bot_count - 1) worker_bot_data[targets[current_server]] = [];
        for (let bot = 0; bot < bots_per_worker; bot++) {
            let client = current_bot % bot_count;
            if (client == bot_count - 1) {
                current_server += 1;
                if (current_server >= targets.length) {
                    result_bot_data.push(worker_bot_data);
                    return await fs.writeFile(path.resolve(__dirname, './bot_data.txt'), JSON.stringify(result_bot_data));
                }
                worker_bot_data[targets[current_server]] = [];
            }
            worker_bot_data[targets[current_server]].push(client);
            current_bot++;
        }
        result_bot_data.push(worker_bot_data);
    }
    return await fs.writeFile(path.resolve(__dirname, './bot_data.txt'), JSON.stringify(result_bot_data));
})();