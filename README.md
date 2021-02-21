<h1 align='center' style='margin: auto; text-align: center'>
    <img src='readme-assets/react.svg' width=25 style='display: inline-block' /> Building a React App from Scratch (2021)
    <img src='readme-assets/react.svg' width=25 style='display: inline-block' />
</h1>

<h4 align='center'>A step-by-step tutorial to setting up a modern React app in 2021 with no boilerplate.</h4>

<br />

## 💪 Motivation 

The main objective of this tutorial for me was to get myself to better understand the multiple moving parts that make a React app work, rather than just accepting the "magic" of the many templates/boilerplates out there, like [create-react-app](https://create-react-app.dev/), and [react-boilerplate](https://www.reactboilerplate.com/).

It was very much inspired by the extremely well-written <i>[Creating a React App… From Scratch.](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)</i> by [@paradoxinversion](https://github.com/paradoxinversion), an article that is so good it is referenced in the [official React Docs](https://reactjs.org/docs/create-a-new-react-app.html#creating-a-toolchain-from-scratch).

However, times change, and I wanted to build a modern React app from scratch in 2021. As such, I had a few more "essentials" to include in the toolchain, and wanted to work with the latest versions of core libraries. In some ways, I see this as the `latest` version of the tutorial mentioned above.

## 🎯 Objective

My goal here is simple: build a React app from "scratch". From scratch here doesn't mean building the supporting tools myself, but rather taking responsibility for their setup, rather than outsourcing it to something like `create-react-app`.

However, beyond setting up a React app that just works, I also had a few more requirements, pertaining to what many would deem "essentials" of the modern stack:

1. It must support TypeScript
2. It should state management provisioned out of the gate

## ⚒️ Tooling

So what exactly do I need to make this work?

To find the answer, I started with the React Docs. 

Reading <i>[Creating a Toolchain from Scratch](https://reactjs.org/docs/create-a-new-react-app.html#creating-a-toolchain-from-scratch
)</i> tells me the following about what I need:

<blockquote>

* A **package manager**, such as Yarn or npm. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
* A **bundler**, such as webpack or Parcel. It lets you write modular code and bundle it together into small packages to optimize load time.
* A **compiler** such as Babel. It lets you write modern JavaScript code that still works in older browsers.

</blockquote>

This little snippet tells me in a concise way quite a bit about what I need and why I need it. So I made my picks:

* **Package manager:** [Yarn](https://yarnpkg.com/)
* **Bundler:** [Webpack](https://webpack.js.org/)
* **Compiler:** [Babel](https://babeljs.io/)

These are pretty standard choices. Even if you haven't set these up yourself before, you've probably dealt with them, or at least heard about them at some point. 

However, based on my requirements, I still have one thing missing - a state management library.

[Redux](https://redux.js.org/) would have been the straightforward choice, but I went with [Kea](https://kea.js.org/). Kea is in fact built _on top of_ Redux, so I'll effectively be using Redux under the hood, but it makes state management significantly easier. 

For full disclosure, I am definitely biased - the reason for choosing Kea is simply that I use it [at work](https://github.com/PostHog/posthog), and its [author](https://github.com/mariusandra) is my co-worker. 

## ▶️ Getting Started

The first thing we need is a new directory. Set that up and then run `yarn init` inside of it to get started.

When it asks you for the "entry point", use `src/index.tsx`. You'll know why in a second. 

Inside your directory, create 2 more: `src` and `public`. 

`src` will host the entire source code for our project, while `public` will be where we put the static assets. 

## ⚙️ Setup

Rather than being a one-size-fits-all tutorial, this is meant to be a learning process, and dealing with issues that arise is inevitably an important part of it. 

Hence, I won't be tagging version numbers on installations. You can check the versions being used in `package.json` if you want to use this as a boilerplate.

As an example, I decided to use Webpack v5 for this tutorial, which brought me some compatibility issues with configs I was using from Webpack v4 projects. With enough docs, articles, and StackOverflow posts, I got through it - and you will too. 

### Babel 

Getting Babel to work requires quite a few packages, you can install them like this:

```shell
yarn add --dev \
  @babel/core \
  @babel/cli \
  @babel/preset-env \
  @babel/preset-typescript \
  @babel/preset-react
```

`babel-core` is the compiler, the main thing we need.

`babel-cli` will let us use the compiler via the CLI.

The last three packages are Babel "templates" (presets), for dealing with various use cases. `preset-env` is used to prevent us from having headaches, allowing us to write modern JS while ensuring the output will work across clients. `preset-typescript` and `preset-react` are quite self-explanatory: we're using both TypeScript and React, so we'll be needing them.

Finally, we need to set up a `babel.config.js` file, specifying to the compiler the presets we're using:

```js
// babel.config.js
module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
}
```

### TypeScript

We want to use TypeScript in our project, so that has its own setup beyond the Babel preset.

First, we need the `typescript` package:

```shell
yarn add --dev typescript
```

Then, being proactive, I suggest you also get the following packages if you'll be following this tutorial until the end:

```shell
yarn add --dev @types/react @types/react-dom @types/react-redux
```

These packages contain the type declaration for the modules we'll be using throughout the project.

### Webpack

Webpack also needs a lot of stuff to work. Essentially, for every type of file we want to bundle, we'll need a specific loader.

Hence, here's what we need:

```shell
yarn add --dev \
    webpack \
    webpack-cli \
    webpack-dev-server \
    style-loader \
    css-loader \
    babel-loader
```

`webpack` and `webpack-cli` follow the same principle as Babel - one is the core package and the other let's us access those tools from the CLI.

`webpack-dev-server` is what we need for local development. You'll notice that `package.json` never actually references it from a script, but it is required to run `webpack serve`:

```
[webpack-cli] For using 'serve' command you need to install: 'webpack-dev-server' package
```

Finally, the loaders are what we need for the different files we want to process. A `ts-loader` also exists, but, since we're using Babel to compile our JS files, we don't actually need it.

And, like with Babel, we need a `webpack.config.js` file:

```js
// webpack.config.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.tsx', // our entry point, as mentioned earlier
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/, // matches .js, .ts, and .tsx files
                loader: 'babel-loader', // uses babel-loader for the specified file types (no ts-loader needed)
                exclude: /node_modules/, 
            },
            {
                test: /\.css$/, // matches .css files only (i.e. not .scss, etc)
                use: ['style-loader', 'css-loader'], 
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js', // our output bundle
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()], // used for hot reloading when developing
    devtool: 'eval-source-map', // builds high quality source maps
}

```





