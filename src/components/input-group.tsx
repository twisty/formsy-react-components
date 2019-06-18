import * as React from 'react';

interface Props {
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  buttonAfter?: React.ReactNode;
  buttonBefore?: React.ReactNode;
}

type ReactElementOrNull = React.ReactElement | null;

/**
 * Wraps an input to implement a Bootstrap [Input Group](http://getbootstrap.com/components/#input-groups)
 */
const InputGroup: React.FunctionComponent<Props> = props => {
  const renderAddon = (addon, position): ReactElementOrNull => {
    if (!addon) {
      return null;
    }
    return <span className={`input-group-${position}`}>{addon}</span>;
  };

  const {addonBefore, addonAfter, buttonBefore, buttonAfter, children} = props;

  return (
    <div className="input-group">
      {renderAddon(addonBefore, 'prepend')}
      {renderAddon(buttonBefore, 'prepend')}
      {children}
      {renderAddon(addonAfter, 'append')}
      {renderAddon(buttonAfter, 'append')}
    </div>
  );
};

InputGroup.defaultProps = {
  addonAfter: null,
  addonBefore: null,
  buttonAfter: null,
  buttonBefore: null,
};

export {Props};
export default InputGroup;
