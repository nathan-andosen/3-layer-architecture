
// type Ui5Element = React
//   .DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

type Ui5Element = any;

declare namespace JSX {
  interface IntrinsicElements {
    "ui5-button": Ui5Element;
    "ui5-label": Ui5Element;
    "ui5-input": Ui5Element;
    "ui5-message-strip": Ui5Element;
    "ui5-list": Ui5Element;
    "ui5-li": Ui5Element;
  }
}
