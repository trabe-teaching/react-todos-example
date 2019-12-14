import React from "react";
import PropTypes from "prop-types";
import { withState } from "./app-state";

const Counters = ({ counters: { pending, done } }) => (
  <div>
    Pending: {pending} Done: {done}
  </div>
);

Counters.propTypes = {
  counters: PropTypes.exact({
    pending: PropTypes.number.isRequired,
    done: PropTypes.number.isRequired,
  }).isRequired,
};

export default withState(Counters);
