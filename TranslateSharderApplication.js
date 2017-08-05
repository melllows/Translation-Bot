const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(`GTrans.js`, { totalShards: 1 });
manager.spawn();
manager.on('launch', shard => console.log(`Successfully launched shard ${shard.id}`));
