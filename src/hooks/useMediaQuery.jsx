import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

useMediaQuery.propTypes = {
  query: PropTypes.string.isRequired
};

export default useMediaQuery;
