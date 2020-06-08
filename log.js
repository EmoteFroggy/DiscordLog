const moment = require('moment');
const chalk = require('chalk');


function logger (bg, title, text, timed = true) { console.log(`${timed ? `[${chalk.gray(moment().format('H:mm:ss'))}]` : ''}${chalk[bg].bold(` ${title} `)} ${text}`) };


module.exports = {
    ready (text, title = 'Ready', bg = 'bgGray', timed = false) { logger(bg, title, text, timed) },
    msg(text, title = 'Message', bg = 'bgGray', timed = false) {logger(bg, title, text, timed)},
    log (text, title = 'Log', bg = 'bgGray', timed = false) { logger(bg, title, text, timed) },
    warn (text) { logger('bgYellow', 'Warning', text) },
    err (err, title = 'Error') { logger('bgRed', title, `\n${(err && err.stack) || err}`) }
}