import { makeAutoObservable, action } from "mobx";
import { getCountryByName } from "../api/apiService";
import type { CountryInfo } from "../api/apiService";

export class AutocompleteStore {
  text: string = "";
  suggestions: CountryInfo[] = [];
  maxSuggestions: number;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(maxSuggestions: number) {
    makeAutoObservable(this);
    this.maxSuggestions = maxSuggestions;
  }

  @action
  async setText(value: string) {
    console.log("setText called with value:", value);
    this.text = value;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.fetchSuggestions(value), 300);
  }

  @action
  private async fetchSuggestions(value: string) {
    console.log("fetchSuggestions called with value:", value);
    if (value) {
      try {
        const results = await getCountryByName(value);
        console.log("API results:", results);
        const uniqueSuggestions = Array.from(
          new Map(results.map((item) => [item.name, item])).values()
        );
        console.log("Unique suggestions:", uniqueSuggestions);
        this.suggestions = uniqueSuggestions.slice(0, this.maxSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        this.suggestions = [];
      }
    } else {
      this.suggestions = [];
    }
    console.log("Current suggestions:", this.suggestions);
  }

  @action
  selectSuggestion(suggestion: CountryInfo) {
    console.log("selectSuggestion called with:", suggestion);
    this.text = suggestion.name;
    this.suggestions = [];
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  @action
  clearSuggestions() {
    console.log("clearSuggestions called");
    this.suggestions = [];
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}