// Workers execute the job in the queue of delayed jobs

// imports the queue inside which the delayed jobs are present
const queue = require("../config/kue");
// imports the commentsMailer and executes the task
const commentsMailer = require("../mailers/comments_mailer");

// process is a function of the worker which executes the job, 'emails' is the name of the job
queue.process("emails", function (job, done) {
  console.log("emails worker is processing a job ", job.data);

  // this calls the commentsMailer and sends the email i.e executes the job
  commentsMailer.newComment(job.data);
  done();
});
