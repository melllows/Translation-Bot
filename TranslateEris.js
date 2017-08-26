const tlcfg = require('./tlcfg.json');
const Eris = require("eris");
const bot = new Eris(`${tlcfg.token}`, {
        maxShards: 2
})
const translate = require('google-translate-api');
const G = require('gizoogle');
const YodaSpeak = require('yoda-speak');
const yoda = new YodaSpeak(`${tlcfg.yoda}`);
const kpop = require('kpop');
const stats = require('sysstats')();
const ostb = require('os-toolbox');
const fs = require('fs');
const shell = require('shelljs');
const japanese = require('japanese');
console.log('Connecting...');
process.on('unhandledRejection', (reason) => {
    return console.log('Reason: ' + reason);
});
process.on('uncaughtException', err => {
    return console.log('Error: ' + err);
});

bot.on("ready", () => { 
    var guildsizes = bot.guilds.size;
    const userCount = bot.users.size;
    bot.editStatus('online', {
            name: `:T help | ${guildsizes} servers & ${userCount} users! | Want to support Translate's existence? go here! https://www.patreon.com/TannerReynolds`,
            type: 0
        
    });
    console.log(`GOOGLE TRANSLATE BOT. Playing on ${guildsizes} servers, currently serving ${userCount} users`);
    const gmstr = [
      `:T help | ${userCount} users`,
      `:T help | ${guildsizes} guilds`,
      `:T help | :T invite`,
      `:T help | ${guildsizes} servers & ${userCount} users! | Want to support Translate's existence? go here! https://www.patreon.com/TannerReynolds`,
      `:T patreon | :T invite`,
      `:T patreon`
    ]
    setInterval(newGame, 1000*30);
    function newGame() {
      var randomNumber = Math.floor(Math.random() * gmstr.length);
      bot.editStatus('online', {
            name: `${gmstr[randomNumber]}`,
            type: 0
        
    });
    }
    // API posts for dscord bot servers
    let request = require("superagent");
    let dbots_token = `${tlcfg.dbots}`;
        request.post(`https://discordbots.org/api/bots/318554710929833986/stats`)
            .set('Authorization', dbots_token)
            .send({
                server_count: guildsizes,
                shard_count: bot.shards.size
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO DISCORDBOTS.ORG: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://discordbots.org! Now at ${guildsizes} servers!`);
                }
            });

    let dbotspw_token = `${tlcfg.dbotspw}`
        request.post(`https://bots.discord.pw/api/bots/318554710929833986/stats`)
            .set('Authorization', dbotspw_token)
            .send({
                server_count: guildsizes
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO BOTS.DISCORD.PW: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://bots.discord.pw! Now at ${guildsizes} servers!`);
                }
            });
});



bot.on('guildCreate', guild => {
    let request = require("superagent");
    let dbots_token = `${tlcfg.dbots}`;
        var guildsizes = bot.guilds.size;
        request.post(`https://discordbots.org/api/bots/318554710929833986/stats`)
            .set('Authorization', dbots_token)
            .send({
                server_count: guildsizes,
                shard_count: bot.shards.size
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO DISCORDBOTS.ORG: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://discordbots.org! Now at ${guildsizes} servers!`);
                }
            });
    
    let dbotspw_token = `${tlcfg.dbotspw}`

        var guildsizes = bot.guilds.size;
        request.post(`https://bots.discord.pw/api/bots/318554710929833986/stats`)
            .set('Authorization', dbotspw_token)
            .send({
                server_count: guildsizes
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO BOTS.DISCORD.PW: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://bots.discord.pw! Now at ${guildsizes} servers!`);
                }
            });

        if (!guild.iconURL) {
            bot.createMessage('341775242839982080', {
            embed: {
                color: 0xFFFFFF,
                title: `New Guild Joined, now at ${bot.guilds.size} guilds!`,
                fields: [
                    {
                        name: 'GuildID',
                        value: `${guild.id}`
                    },
                    {
                        name: 'Owner',
                        value: `${guild.ownerID}`,
                    },
                    {
                        name: 'Region',
                        value: `${guild.region}`
                    },
                    {
                        name: 'Member Count',
                        value: `${guild.memberCount}`
                    },
                    {
                        name: 'Shard',
                        value: `${guild.shard.id}`
                    }
                ],
             footer: {
                 text: `${guild.name}`,
             },
             thumbnail: {
                 url: `http://is2.mzstatic.com/image/thumb/Purple128/v4/b1/9b/6c/b19b6c17-4e81-d800-3d1e-c0935f5ec5ba/source/300x300bb.jpg`
             }
            }
        })
        }
        bot.createMessage('341775242839982080', {
            embed: {
                color: 0xFFFFFF,
                title: `New Guild Joined, now at ${bot.guilds.size} guilds!`,
                fields: [
                    {
                        name: 'GuildID',
                        value: `${guild.id}`
                    },
                    {
                        name: 'Owner',
                        value: `${guild.ownerID}`,
                    },
                    {
                        name: 'Region',
                        value: `${guild.region}`
                    },
                    {
                        name: 'Member Count',
                        value: `${guild.memberCount}`
                    },
                    {
                        name: 'Shard',
                        value: `${guild.shard.id}`
                    }
                ],
             footer: {
                 text: `${guild.name}`,
             },
             thumbnail: {
                 url: `${guild.iconURL}`
             }
            }
        })
});




bot.on('guildDelete', guild => {
    let request = require("superagent");
    let dbots_token = `${tlcfg.dbots}`

        var guildsizes = bot.guilds.size;
        request.post(`https://discordbots.org/api/bots/318554710929833986/stats`)
            .set('Authorization', dbots_token)
            .send({
                server_count: guildsizes,
                shard_count: bot.shards.size
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO DISCORDBOTS.ORG: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://discordbots.org! Now at ${guildsizes} servers!`);
                }
            });
    
    let dbotspw_token = `${tlcfg.dbotspw}`;

        var guildsizes = bot.guilds.size;
        request.post(`https://bots.discord.pw/api/bots/318554710929833986/stats`)
            .set('Authorization', dbotspw_token)
            .send({
                server_count: guildsizes
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO BOTS.DISCORD.PW: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://bots.discord.pw! Now at ${guildsizes} servers!`);
                }
            });
        if (!guild.iconURL) {
            bot.createMessage('341775242839982080', {
            embed: {
                color: 0xFFFFFF,
                title: `New Guild Joined, now at ${bot.guilds.size} guilds!`,
                fields: [
                    {
                        name: 'GuildID',
                        value: `${guild.id}`
                    },
                    {
                        name: 'Owner',
                        value: `${guild.ownerID}`,
                    },
                    {
                        name: 'Region',
                        value: `${guild.region}`
                    },
                    {
                        name: 'Member Count',
                        value: `${guild.memberCount}`
                    },
                    {
                        name: 'Shard',
                        value: `${guild.shard.id}`
                    }
                ],
             footer: {
                 text: `${guild.name}`,
             },
             thumbnail: {
                 url: `http://is2.mzstatic.com/image/thumb/Purple128/v4/b1/9b/6c/b19b6c17-4e81-d800-3d1e-c0935f5ec5ba/source/300x300bb.jpg`
             }
            }
        })
        }
        bot.createMessage('341775242839982080', {
            embed: {
                color: 0xFFFFFF,
                title: `New Guild Joined, now at ${bot.guilds.size} guilds!`,
                fields: [
                    {
                        name: 'GuildID',
                        value: `${guild.id}`
                    },
                    {
                        name: 'Owner',
                        value: `${guild.ownerID}`,
                    },
                    {
                        name: 'Region',
                        value: `${guild.region}`
                    },
                    {
                        name: 'Member Count',
                        value: `${guild.memberCount}`
                    },
                    {
                        name: 'Shard',
                        value: `${guild.shard.id}`
                    }
                ],
             footer: {
                 text: `${guild.name}`,
             },
             thumbnail: {
                 url: `${guild.iconURL}`
             }
            }
        })
    
});



bot.on("messageCreate", (msg) => {

    if(msg.content.toLowerCase().startsWith(':t')) {
        const args = msg.content.toLowerCase().split(" ").slice(1).join(" ");
        /*translate(msg.content.toLowerCase().split(" ").slice(1).join(" "), {
                to: 'en'
            }).then(res => {const args = res.text.toLowerCase();*/

        if (!args) {
            return;
        }
        if (args.startsWith("korean")) {
            let rescont = args.split(" ").slice(1).join(" ");
            translate(`${rescont}`, {
                to: 'ko'
            }).then(res => {
                if (res.text.length > 200) {
                    return bot.createMessage(msg.channel.id, `\`\`\`ini
${res.text}
\`\`\``);
                }
                bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_kr: ${res.text}`
            }
        })
            }).catch(err => {
                console.error(err)
            })
        }
        if (args.startsWith("arabic")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ar'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_sa: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
}
if (args.startsWith("afrikaans")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'af'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_za: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("albanian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sq'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_al: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("armenian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'hy'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_am: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("azerbaijani")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'az'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_az: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("basque")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'eu'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_fr: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("belarusian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'be'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_by: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("bengali")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'bn'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_bd: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("bosnian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'bs'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ba: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("bulgarian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'bg'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_bg: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("catalan")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ca'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ad: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("cebuano")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ceb'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ph: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("chichewa")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ny'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_zw: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("chinese-simplified")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'zh-cn'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_cn: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("chinese-traditional")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'zh-tw'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_cn: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("corsican")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'co'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_it: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("croatian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'hr'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_hr: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("czech")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'cs'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_cz: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("danish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'da'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_dk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("dutch")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'nl'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_nl: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("english")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'en'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_um: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("esperanto")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'eo'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_hu: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("estonian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'et'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ee: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("filipino")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'tl'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ph: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("finnish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'fi'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_fi: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("french")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'fr'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_fr: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("frisian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'fy'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_nl: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("galician")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'gl'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ea: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("georgian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ka'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ge: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("german")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'de'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_de: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("greek")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'el'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_gr: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("gujarati")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'gu'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("haitian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ht'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ht: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("hausa")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ha'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ne: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("hawaiian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'haw'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_um: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("hebrew")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'iw'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_il: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("hindi")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'hi'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("hmong")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'hmn'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_cn: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("hungarian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'hu'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_hu: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("icelandic")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'is'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_is: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("igbo")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ig'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ng: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("indonesian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'id'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_id: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("irish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ga'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ie: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("italian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'it'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_it: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("japanese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ja'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_jp: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("javanese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'jw'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_id: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("kannada")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'kn'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("kazakh")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'kk'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_kz: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("khmer")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'km'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_kh: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("kurdish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ku'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_tr: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("kyrgyz")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ky'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_cn: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("lao")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'lo'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_la: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("latin")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'la'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_va: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("latvian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'lv'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_lv: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("lithuanian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'lt'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_lt: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("luxembourgish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'lb'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_lu: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("macedonian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'mk'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_mk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("malagasy")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'mg'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_mg: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("malay ")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ms'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_id: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("malayalam")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ml'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("maltese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'mt'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_mt: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("maori")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'mi'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_nz: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("marathi")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'mr'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("mongolian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'mn'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_mn: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("myanmar")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'my'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_mm: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("nepali")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ne'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_np: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("norwegian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'no'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_no: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("pashto")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ps'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_af: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("persian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'fa'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ir: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("polish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'pl'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_pl: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("portuguese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'pt'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_br: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("punjabi")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ma'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_pk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("romanian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ro'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ro: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("russian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ru'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ru: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("samoan")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sm'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ws: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("scotsGaelic")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'gd'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_gb: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("serbian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sr'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_rs: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("sesotho")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'st'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ls: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("shona")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sn'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_zw: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("sindhi")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sd'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_pk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("sinhala")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'si'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_lk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("slovak")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sk'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_sk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("slovenian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sl'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_si: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("somali")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'so'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_so: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("spanish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'es'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_es: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("sudanese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'su'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_sd: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("swahili")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sw'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ke: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("swedish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'sv'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_se: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("tajik")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'tg'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_af: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("tamil")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ta'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("telugu")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'te'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_in: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("thai")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'th'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_th: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("turkish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'tr'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_tr: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("ukrainian")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'uk'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ua: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("urdu")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'ur'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_pk: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("uzbek")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'uz'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_uz: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("vietnamese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'vi'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_vn: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("welsh")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'cy'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_gb: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("xhosa")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'xh'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_za: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("yiddish")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'yi'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_il: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("yoruba")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'yo'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_ng: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("zulu")) {
    let rescont = args.split(" ").slice(1).join(" ");
    translate(`${rescont}`, {
        to: 'zu'
    }).then(res => {
        if (res.text.length > 200) {
            return bot.createMessage(msg.channel.id, `${res.text}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:flag_za: ${res.text}`
            }
        });
    }).catch(err => {
        console.error(err)
    })
} // Command End
if (args.startsWith("flipped")) {
    let rescont = args.split(" ").slice(1).join(" ");
    var flip = require('flipout');
    let res = flip(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:upside_down: ${res.text}`
        }
    });
} // Command End
if (args.startsWith("zalgo")) {
    let rescont = args.split(" ").slice(1).join(" ");
    var zalgo = require('to-zalgo');
    var banish = require('to-zalgo/banish');
    var res = zalgo(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:upside_down: ${res.text}`
        }
    });
} // Command End
if (args.startsWith("gangsta")) {
    let rescont = args.split(" ").slice(1).join(" ");
    G.string(`${rescont}`, function(error, translation) {
        if (translation.length > 200) {
            return bot.createMessage(msg.channel.id, `${translation}`)
        }
        bot.createMessage(msg.channel.id, {
            embed: {
                color: 0xFFFFFF,
                title: `:gun: ${res.text}`
            }
        });
    });
} // Command End
if (args.startsWith("yoda")) {
    let rescont = args.split(" ").slice(1).join(" ");
    yoda.convert(`${rescont}`,
        function(err, result) {
            if (!err) {
                if (result.toString().length > 200) {
                    return bot.createMessage(msg.channel.id, `${result.toString()}`)
                }
                bot.createMessage(msg.channel.id, {
                    embed: {
                        color: 0xFFFFFF,
                        title: `:rocket: ${res.text}`
                    }
                });
            } else {
                console.log(err);
            }
        })
} // Command End
if (args.startsWith("romanized-korean")) {
    let rescont = args.split(" ").slice(1).join(" ");
    let res = kpop.romanize(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:flag_kr: ${res.text}`
        }
    });
}
if (args.startsWith("hangulified-korean")) {
    let rescont = args.split(" ").slice(1).join(" ");
    let res = kpop.hangulify(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:flag_kr: ${res.text}`
        }
    });
}
if (args.startsWith("romanized-japanese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    let res = japanese.romanize(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:flag_jp: ${res.text}`
        }
    });
}
if (args.startsWith("katakanized-japanese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    let res = japanese.katakanize(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:flag_jp: ${res.text}`
        }
    });
}
if (args.startsWith("hiraganized-japanese")) {
    let rescont = args.split(" ").slice(1).join(" ");
    let res = japanese.hiraganize(`${rescont}`);
    if (res.length > 200) {
        return bot.createMessage(msg.channel.id, `\`\`\`ini ${res.text} \`\`\``);
    }
    bot.createMessage(msg.channel.id, {
        embed: {
            color: 0xFFFFFF,
            title: `:flag_jp: ${res.text}`
        }
    });
} //Command End

    } 

    if(msg.content.toLowerCase() === ":t help") {
        bot.createMessage(msg.channel.id, `Want to know how to use the Translate Bot? View the helppage here! https://discordbots.org/bot/translate | **If you like Translate, please consider making a pledge on our Patreon, every little bit helps pay for the costs to keep Translate online** https://www.patreon.com/TannerReynolds`);
    }

    if (msg.content.toLowerCase() === ":t patreon") {
        bot.createMessage(msg.channel.id, `https://www.patreon.com/TannerReynolds`);
    }

if (msg.content.toLowerCase() === ":t stats") {
        let servers = bot.guilds.size;
        let playercount = bot.users.size;
        let mintime = ostb.uptime() / 60;
        let uptime = Math.floor(mintime / 60);
        let serversLarge = bot.guilds.filter(m => m.large).size;
        let botPing = Math.floor(bot.ping);
        ostb.cpuLoad().then(function(cpuusage) {
            ostb.memoryUsage().then(function(memusage) {
                ostb.currentProcesses().then(function(processes) {
                    const curpro = processes;
                    const meuse = memusage;
                    const acusage = cpuusage;
                    bot.createMessage(msg.channel.id, `\`\`\`ini
[CPU]: ${acusage}%

[RAM]: ${meuse}%

[Shards]: ${bot.shards.size}

[Network Speed]: 1gbps

[Ping]: ${botPing}

[Guilds bot is running on]: ${servers}

[Large guilds bot is running on]: ${serversLarge}

[Total Member Count]: ${playercount}

[Platform]: CentOS 7 x64 - Linux

[Server Location]: San Jose

[Hosting Provider]: Vultr Holdings LLC

[Client Uptime]: ${Math.floor(((bot.uptime / (1000*60*60)) % 24))}

[Server Uptime]: ${JSON.stringify(uptime)} hours
\`\`\``);
                });
            });
        });
    }

if(msg.content.toLowerCase() === ":t shards") {
    let shardMap = bot.shards.map(s => `[ID]: ${s.id} | [Ping]: ${s.latency} | [Status]: ${s.status}`).join("\n");
    bot.createMessage(msg.channel.id, `\`\`\`ini
${shardMap}    
    \`\`\``);
}


if (msg.content.toLowerCase() === ":t guild list") {
        if (msg.author.id !== "205912295837138944") return;
        let translateGuilds = bot.guilds.map(g => `NAME: ${g.name} | MEMBER ACOUNT: ${g.memberCount} | GUILD ID: ${g.id} | OWNER ID: ${g.ownerID} | LARGE GUILD: ${g.large}`).join("\n");
        var writeFile = require('write');
        writeFile(`${msg.id}${bot.uptime}GUILDINFO.txt`, `${translateGuilds}`, function(err) {
            if (err) {
                console.log(err);
                bot.createMessage(msg.channel.id, 'Error while processing guild information.');
            } else {
                bot.createMessage(msg.channel.id, `Guild Info file made! Reporting info on ${bot.guilds.size} guilds! File name: ${msg.id}${bot.uptime}GUILDINFO.txt`);
            }
        });
    }

if (msg.content.toLowerCase().startsWith(':t reply')) {
        const gfw = require('get-first-words');
        let args = msg.content.split(" ").slice(2).join(" ");
        if (msg.author.id !== "205912295837138944") return;
        if (!args) {
            return bot.createMessage(msg.channel.id, `:warning: ERROR: You need to type something first..`);
        }
        let trunum = gfw(`${args}`);
        if (`${trunum}` === 'undefined') {
            return bot.createMessage(msg.channel.id, `This user is no longer within reach`);
        }
        if (isNaN(`${trunum}`) === true) {
            return bot.createMessage(msg.channel.id, `${trunum} is not an id`);
        }
        if (isNaN(`${trunum}`) === false) {
            let rep = args.split(" ").slice(1).join(" ");
            if (!rep) {
                return bot.createMessage(msg.channel.id, 'send a reply');
            }
            bot.createMessage(bot.users.get(`${trunum}`), `\`MESSAGE FROM DEV\` \`\`\`${rep}\`\`\` If you need further assistance or want to contact the developer, you can either add "Solace#8338" or join the Discord https://discord.gg/3bWf3a2`);
            let guy = bot.users.get(`${trunum}`);
            bot.createMessage(msg.channel.id, `Sent a dev reply to ${guy.username}`);
        }
    }

    if (msg.content.toLowerCase().startsWith(":t suggest")) {
        let args = msg.content.split(" ").slice(2).join(" ");
        if (msg.channel.guild.name === "Null") return;
        if (!args) {
            return bot.createMessage(msg.channel.id, `You need to type something first...`);
        }
        if (args.length > 1024) {
            return bot.createMessage(msg.channel.id, `Your Suggestion is too long.`);
        }
        bot.createMessage('314819480817762304', { embed: {
            color: 0xFFFFFF,
            author: {
                name: `${msg.author.username}#${msg.author.discriminator}`,
                icon_url: `${msg.author.avatarURL}`
            },
            footer: {
                text: `${msg.channel.guild.name}`,
                icon_url: `${msg.channel.guild.iconURL}`
            },
            fields: [
                {
                    name: 'Author ID',
                    value: `${msg.author.id}`
                },
                {
                    name: 'Guild ID',
                    value: `${msg.channel.guild.id}`
                },
                {
                    name: 'Suggestion',
                    value: `${args}`
                }
            ]
        }
        })
        bot.createMessage(msg.channel.id, `:wrench: Suggestion sent! If you like Translate, please consider making a pledge on our Patreon, every little bit helps pay for the costs to keep Translate online https://www.patreon.com/TannerReynolds`);
    }

    if (msg.content.toLowerCase().startsWith(":t bug")) {
        let args = msg.content.split(" ").slice(2).join(" ");

        if (!args) {
            return bot.createMessage(msg.channel.id, `You need to type something first...`);
        }
        if (args.length > 1024) {
            return bot.createMessage(msg.channel.id, `Your bug report is too long.`);
        }
        bot.createMessage('315280472378966016', { embed: {
            color: 0xFFFFFF,
            author: {
                name: `${msg.author.username}#${msg.author.discriminator}`,
                icon_url: `${msg.author.avatarURL}`
            },
            footer: {
                text: `${msg.channel.guild.name}`,
                icon_url: `${msg.channel.guild.iconURL}`
            },
            fields: [
                {
                    name: 'Author ID',
                    value: `${msg.author.id}`
                },
                {
                    name: 'Guild ID',
                    value: `${msg.channel.guild.id}`
                },
                {
                    name: 'Bug Report',
                    value: `${args}`
                }
            ]
        }
    })
    bot.createMessage(msg.channel.id, `:wrench: Bug report sent! If the developer has any questions regarding your bug report, this bot will DM you the developer's question/message, so be sure to allow DMs from people within the guild.`);
    }

if (msg.content.toLowerCase() === ":t invite") {
        bot.createMessage(msg.channel.id, "Want me on your server? use this link! https://discordapp.com/oauth2/authorize?client_id=318554710929833986&scope=bot&permissions=8");
    }

if (msg.content.toLowerCase() === ":t ping") {
        let botPing = Math.floor(bot.ping);
            bot.createMessage(msg.channel.id, {embed: {
                color:0xFFFFFF,
                title: `:satellite_orbital: ${botPing}`
            }
        })
    }

});

bot.on('messageCreate', msg => {
    const evalprefix = '}=';
    const args = msg.content.split(" ").slice(1);

    if (msg.author.id !== "205912295837138944") return;
    if (msg.content.startsWith(evalprefix + "eval")) {
        try {
            var code = args.join(" ");
            var evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
   bot.createMessage(msg.channel.id, {embed: {
                color:0xFFFFFF,
                fields: [
                    {
                        name: 'Input',
                        value: `\`\`\`js
${code}
\`\`\``
                    },
                    {
                        name: 'Output',
                        value: `\`\`\`js
${clean(evaled)}
\`\`\``
                    }
                ]
            }
   })
        } catch (err) {
            bot.createMessage(msg.channel.id, {embed: {
                color:0xFFFFFF,
                fields: [
                    {
                        name: 'Input',
                        value: `\`\`\`js
${code}
\`\`\``
                    },
                    {
                        name: 'Error Output',
                        value: `\`\`\`js
${clean(err)}
\`\`\``
                    }
                ]
            }
   })
        }
    }
});

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

bot.connect();