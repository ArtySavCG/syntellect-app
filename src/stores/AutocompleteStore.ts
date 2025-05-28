import { makeAutoObservable } from "mobx";
import { getCountryByName, CountryInfo } from "../api/apiService";

export class AutocompleteStore {
  text: string = "";
  suggestions: CountryInfo[] = [];
  maxSuggestions: number;

  constructor(maxSuggestions: number) {
    makeAutoObservable(this);
    this.maxSuggestions = maxSuggestions;
  }

  async setText(value: string) {
    this.text = value;
    if (value) {
      const results = await getCountryByName(value);
      // Удаляем дубликаты по name
      const uniqueSuggestions = Array.from(
        new Map(results.map((item) => [item.name, item])).values()
      );
      this.suggestions = uniqueSuggestions.slice(0, this.maxSuggestions);
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: CountryInfo) {
    this.text = suggestion.name;
    this.suggestions = [];
  }
}