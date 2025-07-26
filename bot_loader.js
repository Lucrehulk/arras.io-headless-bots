const fs = require('fs').promises;
const path = require('path');
const { Worker } = require('worker_threads');

(async () => {
    let bot_worker_data = JSON.parse((await fs.readFile(path.resolve(__dirname, './bot_data.txt'))).toString())
    for (let worker = 0; worker < bot_worker_data.length; worker++) {
        new Worker(path.resolve(__dirname, './bot_worker.js'), {
            workerData: bot_worker_data[worker]
        });
    };
})();