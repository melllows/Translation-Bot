const tlcfg = require('./tlcfg.json');
const Discord = require('discord.js');
const client = new Discord.Client();
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
//Crash haltings
process.on('uncaughtException', err => {
    return console.log('Error: ' + err);
});
client.on('warn', info => {
    return console.log('D.js Warning: ' + info);
});
process.on('unhandledRejection', (reason) => {
    return console.log('Reason: ' + reason);
});
client.on('ready', () => {
    client.shard.fetchClientValues('guilds.size').then(result => {
    const guildsizes = result.reduce((prev, val) => prev + val, 0)
    const userCount = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    client.user.setGame(`:T help | ${guildsizes} servers & ${userCount} users! | Want to support Translate's existence? go here! https://www.patreon.com/TannerReynolds`);
    //client.user.setGame(`kpop4.us will be down for a while due to server maintenance | ":t english hello"`);
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
      client.user.setGame(`${gmstr[randomNumber]}`);
    }
    // API posts for dscord bot servers
    let request = require("superagent");
    let dbots_token = `${tlcfg.dbots}`;
        request.post(`https://discordbots.org/api/bots/318554710929833986/stats`)
            .set('Authorization', dbots_token)
            .send({
                server_count: guildsizes
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
    })
});
client.on('guildCreate', guild => {
    let request = require("superagent");
    let dbots_token = `${tlcfg.dbots}`
    client.shard.fetchClientValues('guilds.size').then(result => {
        const guildsizes = result.reduce((prev, val) => prev + val, 0)
        request.post(`https://discordbots.org/api/bots/318554710929833986/stats`)
            .set('Authorization', dbots_token)
            .send({
                server_count: guildsizes
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO DISCORDBOTS.ORG: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://discordbots.org! Now at ${guildsizes} servers!`);
                }
            });
    })
    let dbotspw_token = `${tlcfg.dbotspw}`
    client.shard.fetchClientValues('guilds.size').then(result => {
        const guildsizes = result.reduce((prev, val) => prev + val, 0)
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
            const newGuild = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`New Guild Joined! Now at ${guildsizes} servers!`)
                .addField(`GuildID`, `${guild.id}`)
                .addField(`Owner`, `${guild.owner.user.tag} | ${guild.ownerID}`)
                .addField(`Region`, `${guild.region}`)
                .addField(`Member Count`, `${guild.memberCount}`)
                .setThumbnail(`http://nuttysu.cc/defaultavi.png`)
                .setFooter(`${guild.name}`, `http://nuttysu.cc/defaultavi.png`)
                .setTimestamp();
            client.channels.get('341775242839982080').send({
                embed: newGuild
            })
        }
        const newGuild = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`New Guild Joined! Now at ${guildsizes} servers!`)
            .addField(`GuildID`, `${guild.id}`)
            .addField(`Owner`, `${guild.owner.user.tag} | ${guild.ownerID}`)
            .addField(`Region`, `${guild.region}`)
            .addField(`Member Count`, `${guild.memberCount}`)
            .setThumbnail(`${guild.iconURL}`)
            .setFooter(`${guild.name}`, `${guild.iconURL}`)
            .setTimestamp();
        client.channels.get('341775242839982080').send({
            embed: newGuild
        })
    });
});
client.on('guildDelete', guild => {
    let request = require("superagent");
    let dbots_token = `${tlcfg.dbots}`
    client.shard.fetchClientValues('guilds.size').then(result => {
        const guildsizes = result.reduce((prev, val) => prev + val, 0)
        request.post(`https://discordbots.org/api/bots/318554710929833986/stats`)
            .set('Authorization', dbots_token)
            .send({
                server_count: guildsizes
            })
            .end(function(err, res) {
                if (err) {
                    return console.log(`ERROR SENDING STATS TO DISCORDBOTS.ORG: ${err}`);
                } else {
                    console.log(`Successfully sent stats to https://discordbots.org! Now at ${guildsizes} servers!`);
                }
            });
    })
    let dbotspw_token = `${tlcfg.dbotspw}`;
    client.shard.fetchClientValues('guilds.size').then(result => {
        const guildsizes = result.reduce((prev, val) => prev + val, 0)
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
            const newGuild = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`Left Guild! Now at ${guildsizes} servers!`)
                .addField(`GuildID`, `${guild.id}`)
                .addField(`Owner`, `${guild.owner.user.tag} | ${guild.ownerID}`)
                .addField(`Region`, `${guild.region}`)
                .addField(`Member Count`, `${guild.memberCount}`)
                .setThumbnail(`http://nuttysu.cc/defaultavi.png`)
                .setFooter(`${guild.name}`, `http://nuttysu.cc/defaultavi.png`)
                .setTimestamp();
            client.channels.get('341775242839982080').send({
                embed: newGuild
            })
        }
        const newGuild = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`Left Guild! Now at ${guildsizes} servers!`)
            .addField(`GuildID`, `${guild.id}`)
            .addField(`Owner`, `${guild.owner.user.tag} | ${guild.ownerID}`)
            .addField(`Region`, `${guild.region}`)
            .addField(`Member Count`, `${guild.memberCount}`)
            .setThumbnail(`${guild.iconURL}`)
            .setFooter(`${guild.name}`, `${guild.iconURL}`)
            .setTimestamp();
        client.channels.get('341775242839982080').send({
            embed: newGuild
        })
    });
});

const prefix = ":t";

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    if (message.channel.type === "dm") return message.reply('You cannot run commands through DMs');


    if (command === "ranslate" || "r") {
        let args = message.content.toLowerCase().split(" ").slice(1).join(" ");
        if (!args) {
            return;
        }
        if (args.startsWith("test")) {
            let rescont = args.split(" ").slice(1).join(" ");
            translate(`Hi! I would like to start a survey on the topic of update ideas and balance chances in the Castle Crush Wiki. Then we will present the results of the survey to the developers. They will try to adopt interesting ideas. 
So, do you have any questions that may be asked in the survey? E. g. new troops or a change of troops, new game modes etc.. So give me lots of interesting suggestions!`, {
                to: 'ko'
            }).then(res => {
                if (res.text.length > 200) {
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_kr: ${res.text}`);
                message.channel.send({
                    embed: embed2
                });
            }).catch(err => {
                console.error(err)
            })
        }
        if (args.startsWith("korean")) {
            let rescont = args.split(" ").slice(1).join(" ");
            translate(`${rescont}`, {
                to: 'ko'
            }).then(res => {
                if (res.text.length > 200) {
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_kr: ${res.text}`);
                message.channel.send({
                    embed: embed2
                });
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_sa: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_za: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_al: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_am: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_az: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_fr: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_by: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_bd: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ba: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_bg: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ad: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ph: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_zw: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_cn: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_cn: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_it: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_hr: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_cz: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_dk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_nl: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_um: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_hu: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ee: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ph: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_fi: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_fr: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_nl: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ea: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ge: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_de: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_gr: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ht: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ne: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_um: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_il: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_cn: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_hu: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_is: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ng: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_id: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ie: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_it: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_jp: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_id: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_kz: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_kh: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_tr: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_cn: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_la: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_va: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_lv: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_lt: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_lu: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_mk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_mg: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_id: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_mt: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_nz: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_mn: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_mm: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_np: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_no: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_af: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ir: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_pl: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_br: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_pk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ro: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ru: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ws: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_gb: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_rs: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ls: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_zw: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_pk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_lk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_sk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_si: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_so: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_es: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_sd: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ke: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_se: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_af: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_in: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_th: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_tr: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ua: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_pk: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_uz: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_vn: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_gb: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_za: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_il: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_ng: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                    return message.channel.send(`${res.text}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:flag_za: ${res.text}`);
                message.channel.send({
                    embed: embed2
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
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:upside_down: ${res}`);
            message.channel.send({
                embed: embed2
            });
        } // Command End
        if (args.startsWith("zalgo")) {
            let rescont = args.split(" ").slice(1).join(" ");
            var zalgo = require('to-zalgo');
            var banish = require('to-zalgo/banish');
            var res = zalgo(`${rescont}`);
            if (res.length > 200) {
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:upside_down: ${res}`);
            message.channel.send({
                embed: embed2
            });
        } // Command End
        if (args.startsWith("gangsta")) {
            let rescont = args.split(" ").slice(1).join(" ");
            G.string(`${rescont}`, function(error, translation) {
                if (translation.length > 200) {
                    return message.channel.send(`${translation}`, {
                        code: "xl"
                    });
                }
                const embed2 = new Discord.RichEmbed()
                    .setColor(0xFFFFFF)
                    .setTitle(`:gun: ${translation}`);
                message.channel.send({
                    embed: embed2
                });
            });
        } // Command End
        if (args.startsWith("yoda")) {
            let rescont = args.split(" ").slice(1).join(" ");
            yoda.convert(`${rescont}`,
                function(err, result) {
                    if (!err) {
                        if (result.toString().length > 200) {
                            return message.channel.send(`${result.toString()}`, {
                                code: "xl"
                            });
                        }
                        const embed2 = new Discord.RichEmbed()
                            .setColor(0xFFFFFF)
                            .setTitle(`:rocket: ${result.toString()}`);
                        message.channel.send({
                            embed: embed2
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
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:flag_kr: ${res}`);
            message.channel.send({
                embed: embed2
            });
        }
        if (args.startsWith("hangulified-korean")) {
            let rescont = args.split(" ").slice(1).join(" ");
            let res = kpop.hangulify(`${rescont}`);
            if (res.length > 200) {
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:flag_kr: ${res}`);
            message.channel.send({
                embed: embed2
            });
        }
        if (args.startsWith("romanized-japanese")) {
            let rescont = args.split(" ").slice(1).join(" ");
            let res = japanese.romanize(`${rescont}`);
            if (res.length > 200) {
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:flag_jp: ${res}`);
            message.channel.send({
                embed: embed2
            });
        }
        if (args.startsWith("katakanized-japanese")) {
            let rescont = args.split(" ").slice(1).join(" ");
            let res = japanese.katakanize(`${rescont}`);
            if (res.length > 200) {
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:flag_jp: ${res}`);
            message.channel.send({
                embed: embed2
            });
        }
        if (args.startsWith("hiraganized-japanese")) {
            let rescont = args.split(" ").slice(1).join(" ");
            let res = japanese.hiraganize(`${rescont}`);
            if (res.length > 200) {
                return message.channel.send(`${res}`, {
                    code: "xl"
                });
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setTitle(`:flag_jp: ${res}`);
            message.channel.send({
                embed: embed2
            });
        } //Command End
        if (!message.author.avatarURL) {
            const CMD2embed = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setAuthor(`${message.author.username}`, `http://nuttysu.cc/300x300bb.jpg`)
                .setFooter(`${message.guild.name}`, `http://nuttysu.cc/300x300bb.jpg`)
                .setTimestamp()
                .addField(`AuthorID`, `${message.author.id}`, true)
                .addField(`GuildID`, `${message.guild.id}`, true)
                .addField(`Channel Name`, `${message.channel.name}`, true)
                .addField(`Translation`, `${message.content}`, true);
            client.channels.get(`337228369295048706`).send({
                embed: CMD2embed
            });
            return;
        }
        if (!message.guild.iconURL) {
            const CMD2embed = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setAuthor(`${message.author.username}`, `http://nuttysu.cc/300x300bb.jpg`)
                .setFooter(`${message.guild.name}`, `http://nuttysu.cc/300x300bb.jpg`)
                .setTimestamp()
                .addField(`AuthorID`, `${message.author.id}`, true)
                .addField(`GuildID`, `${message.guild.id}`, true)
                .addField(`Channel Name`, `${message.channel.name}`, true)
                .addField(`Translation`, `${message.content}`, true);
            client.channels.get(`337228369295048706`).send({
                embed: CMD2embed
            });
            return;
        }
        if (message.content.length > 1024) return;
        const CMDembed = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
            .setFooter(`${message.guild.name}`, `${message.guild.iconURL}`)
            .setTimestamp()
            .addField(`AuthorID`, `${message.author.id}`, true)
            .addField(`GuildID`, `${message.guild.id}`, true)
            .addField(`Channel Name`, `${message.channel.name}`, true)
            .addField(`Translation`, `${message.content}`, true);
        client.channels.get(`337228369295048706`).send({
            embed: CMDembed
        });
    } // Translate End




    if (message.content.toLowerCase() === ":t ping") {
        let botPing = Math.floor(client.ping);
        const embed2 = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`:satellite_orbital: My ping is ${botPing}`);
        message.channel.send({
            embed: embed2
        });
    }

    if (command === "setavatar") {
        let args = message.content.split(" ").slice(1).join(" ");
        if (!args) {
            return message.channel.send(`:warning: ERROR: You need to type something first..`);
        }
        if (message.author.id !== "205912295837138944") return;
        client.user.setAvatar(`${args}`);
        message.channel.send(`My avatar was changed to "${args}"`);
    }

    if (command === "setusername") {
        let args = message.content.split(" ").slice(1).join(" ");
        if (!args) {
            return message.channel.send(`:warning: ERROR: You need to type something first..`);
        }
        if (message.author.id !== "205912295837138944") return;
        client.user.setUsername(`${args}`);
        message.channel.send(`My username has been changed to ${args}!`);

    }

    if (command === "setgame") {
        let args = message.content.split(" ").slice(1).join(" ");
        if (message.author.id !== "205912295837138944") return;
        if (!args) {
            return message.channel.send(`:warning: ERROR: You need to type something first..`);
        }
        client.user.setGame(`${args}`);
        const embed2 = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`:video_game: My game was set to "${args}"`);
        message.channel.send({
            embed: embed2
        });
    }

    if (message.content.toLowerCase() === ":t help") {
        message.reply("Want to know how to use the Translate Bot? View the helppage here! https://discordbots.org/bot/translate | **If you like Translate, please consider making a pledge on our Patreon, every little bit helps pay for the costs to keep Translate online** https://www.patreon.com/TannerReynolds");
    }

    if (message.content.toLowerCase() === ":t invite") {
        message.reply("Want me on your server? use this link! https://discordapp.com/oauth2/authorize?client_id=318554710929833986&scope=bot&permissions=8");
    }

    if (message.content.startsWith(':T reply')) {
        const gfw = require('get-first-words');
        let args = message.content.split(" ").slice(2).join(" ");
        if (message.author.id !== "205912295837138944") return;
        if (!args) {
            return message.channel.send(`:warning: ERROR: You need to type something first..`);
        }
        let trunum = gfw(`${args}`);
        if (`${trunum}` === 'undefined') {
            return message.channel.send(`This user is no longer within reach`);
        }
        if (isNaN(`${trunum}`) === true) {
            return message.channel.send(`${trunum} is not an id`);
        }
        if (isNaN(`${trunum}`) === false) {
            let rep = args.split(" ").slice(1).join(" ");
            if (!rep) {
                return message.reply('send a reply');
            }
            client.users.get(`${trunum}`).send(`\`MESSAGE FROM DEV\` \`\`\`${rep}\`\`\` If you need further assistance or want to contact the developer, you can either add "Solace#8338" or join the Discord https://discord.gg/3bWf3a2`);
            let guy = client.users.get(`${trunum}`);
            message.channel.send(`Sent a dev reply to ${guy.username}`);
        }
    }

    if (message.content.toLowerCase().startsWith(":t suggest")) {
        let args = message.content.split(" ").slice(2).join(" ");
        if (message.guild.name === "Null") return;
        if (!args) {
            return message.reply(`You need to type something first...`);
        }
        if (args.length > 1024) {
            return message.channel.send(`Your Suggestion is too long.`);
        }
        const embed = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
            .setFooter(`${message.guild.name}`, `${message.guild.iconURL}`)
            .setTimestamp()
            .addField(`AuthorID`, `${message.author.id}`, true)
            .addField(`GuildID`, `${message.guild.id}`, true)
            .addField(`Suggestion`, `${args}`, true);


        client.channels.get(`314819480817762304`).send({
            embed
        });

        const embed2 = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`:wrench: Suggestion sent! If you like Translate, please consider making a pledge on our Patreon, every little bit helps pay for the costs to keep Translate online https://www.patreon.com/TannerReynolds`);
        message.channel.send({
            embed: embed2
        });
    }

    if (message.content.toLowerCase().startsWith(":t bug")) {
        let args = message.content.split(" ").slice(2).join(" ");

        if (!args) {
            return message.reply(`You need to type something first...`);
        }
        if (args.length > 1024) {
            return message.channel.send(`Your bug report is too long.`);
        }
        const embed = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
            .setFooter(`${message.guild.name}`, `${message.guild.iconURL}`)
            .setTimestamp()
            .addField(`AuthorID`, `${message.author.id}`, true)
            .addField(`GuildID`, `${message.guild.id}`, true)
            .addField(`Report`, `${args}`, true);


        client.channels.get(`315280472378966016`).send({
            embed
        });

        const embed2 = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`:wrench: Bug report sent! If the developer has any questions regarding your bug report, this bot will DM you the developer's question/message, so be sure to allow DMs from people within the guild.`);
        message.channel.send({
            embed: embed2
        });
    }


    if (message.content.toLowerCase() === ":t stats") {
        let servers = client.guilds.size;
        let playercount = client.guilds.reduce((p, c) => p + c.memberCount, 0);
        let mintime = ostb.uptime() / 60;
        let uptime = Math.floor(mintime / 60);
        let serversLarge = client.guilds.filter(m => m.large).size;
        let botPing = Math.floor(client.ping);
        ostb.cpuLoad().then(function(cpuusage) {
            ostb.memoryUsage().then(function(memusage) {
                ostb.currentProcesses().then(function(processes) {
                    const curpro = processes;
                    const meuse = memusage;
                    const acusage = cpuusage;
                    message.channel.send(`[CPU]: ${acusage}%

[RAM]: ${meuse}%

[Network Speed]: 1gbps

[Ping]: ${botPing}

[Guilds bot is running on]: ${servers}

[Large guilds bot is running on]: ${serversLarge}

[Total Member Count]: ${playercount}

[Platform]: CentOS 7 x64 - Linux

[Server Location]: San Jose

[Hosting Provider]: Vultr Holdings LLC

[Client Uptime]: ${Math.floor(((client.uptime / (1000*60*60)) % 24))}

[Server Uptime]: ${JSON.stringify(uptime)} hours`, {
                        code: 'ini'
                    });
                });
            });
        });
    }

    if (command === "update") {
        if (message.author.id !== "205912295837138944") {
            return message.channel.send(`Only bot devs can update the bot's code.`);
        }
        const embed2 = new Discord.RichEmbed()
            .setColor(0xFFFFFF)
            .setTitle(`:cd: Restarting`);
        message.channel.send({
            embed: embed2
        });
        setTimeout(() => {
            client.destroy();
            console.log(`Logging off...`);
        }, 1000);
    }

    if (message.content.toLowerCase() === ":t patreon") {
        message.reply(`https://www.patreon.com/TannerReynolds`);
    }

    if (message.content === ":T guild list") {
        if (message.author.id !== "205912295837138944") return;
        let translateGuilds = client.guilds.map(g => `NAME: ${g.name} | MEMBER ACOUNT: ${g.memberCount} | GUILD ID: ${g.id} | OWNER ID: ${g.ownerID} | LARGE GUILD: ${g.large}\n`)
        var writeFile = require('write');
        writeFile(`${message.id}${client.uptime}GUILDINFO.txt`, `${translateGuilds}`, function(err) {
            if (err) {
                console.log(err);
                message.reply('Error while processing guild information.');
            } else {
                message.reply(`Guild Info file made! Reporting info on ${client.guilds.size} guilds! File name: ${message.id}${client.uptime}GUILDINFO.txt`);
            }
        });
    }


});



client.on('message', message => {
    const evalprefix = '}=';
    const args = message.content.split(" ").slice(1);

    if (message.author.id !== "205912295837138944") return;
    if (message.content.startsWith(evalprefix + "eval")) {
        try {
            var code = args.join(" ");
            var evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const embed = new Discord.RichEmbed()
                .setColor(0x74FF62)

            .addField(`Input`, `${code}`)
                .addField(`Output`, `\`\`\`js
  ${clean(evaled)}
   \`\`\``);
            message.channel.send({
                embed
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            const embed = new Discord.RichEmbed()
                .setColor(0x74FF62)

            .addField(`Input`, `${code}`)
                .addField(`Output`, `\`\`\`js
  \`ERROR\`
  ${clean(err)}
   \`\`\``);
        }
    }
});

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

client.login(`${tlcfg.token}`);