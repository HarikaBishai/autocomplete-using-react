import { useEffect, useState } from "react";

export default AutoComplete = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // for caching
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[value]) {
      console.log("Results from cache");
      setResults(cache[value]);
    } else {
      const data = await fetch(
        "https://dummyjson.com/recipes/search?q=" + value
      );
      const json = await data.json();
      setResults(json.recipes || []);
      cache[value] = json.recipes || [];
    }
  };
  useEffect(() => {
    const timeId = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [value]);
  return (
    <div>
      <h1 className="search-header">Autocomplete Search Bar</h1>
      <div>
        <input
          className="search-input"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        ></input>
      </div>

      {showResults && (
        <div className="search-results">
          {results.map((item) => {
            return (
              <span className="result" key={item.id}>
                {item.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
