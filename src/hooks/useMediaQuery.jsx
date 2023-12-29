import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

useMediaQuery.propTypes = {
  query: PropTypes.string.isRequired
};

export default useMediaQuery;
