import * as PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

interface CommonProps {
  id: string;
  name: string;
  disabled?: boolean;
}

export {CommonProps};
export default propTypes;
