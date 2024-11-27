import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Autocomplete = ({ suggestions, getValue, value }) => {
  const { t } = useTranslation();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    getValue(e.target.value)

    if (value.trim() === "") {
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    
  };

  const handleSelect = (suggestion) => {
    getValue(suggestion)
    setShowSuggestions(false);
  };


  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
        placeholder={t('type_or_choose')}
      />
      {showSuggestions && (
        <ul className="list-group position-absolute w-100 z-index-9">
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
            ''
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
