import * as React from 'react';
import classNames from 'classnames/dedupe'; // eslint-disable-line import/default
import {CommonProps} from './common-prop-types';

type ControlProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type ControlPropsCleaned = Omit<ControlProps, 'id' | 'name'>;

interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

interface Props extends CommonProps, ControlPropsCleaned {
  options: SelectOption[];
  multiple: boolean;
  elementRef: React.RefObject<HTMLSelectElement>;
}

class SelectControl extends React.Component<Props, {}> {
  public static defaultProps = {
    multiple: false,
    elementRef: React.createRef<HTMLSelectElement>(),
  };

  public constructor(props) {
    super(props);
  }

  private renderOption = (item: SelectOption, key: string): JSX.Element => {
    const {label, value, ...rest} = item;
    const option = (
      <option key={key} value={value} {...rest}>
        {label}
      </option>
    );
    return option;
  };

  public render(): JSX.Element {
    const {options} = this.props;

    let groups = options
      .filter((item): string => (item.group ? item.group : ''))
      .map((item): string => (item.group ? item.group : ''));

    // Get the unique items in group.
    const onlyUnique = (value, index, self): boolean => {
      return self.indexOf(value) === index;
    };

    groups = groups.filter(onlyUnique);

    let optionNodes: React.ReactNode[];

    if (groups.length === 0) {
      optionNodes = options.map((item, index) => {
        return this.renderOption(item, `${index}`);
      });
    } else {
      // For items without groups.
      const itemsWithoutGroup = options.filter((item): boolean => !item.group);

      optionNodes = itemsWithoutGroup.map((item, index) => {
        return this.renderOption(item, `no-group-${index}`);
      });

      groups.forEach((group, groupIndex): void => {
        const groupItems = options.filter(
          (item): boolean => item.group === group,
        );

        const groupOptionNodes = groupItems.map((item, index) =>
          this.renderOption(item, `${groupIndex}-${index}`),
        );

        optionNodes.push(
          <optgroup label={group} key={groupIndex}>
            {groupOptionNodes}
          </optgroup>,
        );
      });
    }

    const {className, elementRef, ...selectProps} = this.props;
    delete selectProps.options;

    return (
      <select
        {...selectProps}
        className={classNames(['custom-select', className])}
        ref={elementRef}>
        {optionNodes}
      </select>
    );
  }
}

export {Props};
export default SelectControl;
