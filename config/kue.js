const kue = require("kue");

// creating a queue to store the delayed jobs which will be executed by the worker. The queue is created using kue which is backed by redis.
// Redis runs its own server and handles the queue and stores the queue in JSON fromat
const queue = kue.createQueue();

module.exports = queue;
