import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const noop = () => {};

const Button = ({
  type = "button",
  buttonText,
  onClick = noop,
  loading,
  className = "",
}) => {
  const handleClick = e => {
    if (!loading) return onClick(e);

    return null;
  };

  return (
    <div className="mt-6">
      <button
        disabled={loading}
        type={type}
        className={classnames(
          [className],
          "relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out  border border-transparent rounded-md group hover:bg-opacity-90 focus:outline-none",
          {
            "bg-bb-purple": !loading,
            "bg-bb-gray-700": loading,
            "cursor-wait": loading,
          }
        )}
        onClick={handleClick}
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;
