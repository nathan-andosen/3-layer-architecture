// import * as React from 'react';

declare namespace JSX {
  interface IntrinsicElements {
    // "ui5-button": any;
      "ui5-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
