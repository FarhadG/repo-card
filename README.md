Repo Card
=========

Give your repos some freshness with a Repo Card.

## About

I often get lazy adding a profile to my repositories, especially when I'd like for them to get forked, starred, etc. 
If you've been there, then Repo Cards are for you.

Here's one of my own repos with one: <a target="_blank" href="https://www.github.com/farhadg/2048-cube">2048 Cube</a>

## Usage

You can add a repo card in many different ways to your projects. Choose one that's easiest for you:

Reference the script file via the CDN
```javascript
<script src="https://cdn.rawgit.com/FarhadG/repo-card/master/repo-card.min.js"></script>
```

Install via Bower
```bash
$ bower install repo-card --save
```

Then, you simply configure the Repo card
```javascript
// Once you've sourced the repo from either the CDN or locally, you use the data-attributes to configure the repo card
<script src="./repo-card.min.js" id="repo-card-lib"
        data-repo="init"
        data-username="farhadg"
        data-title="Init">
</script>
```

Or, you configure it within your app as seen in the `script` tag below
```javascript
<script src="../lib/repo-card/repo-card.js"></script>
<script>
  RepoCard
    .configure({
      repo: 'init',
      username: 'farhadg',
      title: 'Init',
      subtitle: '@farhadg',
      info: 'A quick way to get you to the first commit of any GitHub repo (tracks branches too)',
    });
</script>
```

## Options

Here are some options that you can set within the `data-attrbutes` (e.g. `data-info="some information`) or in your app.

- repo: The name of the repo 
- theme: There's only one theme right now (`doodle`), however, I'd love more themes. Check out the `themes` folder or reach out if you'd like assistance in contributing
- username: Your Github username
- title: A title for the repo card
- subtitle: A subtitle for the repo card
- info: Some information you'd like to include about your project
- background: Set the background (it accepts CSS, so HEX, RGB or even an image, `url(...)`, works
- thumb: Set the thumbnail (it accepts CSS, so HEX, RGB or even an image, `url(...)`, works
- position: The card is currently set to `fixed` position, so you can set where it's mounted on the page (e.g. `position: { top: 15, right: 15 }`


## Coming

- More themes (would love your help on this)
- GUI dashboard for configuring the Repo Card
- Animations to have the repo card hide away with interactions (e.g. `scroll`)


## Questions

Please use the issues page with any questions/concerns. If you like this idea and find it useful, please share the project as I'd love the help :) 