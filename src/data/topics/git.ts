import type { Topic } from '../types'

export const git: Topic = {
  id: 'git',
  title: 'Git / GitHub',
  blurb: 'Everyday Git: merging, rebasing, undoing mistakes, branching, pull requests and CI.',
  questions: [
    {
      id: 'git-1',
      question: `Merge vs rebase, what is the difference and when do you use each?`,
      short: `Merge combines two branches by creating a merge commit, so history shows exactly what happened, including the branch. Rebase takes my commits and replays them on top of another branch, which gives a clean straight line of history. I rebase my own feature branch on main to stay up to date before opening a PR. I merge when integrating into main, often via squash or merge button. The golden rule is never rebase commits that others have already pulled, because it rewrites history.`,
      simple: `Merge ties two branches together with a merge commit. Rebase moves your commits to sit on top of the latest branch, for a cleaner history.`,
      example: { code: `git checkout feature\ngit rebase main`, lang: 'bash' },
      followUp: [`Why is rebasing a shared branch dangerous?`, `What is a squash merge?`],
    },
    {
      id: 'git-2',
      question: `git fetch vs git pull?`,
      short: `git fetch downloads the latest changes from the remote but doesn't touch my working files or my branch. I can look at what changed first. git pull is fetch plus a merge, or a rebase if configured, so it updates my current branch right away. When I want to be careful, for example with local uncommitted work, I fetch first and then decide. Day to day I use pull --rebase to avoid extra merge commits.`,
      simple: `Fetch just downloads the news. Pull downloads and also applies it to your branch.`,
      followUp: [`What does git pull --rebase do?`],
    },
    {
      id: 'git-3',
      question: `What is git stash and when do you use it?`,
      short: `Stash saves my uncommitted changes on a shelf and gives me a clean working directory. I use it when I'm in the middle of something and need to switch branches quickly, like a bug fix request comes in. Then git stash pop brings the changes back. I can use git stash list to see them, and -u to include untracked files. I don't leave things in stash for long, because they're easy to forget.`,
      simple: `It temporarily puts away your unfinished changes so you can switch tasks, and you get them back later.`,
      example: { code: `git stash -u\ngit checkout hotfix\n# ...fix...\ngit checkout -\ngit stash pop`, lang: 'bash' },
      followUp: [`What is the difference between stash pop and stash apply?`],
    },
    {
      id: 'git-4',
      question: `What is cherry-pick?`,
      short: `Cherry-pick takes a specific commit from one branch and applies it onto my current branch as a new commit. I use it when I need just one fix from another branch, like backporting a bug fix to a release branch without merging everything else. It copies the change, so the commit gets a new hash. If I overuse it, I can end up with duplicate commits and confusing history, so I use it sparingly.`,
      simple: `It copies one chosen commit onto your current branch.`,
      example: { code: `git cherry-pick a1b2c3d`, lang: 'bash' },
      followUp: [`What happens if cherry-pick has a conflict?`],
    },
    {
      id: 'git-5',
      question: `git reset vs git revert?`,
      short: `Reset moves the branch pointer back to an earlier commit, so it rewrites history. It's fine for local, unpushed commits. Soft keeps changes staged, mixed keeps them unstaged, and hard throws them away. Revert creates a new commit that undoes an earlier one, so history stays intact. That's what I use on shared branches like main, because nobody's history breaks. So reset for local cleanup, revert for anything already pushed.`,
      simple: `Reset rewinds history and is for local work. Revert adds a new commit that undoes an old one and is safe for shared branches.`,
      example: { code: `git reset --soft HEAD~1\ngit revert a1b2c3d`, lang: 'bash' },
      followUp: [`What is the difference between soft, mixed and hard reset?`],
    },
    {
      id: 'git-6',
      question: `How do you resolve a merge conflict?`,
      short: `Git marks the conflicting parts in the file with <<<<<<<, ======= and >>>>>>>. I open the file, read both sides, and decide what the final code should be, which might be one side, the other, or a mix. I remove the markers, test that the app still works, then git add the file and continue with the merge or rebase. If I don't understand the other change, I talk to whoever wrote it. VS Code's conflict view makes it quicker.`,
      simple: `Open the conflicted file, choose the right code, remove the markers, add the file, and continue.`,
      followUp: [`How do you abort a rebase that's gone wrong?`, `How do you reduce conflicts in the first place?`],
    },
    {
      id: 'git-7',
      question: `What branching strategies have you used?`,
      short: `The one I've seen most is feature branching: main is always deployable, and each task gets a branch like feature/login that goes through a pull request. Git Flow adds develop, release and hotfix branches, which suits teams with scheduled releases but feels heavy. Trunk-based development uses very short-lived branches and merges to main many times a day, often with feature flags. For small teams I like feature branches off main with short lifespans, and I keep them updated so they don't drift.`,
      simple: `Usually you make a branch per feature, then merge it into main through a pull request.`,
      followUp: [`Git Flow vs trunk-based, what are the tradeoffs?`],
    },
    {
      id: 'git-8',
      question: `How does a pull request workflow work?`,
      short: `I create a branch, commit my work, push it and open a pull request against main. The PR describes what changed and why, with screenshots for UI work. Teammates review the code and leave comments, CI runs tests and lint, and I push fixes until it's approved. Then it's merged, usually with squash or merge commit, and the branch is deleted. I try to keep PRs small, because big ones get shallow reviews. I also review others' PRs, kindly and with specific suggestions.`,
      simple: `You push your branch, ask the team to review it on GitHub, fix feedback, and then merge it into main.`,
      followUp: [`What makes a good PR?`, `What do you look for when reviewing code?`],
    },
    {
      id: 'git-9',
      question: `What is .gitignore and what should go in it?`,
      short: `.gitignore tells Git which files not to track. I put in node_modules, build output like dist, .env files with secrets, logs, and OS or editor files like .DS_Store. It only affects untracked files. If a file is already committed, I have to run git rm --cached on it first. I commit .env.example instead so teammates know which variables they need. And if a secret was ever committed, I rotate it, because deleting it later doesn't remove it from history.`,
      simple: `A file listing what Git should skip, like node_modules and secret files.`,
      example: { code: `node_modules/\ndist/\n.env\n.DS_Store`, lang: 'text' },
      followUp: [`I added a file to .gitignore but Git still tracks it, why?`],
    },
    {
      id: 'git-10',
      question: `How do you undo a commit or amend one?`,
      short: `It depends on whether I pushed. If it's local and I want to keep the changes, git reset --soft HEAD~1. To fix the last commit's message or add a forgotten file, I use git commit --amend. Both rewrite history, so if the commit is already pushed to a shared branch, I use git revert instead. If I messed up badly, git reflog shows where HEAD has been, and I can get back to a previous state. It's saved me a few times.`,
      simple: `Local commit: reset or amend it. Already pushed: revert it. Reflog helps if you lose something.`,
      example: { code: `git commit --amend -m "Fix login redirect"\ngit reflog`, lang: 'bash' },
      followUp: [`What is git reflog?`, `Is it okay to force push after amend?`],
    },
    {
      id: 'git-11',
      question: `What is git bisect?`,
      short: `Bisect does a binary search through commits to find which one introduced a bug. I tell it a good commit and a bad commit, and it checks out one in the middle. I test, mark it good or bad, and it keeps halving until it finds the culprit. With 1000 commits that's about 10 steps. You can even automate it with git bisect run and a test script. I use it when something broke and nobody knows when.`,
      simple: `It helps you find the exact commit that broke something by repeatedly testing the halfway point.`,
      example: { code: `git bisect start\ngit bisect bad\ngit bisect good v1.2.0`, lang: 'bash' },
      followUp: [`How would you automate bisect?`],
    },
    {
      id: 'git-12',
      question: `What is a fork and how is it different from a clone or branch?`,
      short: `A fork is your own copy of someone else's repository on GitHub, under your account. I use it to contribute to open source where I don't have write access: fork, clone my fork, make a branch, push, and open a PR to the original repo. A clone is a local copy on my machine. A branch is a line of work within one repo. I also add the original as an upstream remote so I can pull its latest changes into my fork.`,
      simple: `A fork is your personal copy of a repo on GitHub. A clone is a copy on your computer. A branch is a separate line of work inside a repo.`,
      followUp: [`How do you keep a fork in sync?`],
    },
    {
      id: 'git-13',
      question: `What are your commit message habits and what is CI?`,
      short: `I write a short imperative summary, like Add login validation, under about 70 characters, and a body only when the why isn't obvious. Many teams use conventional commits like feat: or fix: so changelogs can be generated. I make small, focused commits rather than one giant one. CI, continuous integration, means that on every push or PR, a server like GitHub Actions automatically installs, lints, tests and builds the code. It catches problems before merging, and CD can then deploy it automatically.`,
      simple: `Short clear messages saying what changed. CI automatically runs tests and builds on every push so bugs are caught early.`,
      example: {
        code: `name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test`,
        lang: 'yaml',
      },
      followUp: [`What is the difference between CI and CD?`, `What are conventional commits?`],
    },
  ],
}
