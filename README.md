# Blockly, es6, browserify, three.js etc

## Installation
Clone the repository and run `npm install`.

## How to update blocky
Clone the Blockly repository https://github.com/google/blockly inside the build folder. The blockly npm package is not included in the package.json file because I did not find a way to get it working with `require` or `import`.
From the blockly folder, copy `msg`, `media`, `blocks_compressed.js`,`blockly_compressed.js` and `javascript_compressed.js` in the "build folder".

Once the installation is done, run `gulp`. You should see a page with some blocks to drag and drop
