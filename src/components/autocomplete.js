import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Autocomplete = ({ suggestions, getValue, value }) => {
  const { t } = useTranslation();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    getValue(e.target.value)

    const filtered = suggestions.filter((suggestion) => suggestion?.hasOwnProperty("type")
        ? suggestion?.type?.toLowerCase().includes(value?.toLowerCase())
        : suggestion?.name?.toLowerCase().includes(value?.toLowerCase())
    );

    setFilteredSuggestions(filtered);

    if (e.target.value.length > 0){
      setShowSuggestions(true );
    } else {
      setShowSuggestions(false);
    }

  };

  const handleSelect = (suggestion) => {
    if (suggestion?.hasOwnProperty("type")){
      getValue(suggestion?.type)
    } else {
      getValue(suggestion?.name)
    }

    setShowSuggestions(false);
  };



  return (
    <div className="position-relative z-index-9">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
        placeholder={t('type_or_choose')}
      />
      {showSuggestions && (
        <ul className="list-group position-absolute w-100 z-index-9">
          { filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(suggestion)}
                style={{ cursor: "pointer" }}
              >
                { suggestion?.name }
                { suggestion?.type }
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
