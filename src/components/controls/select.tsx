import * as React from 'react';
import classNames from 'classnames/dedupe';
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
}

class SelectControl extends React.Component<Props, {}> {
  public element: React.RefObject<HTMLSelectElement>;

  public static defaultProps = {
    multiple: false,
  };

  public constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  private renderOption = (item, key: string) => {
    const optionProps = Object.assign({}, item);
    delete optionProps.label;
    delete optionProps.group;
    const option = (
      <option key={key} {...optionProps}>
        {item.label}
      </option>
    );
    return option;
  };

  public render() {
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

    const {className, ...selectProps} = this.props;
    delete selectProps.options;

    return (
      <select
        {...selectProps}
        className={classNames(['form-control', className])}
        ref={this.element}>
        {optionNodes}
      </select>
    );
  }
}

export {Props};
export default SelectControl;
