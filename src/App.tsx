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
      <h2>Контроллер кнопок (2 кнопки справа)</h2>
      <ButtonControl
        store={buttonControlStore1}
        buttonsRight={[
          { text: "Очистить", callback: () => buttonControlStore1.clearText() },
          { text: "Hello world!", callback: () => buttonControlStore1.setHelloWorld() },
        ]}
      />

      <h2>Контроллер кнопок (1 кнопка слева, 1 кнопка справа)</h2>
      <ButtonControl
        store={buttonControlStore2}
        buttonsLeft={[{ text: "Проверить число", callback: () => buttonControlStore2.showNumberAlert() }]}
        buttonsRight={[{ text: "Показать текст", callback: () => buttonControlStore2.showTextAlert() }]}
      />

      <h2>Автокомплит максимум - 3 отображения</h2>
      <AutocompleteControl store={autocompleteStore1} />

      <h2>Автокомплит максимум - 10 отображений</h2>
      <AutocompleteControl store={autocompleteStore2} />
    </div>
  );
});

export default App;