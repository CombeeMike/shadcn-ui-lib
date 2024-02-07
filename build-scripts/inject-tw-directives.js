/**
 * This script injects the tailwind directives and some other "base CSS" at the top of the **built** `styles.css`.
 *
 * This allows the consumer to only import 1 "CSS base file" (`styles.css` from `halumi-ui`) and still be able to use tw
 * classes which are not used in `halumi-ui` and which are therefore not part of the built `styles.css`.
 *
 * Without this, the consumer would have to provide his own `globals.css` file with the tw directives and import it
 * alongside the `halumi-ui` styles file.
 */
import fs from 'fs';

const cssToInject = `/*
Default lucide icon size is 1em to inherit the font size from the surrounding text.
This needs to be defined before all the tailwind stuff so that consumers can override it on every single icon.
*/
.lucide {
  width: 1em;
  height: 1em;
}

@tailwind components;
@tailwind utilities;

`;

const filePath = './dist/styles.css';
const fileContent = fs.readFileSync(filePath);
fs.writeFileSync(filePath, cssToInject + fileContent);
