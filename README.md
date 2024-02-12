# Setup

- Copy package from `versions` folder to consuming app
- `npm i halumi-ui-x.y.z.tgz`
- Install `tailwindcss` & `postcss` if not already installed
- Create `postcss.config.cjs` with the following content:

  ```js
  const config = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };

  module.exports = config;
  ```

- Create `tailwind.config.ts` e.g. with the following content:

  ```ts
  import { type Config } from 'tailwindcss';

  export default {
    presets: [require('halumi-ui/tailwind-config')],
    content: ['./src/**/*.tsx'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-roboto)'],
          mono: 'Consolas',
        },
      },
    },
  } satisfies Config;
  ```

- Ensure that consuming app loads the required fonts etc.\
  E.g. using the following in NextJS:

  ```ts
  import { Roboto } from 'next/font/google';

  const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    display: 'swap',
    variable: '--font-roboto',
  });
  ```

- Use the components

# Dev workflow

When making changes to the library, do the following to test them in the consuming app:

- Bump the version in `package.json` to an alpha version
- Install the package in the consuming app e.g. using some command like `npm i ./../halumi-ui/versions/halumi-ui-x.y.z-alphaXX.tgz`
- (Optional) Restart the app (often required, sometimes not 🤷‍♂️)

Those steps need to be done on every change. Especially updating the version number is important as Next/Webpack
caches code when installing a package with the same version number subsequently.

## Alternative

- Using `npm link` doesn't seem to work well with NextJS.
- Copy the component which is being worked on into the consuming app during dev time. Should usually only require minor changes to the imports.

# ToDo

- Create git project
- Do we need `components.json` here?
- Test `npm run dev:link...` cmds and remove them from `halumi-ui` and consuming app if they don't work.
  - Check if we need to run `npm i` or anything the like in consuming code after `npm run dev:unlink-halumi-ui`
- NPM script `dev:install-into-project`:
  - Convert all files in `build-scripts` to TS
  - Maybe create 1 script which does it all incl. `npm run pack` etc.?
  - Use `chalk` to colorize outputs (red errors etc.)
  - Return/set error code when something failed (file not found etc.)
  - Multi project support, either:
    - using multiple tasks for each project
    - using VSCode task options input (see Cbn React App)
- Create better tooling for dev workflow. Rough ideas:\
  - Create some kind of testing app which can be used to test the components in isolation.\
    E.g. see this video for an example using `vite`: https://www.youtube.com/watch?v=ChjoKSNWiBo
