import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useFetch(path) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(path);
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [path]);

  return content;
}

useFetch.propTypes = {
  path: PropTypes.string.isRequired
};

export default useFetch;
