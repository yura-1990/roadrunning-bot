import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Autocomplete = ({ suggestions, getValue }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    getValue(value)
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };


  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={handleChange}
        placeholder={t('type_or_choose')}
      />
      {showSuggestions && (
        <ul className="list-group position-absolute w-100 z-index-1">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(suggestion)}
                style={{ cursor: "pointer" }}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No suggestions found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
