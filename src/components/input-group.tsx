import * as React from 'react';

interface InputGroupProps {
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  buttonAfter?: React.ReactNode;
  buttonBefore?: React.ReactNode;
}

type InputGroupPosition = 'prepend' | 'append';

type InputGroupPropsWithChildren = InputGroupProps & {
  children: JSX.Element;
};

/**
 * Wraps an input to implement a Bootstrap [Input Group](http://getbootstrap.com/components/#input-groups)
 */
const InputGroup = ({
  children,
  addonBefore = null,
  addonAfter = null,
  buttonBefore = null,
  buttonAfter = null,
}: InputGroupPropsWithChildren): JSX.Element => {
  const renderAddon = (
    addon: React.ReactNode,
    position: InputGroupPosition,
  ): React.ReactNode => {
    if (addon === null) {
      return null;
    }
    return <span className={`input-group-${position}`}>{addon}</span>;
  };

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

export {InputGroupProps};
export default InputGroup;
