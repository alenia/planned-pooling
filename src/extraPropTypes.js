import PropTypes from "prop-types";

const ExtraPropTypes = {
  colorConfig: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired
  })),
  //nonNegativeInteger: PropTypes.
}

export default ExtraPropTypes
