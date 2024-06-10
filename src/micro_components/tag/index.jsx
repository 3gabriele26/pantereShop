import "./tag.css";
import PropTypes from 'prop-types';

function Tag({tag}) {

  return (
    <p className="tag">{tag}</p>
  )
}

export default Tag

Tag.propTypes = {
    tag: PropTypes.string.isRequired
}