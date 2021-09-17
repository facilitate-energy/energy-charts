import { useState, useEffect } from "react";

function useFetch(path) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(path);
        const data =
          path.split(".").pop() === "md"
            ? await response.text()
            : await response.json();

        setContent(data);
      } catch (error) {
        setContent(null);
        console.error(error);
      }
    };

    fetchData();
  }, [path]);

  return content;
}

export default useFetch;
