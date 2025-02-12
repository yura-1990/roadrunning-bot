import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";

const Autocomplete = ({ suggestions, getValue, value }) => {
  const [selected, setSelected] = useState('');
  const { t } = useTranslation();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setSelected('')
  }, [value])

  const handleChange = (e) => {
    setSelected(e.target.value)

    const filtered = suggestions.filter((suggestion) => suggestion?.hasOwnProperty("type")
        ? suggestion?.type?.toLowerCase().includes(selected?.toLowerCase())
        : suggestion?.name?.toLowerCase().includes(selected?.toLowerCase())
    );

    if (filtered.length === 0) {
      getValue(e.target.value)
    }

    setFilteredSuggestions(filtered);

    if (e.target.value.length > 0){
      setShowSuggestions(true );
    } else {
      setShowSuggestions(false);
    }

  };

  const handleSelect = (suggestion) => {
    if (suggestion?.hasOwnProperty("type")){
      setSelected(suggestion?.type)
      getValue(suggestion?.type)
    } else {
      setSelected(suggestion?.name)
      getValue(suggestion?.name)
    }

    setShowSuggestions(false);
  };

  return (
    <div className="position-relative z-index-9">
      <input
        type="text"
        className="form-control"
        value={selected}
        onChange={handleChange}
        placeholder={t('type_or_choose')}
      />
      {showSuggestions && (
        <ul className="list-group position-absolute w-100 z-index-9">
          { filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
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
