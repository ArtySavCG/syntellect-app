import React from "react";
import { observer } from "mobx-react-lite";
import ButtonControl from "./components/ButtonControl";
import AutocompleteControl from "./components/AutocompleteControl";
import { ControlStore } from "./stores/ControlStore";
import { AutocompleteStore } from "./stores/AutocompleteStore";
import "./styles/Control.css";

// Создаем экземпляры сторов
const buttonControlStore1 = new ControlStore();
const buttonControlStore2 = new ControlStore();
const autocompleteStore1 = new AutocompleteStore(3);
const autocompleteStore2 = new AutocompleteStore(10);

const App: React.FC = observer(() => {
  return (
    <div className="controls-container">
      <h2>Button Control 1 (2 buttons on the right)</h2>
      <ButtonControl
        store={buttonControlStore1}
        buttonsRight={[
          { text: "Clear", callback: () => buttonControlStore1.clearText() },
          { text: "Set Hello", callback: () => buttonControlStore1.setHelloWorld() },
        ]}
      />

      <h2>Button Control 2 (1 button left, 1 button right)</h2>
      <ButtonControl
        store={buttonControlStore2}
        buttonsLeft={[{ text: "Check Number", callback: () => buttonControlStore2.showNumberAlert() }]}
        buttonsRight={[{ text: "Show Text", callback: () => buttonControlStore2.showTextAlert() }]}
      />

      <h2>Autocomplete Control 1 (max 3 suggestions)</h2>
      <AutocompleteControl store={autocompleteStore1} />

      <h2>Autocomplete Control 2 (max 10 suggestions)</h2>
      <AutocompleteControl store={autocompleteStore2} />
    </div>
  );
});

export default App;