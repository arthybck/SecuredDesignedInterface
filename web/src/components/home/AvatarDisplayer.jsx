/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-02-15T13:59:51+01:00
 * @Filename: AvatarDisplayer.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:25:16+01:00
 */

import React from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";

/**
 * This arrow function return avatar properly formatted depending on
 * the profile picture or the userName if missing
 *
 * @param  {Object} user Contain all the information's defined by the fragment
 * @return {element} return a react element
 */
const AvatarDisplayer = ({ user, size }) => {
  return (
    <Avatar style={{ width: size.width, height: size.height }}>
      <AccountCircle />
    </Avatar>
  );
};

AvatarDisplayer.defaultProps = {
  size: { width: 100, height: 100 }
};

AvatarDisplayer.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

export default AvatarDisplayer;
