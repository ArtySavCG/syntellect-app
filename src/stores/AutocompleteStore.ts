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
    console.log("setText вызван со значением:", value);
    this.text = value;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.fetchSuggestions(value), 300);
  }

  @action
  private async fetchSuggestions(value: string) {
    console.log("Запрос предложений вызван со значением:", value);
    if (value) {
      try {
        const results = await getCountryByName(value);
        console.log("API результаты:", results);
        const uniqueSuggestions = Array.from(
          new Map(results.map((item) => [item.name, item])).values()
        );
        console.log("Уникальные предложения:", uniqueSuggestions);
        this.suggestions = uniqueSuggestions.slice(0, this.maxSuggestions);
      } catch (error) {
        console.error("Ошибка в получении запроса:", error);
        this.suggestions = [];
      }
    } else {
      this.suggestions = [];
    }
    console.log("Текущие предложения:", this.suggestions);
  }

  @action
  selectSuggestion(suggestion: CountryInfo) {
    console.log("выбранные предложения вызваны с:", suggestion);
    this.text = suggestion.name;
    this.suggestions = [];
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}