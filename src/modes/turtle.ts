// Copyright (c) 2022 Dane Freeman.
// Distributed under the terms of the Modified BSD License.

import { Mode } from '@jupyterlab/codemirror';

/**
 * Add additional mappings for Turtle with support for %%turtle
 */
export async function installTurtle(_CodeMirror: any) {
  await Mode.ensure('turtle');

  _CodeMirror.defineMode(
    'iturtle',
    (config: CodeMirror.EditorConfiguration, modeOptions?: any) => {
      const turtleMode = _CodeMirror.getMode(config, {
        ...modeOptions,
        name: 'turtle',
      });
      return {
        ...turtleMode,
        token: (stream: any, state: any) => {
          if (stream.sol() && stream.peek() === '%') {
            stream.skipToEnd();
            return 'header';
          }
          return turtleMode.token(stream, state);
        },
      };
    },
    'turtle'
  );

  _CodeMirror.defineMIME('text/x-iturtle', 'iturtle');
  _CodeMirror.modeInfo.push({
    ext: ['ittl'],
    mime: 'text/x-iturtle',
    mode: 'iturtle',
    name: 'iturtle',
  });
}
