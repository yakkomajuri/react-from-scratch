<h1 align='center' style='margin: auto; text-align: center'>
    <img src='readme-assets/react.svg' width=25 style='display: inline-block' /> Building a Modern React App from Scratch
    <img src='readme-assets/react.svg' width=25 style='display: inline-block' />
</h1>

<h4 align='center'>A step-by-step tutorial to setting up a modern React app with no boilerplate.</h4>

<br />

<hr />

## 📋 Table of Contents

1. [Running as a boilerplate](#%EF%B8%8F-running-as-a-boilerplate)
1. [Motivation](#-motivation)
1. [Objective](#-objective)
1. [Tooling](#%EF%B8%8F-tooling)
1. [Getting Started](#%EF%B8%8F-getting-started)
1. [Setup](#%EF%B8%8F-setup)
    - [Babel](#babel)
    - [TypeScript](#typescript)
    - [Webpack](#webpack)
    - [React](#react)
    - [Kea](#kea)
    - [package.json](#packagejson)
1. [Finally, some React code](#-finally-some-react-code)
    - [But first, some vanilla HTML](#but-first-some-vanilla-html)
    - [The entry point](#the-entry-point)
    - [Our App!](#our-app)
    - [Writing JS and TS side-by-side](#writing-js-and-ts-side-by-side)
    - [Counter](#counter)

<hr />

## ⏭️ Running as a boilerplate

If you want to use this repo as a boilerplate, you can simply do:

```shell
git clone https://github.com/yakkomajuri/react-from-scratch
cd react-from-scratch
yarn
yarn start
```

The app will be available on `localhost:3000`.

## 💪 Motivation 

The main objective of this tutorial for me was to get myself to better understand the multiple moving parts that make a React app work, rather than just accepting the "magic" of the many templates/boilerplates out there, like [create-react-app](https://create-react-app.dev/), and [react-boilerplate](https://www.reactboilerplate.com/).

It was very much inspired by the extremely well-written <i>[Creating a React App… From Scratch.](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)</i> by [@paradoxinversion](https://github.com/paradoxinversion), an article that is so good it is referenced in the [official React Docs](https://reactjs.org/docs/create-a-new-react-app.html#creating-a-toolchain-from-scratch).

However, times change, and I wanted to build a modern React app from scratch following the latest developments. As such, I had a few more "essentials" to include in the toolchain, and wanted to work with the latest versions of core libraries. In some ways, I see this as the `latest` version of the tutorial mentioned above.

## 🎯 Objective

My goal here is simple: build a React app from "scratch". From scratch here doesn't mean building the supporting tools myself, but rather taking responsibility for their setup, rather than outsourcing it to something like `create-react-app`.

However, beyond setting up a React app that just works, I also had a few more requirements, pertaining to what many would deem "essentials" of the modern stack:

1. It must support TypeScript
2. It should have state management provisioned out of the gate

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

This short snippet tells me quite a bit about what I need and why I need it. So I made my picks:

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

As an example, I decided to use Webpack v5 for this tutorial, which brought me some compatibility issues with configs I was originally using from Webpack v4 projects. As always, with enough docs, articles, and StackOverflow posts, I got through it, and learned more in the process.

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

And we also need a `tsconfig.json` file - I'm using [the config from here, which we use in production](https://github.com/PostHog/posthog.com/blob/master/tsconfig.json):

```js
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "types/*": ["./types/*"]
        },
        // https://www.sitepoint.com/react-with-typescript-best-practices/
        "allowJs": true, // Allow JavaScript files to be compiled
        "skipLibCheck": true, // Skip type checking of all declaration files
        "esModuleInterop": true, // Disables namespace imports (import * as fs from "fs") and enables CJS/AMD/UMD style imports (import fs from "fs")
        "allowSyntheticDefaultImports": true, // Allow default imports from modules with no default export
        "strict": true, // Enable all strict type checking options
        "forceConsistentCasingInFileNames": true, // Disallow inconsistently-cased references to the same file.
        "module": "esnext", // Specify module code generation
        "moduleResolution": "node", // Resolve modules using Node.js style
        "resolveJsonModule": true, // Include modules imported with .json extension
        "noEmit": true, // Do not emit output (meaning do not compile code, only perform type checking)
        "jsx": "react", // Support JSX in .tsx files
        "sourceMap": true, // Generate corrresponding .map file
        "declaration": true, // Generate corresponding .d.ts file
        "noUnusedLocals": true, // Report errors on unused locals
        "noUnusedParameters": true, // Report errors on unused parameters
        "experimentalDecorators": true, // Enables experimental support for ES decorators
        "noFallthroughCasesInSwitch": true, // Report errors for fallthrough cases in switch statement
        "lib": ["dom", "es2019.array"]
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules/**/*", "staticfiles/**/*", "frontend/dist/**/*"]
}
```

Feel free to change some of the configuration above to better suit your needs. However, it's important that you keep these options:

```
"noEmit": true, // Do not emit output (meaning do not compile code, only perform type checking)
"jsx": "react", // Support JSX in .tsx files
```

`"jsx": "react"` is self-explanatory. As for `noEmit`, the reason we should have this as true is because Babel is compiling the TypeScript for us, so we just want `typescript` to be used to check for errors (e.g. while we're writing code).

> Sidenote: [Comments are allowed in `tsconfig.json` files](https://github.com/Microsoft/TypeScript/pull/5450)

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

### React

Given that this is a React app, we need some React packages too!

This should be enough:

```shell
yarn add react react-dom react-hot-loader
```

`react` is self-explanatory. `react-dom` will be used to render our app on `index.tsx`, and `react-hot-loader` is used for development - it will auto update our app on file changes.

### Kea

Lastly, we need to set up our state management library, Kea.

From the [Kea Docs](https://kea.js.org/docs/installation/instructions), here's what you need:

```shell
yarn add kea redux react-redux reselect
```

We'll think ahead here as well and also grab us a separate package used when Kea logic is written in TypeScript:

```shell
yarn add --dev kea-typegen
```

### package.json

With all this set up, we should add a few useful scripts to our `package.json` file:

```json
    ...
    "scripts": {
        "start": "webpack serve --mode development",
        "typegen": "kea-typegen write ./src"
    },
    ...
```

`start` will be used to run our server, and `typegen` to generate types for our Kea logic files.

## 💻 Finally, some React code

Quite a bit of setup, huh? I guess we should be thankful for boilerplates, especially when they manage all the dependencies and versioning for us (_cough_ [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts)).

Nevertheless, we're now done with setup, so onto some code!

### But first, some vanilla HTML

The first thing we need is an `index.html` file, that React will use to render our app. It is the only `.html` file we'll have. This is also the only file we'll have in `public/` in this tutorial.

Here's my `index.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>React from Scratch</title>
    </head>
    <body>
        <div id="root"></div>
        <noscript> You need to enable JavaScript to access this website. </noscript>
        <script src="../dist/bundle.js"></script>
    </body>
</html>
```

There are a few things happening here:
* We're setting a few default meta tags, as well as a title for our website
* We specified a `root` div, which we'll use to render our App (this is essentially the starting point from which the inner HTML will be dynamically-generated by React)
* We added a message for those that have JavaScript disabled, as our app won't work for them
* We imported our finished Webpack bundle, which we haven't actually generated yet
    * This will contain all the code we write in a single file

### The entry point

Remember the mention to entry point from earlier? Well now we've gotten to it. Go into the `src/` subdir and make a new file called `index.tsx`. 

Here's what I have in mine:

```js
import React from 'react'
import ReactDOM from 'react-dom' 
import { Provider } from 'react-redux'
import { getContext, resetContext } from 'kea'
import { App } from './App'

resetContext({
    createStore: {},
    plugins: [],
})

ReactDOM.render(
    <Provider store={getContext().store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

There are 3 key things happening here:
1. We're setting up Kea, which, like Redux, uses `Provider` to make the store available to any nested components (in this case, our entire app)
    - The `resetContext` call is not actually needed here, since we're not passing anything to it. However, I've left it here so you know where to add, for example, your Kea plugins, since you'll likely use those
2. We're importing and rendering our `App` component (which we haven't built yet)
3. We're telling React to render our app using our `root` div from `index.html` as the "binding point"

### Our App!

Now, create a file called `App.tsx`, also inside `src/`, with the following:

```js
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { MyJSComponent } from './components/MyJSComponent'
import { Counter } from './components/Counter'

export const App = hot(_App)
export function _App(): JSX.Element | null {
    return (
        <div>
            <h1>Hello world!</h1>
            <MyJSComponent />
            <Counter />
        </div>
    )
}
```

If you just want to see your app working at this point, you can remove the imports and references to `MyJSComponent` and `Counter` and run `yarn start`. This will start your server and you should be able to access your React app at `localhost:3000`, receiving your 'Hello world!' greeting from it.

The reason I've included these two extra components is to test that we have a few things working:
1. We can write JavaScript alongside TypeScript
2. Our state management is working fine
3. Our bundler processes `.css` files with no problem (`Counter` has some minimal styling)

Hence, you could stop here if you wanted to. But if you want to see these 3 things in action, read on.

 ### Writing JS and TS side-by-side

As you saw in our `App.tsx` file, we have a TypeScript file importing a JavaScript file with no problems. 

The reason this works is because of this rule we have in `webpack.config.js`:

```js
{
    test: /\.[jt]sx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
},
```

Remove the `j` from `test` and we wouldn't be able to use JS files with TS files.

To test that everything is working fine, I simply created a tiny JS component and imported it into app.

I created it in a new directory called `components/`, and here's what it contains:

```js
import React from 'react'

export const MyJSComponent = () => <h2>Try out the counter below!</h2>
```

### Counter

The last thing I added to this project, while still keeping it minimal, is the traditional React counter component. 

The goal here is to test that our Kea setup works, as well as that importing CSS files works too.

So, I first created a subdir inside `components/` called `Counter`. Here I added 3 files:

#### index.tsx

Includes the actual component. Here it is:


```js
import React, { useState } from 'react'
import { useValues, useActions } from 'kea'
import { counterLogic } from './counterLogic'
import './style.css'

export const Counter = () => {
    const { count } = useValues(counterLogic)
    const { incrementCounter, decrementCounter, updateCounter } = useActions(counterLogic)

    const [inputValue, setInputValue] = useState(0)

    return (
        <div>
            <h3>{count}</h3>
            <div>
                <button onClick={incrementCounter}>+</button>
                <button onClick={decrementCounter}>-</button>
            </div>
            <br />
            <div>
                <input type="number" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
                <button onClick={() => updateCounter(inputValue)}>Update Value</button>
            </div>
        </div>
    )
}
```

Pretty simple stuff. Click `+` and the count goes up, `-` and the count goes down. Set any number using the input and count will be updated too.

Also notice the `style.css` import.

#### counterLogic.ts

`counterLogic.ts` hosts the logic for manipulating the state that our `Counter` component uses. I won't explain how Kea works here, but the following is pretty self-explanatory:

```js
import { kea } from 'kea'
import { counterLogicType } from './counterLogicType'

export const counterLogic = kea<counterLogicType>({
    actions: {
        incrementCounter: true, // https://kea.js.org/docs/guide/concepts#actions
        decrementCounter: true, // true is shorthand for a function that doesn't take any arguments
        updateCounter: (newValue: number) => ({ newValue }),
    },
    reducers: {
        count: [
            0, // default value
            {
                incrementCounter: (state) => state + 1,
                decrementCounter: (state) => state - 1,
                updateCounter: (_, { newValue }) => newValue, // ignore the state, set new value
            },
        ],
    },
})
```

#### style.css

Here I just have the most minimal styling I could think of, just to test that CSS is working as intended:

```css
h3 {
    color: blue;
}
```

#### What about counterLogicType.ts?

Good question. If you explore the code in this repo you will see a `counterLogicType.ts` file inside the `Counter` directory.

This file is automatically generated by `kea-typegen` and contains the types for the `counterLogic`. It was generated by running `yarn typegen`, leveraging the command we added to `package.json` earlier. Usually, one shouldn't commit these files, since they're only useful in development, but I've left this one here so you can see what it looks like. 

## That's it!

If you've gotten all the way down here, hopefully you've come out of it with a shiny new React app, a modern boilerplate, and some additional knowledge. Honestly, this is just me documenting a bit of my learning process, but hopefully you got something out of it too!

If you have any feedback or suggestions, feel free to open an issue for it. 
