<p>Chengrui's blog created with Jekyll and customized [minima](https://github.com/jekyll/minima/tree/v2.5.0) theme. Mostly this is just a 
side project for me to have fun with freshly learned CSS. However, for long, I have been hoping to have a place to jot down what I have learned
as my knowledge base. And meanwhile, if it can help someone solving their problems, it's even better.</p>

<p>I'll keep interating on the site to make it more functional and prettier. However, I'll not be bothered by SEO etc. And here are somethings that
I woule like to do:</p>

* create page `search`
* butify page `About`
* create sidebar nav
* select prettier font

### Things I used to build the site
<p>This is a brief introduction of tools/technologies that I use to build the site. Note that I'm not a pro font-ender/infrastructure in anymeans. So some of the stuff may not make sense or seems obselate,
 it's purely for my own sake to write it down. Do not take it as an example without doing your own research:</p>

#### Site itself
 * [Jekyll](https://jekyllrb.com/): static site generator
    *  [minima](https://github.com/jekyll/minima/tree/v2.5.0): a theme of Jekyll, I customized the 3.0 version
 * [SASS](https://sass-lang.com/): SCSS which makes CSS fancier and easier
 * Javascript: not a langurate that I prefer. Maybe time to look at WebAssembly + Rust
 * [font awesome](https://fortawesome.com/): for epic icons

#### CI/CD
 * Jenkins: my self-hosed jenkins server that have bunch of raspberry pi agents
     * Build the site and deploy to staging env
     * everything alright? merge to master and deploy to orphan branch
 * git precommit: for now only runs Jenkins linter, checks for syntax error in Jenkinsfile
 * Docker for consistent build env
 * [Kinsta](https://kinsta.com/static-site-hosting/): provides **FREE** static site hosting with CDN and everything. Wanderful integration with Github that automatically deploy the site from the orphan branch

#### Other
 * AWS Route 53: Domain and DNS stuff. 


### Note to self
* [staging site](http://192.168.20.25:8888/)
