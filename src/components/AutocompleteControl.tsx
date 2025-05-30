import React from "react";
import { observer } from "mobx-react-lite";
import TextInput from "./TextInput";
import { AutocompleteStore } from "../stores/AutocompleteStore";

interface AutocompleteControlProps {
  store: AutocompleteStore;
}

const AutocompleteControl: React.FC<AutocompleteControlProps> = observer(({ store }) => {
  console.log("Автокомплит отрендерен, вот возможные предложения:", store.suggestions);
  return (
    <div className="autocomplete-container">
      <TextInput
        value={store.text}
        onChange={(value) => store.setText(value)}
        placeholder="Введите название страны"
        onBlur={() => store.clearSuggestions()}
      />
      {store.suggestions.length > 0 && (
        <ul className="suggestions-list visible">
          {store.suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => store.selectSuggestion(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default AutocompleteControl;