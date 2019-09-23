const core = require('@actions/core');
const github = require('@actions/github');

try {
  const token = core.getInput('github_token');
  const pr = github.context.payload.pull_request;
  const titleRegexStr = core.getInput('title_regex');
  const titleRegex = new RegExp(titleRegexStr);
  console.log(`The pull request object: ${JSON.stringify(pr)}`);
  const octokit = new github.GitHub(token);
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  if (!pr.title.match(titleRegex)) {
    core.setFailed("PR must refer to a Clubhouse card, or be a [rp], [hotfix]");
  }
} catch (error) {
  core.setFailed(error.message);
}
