// const bank1 = {
//   Q: {
//     name: "Heater 1",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
//   },
//   W: {
//     name: "Heater 2",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
//   },
//   E: {
//     name: "Heater 4",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
//   },
//   A: {
//     name: "Heater 3",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
//   },
//   S: {
//     name: "Clap",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
//   },
//   D: {
//     name: "Open Hi-Hat",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
//   },
//   Z: {
//     name: "Kick n Hat",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
//   },
//   X: {
//     name: "Kick",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
//   },
//   C: {
//     name: "Closed Hi-Hat",
//     source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
//   },
// };
import "./App.css";
import React from "react";

function App() {
  const bankOne = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const [state, setState] = React.useState(() => "");

  const handleKeyPress = (event) => {
    event.preventDefault();
    setState(
      bankOne.map((item) => (event.keyCode === item.keyCode ? item.id : null))
    );

    if (event.key === "q" || event.key === "Q") {
      let audio = new Audio(bankOne[0].url);
      audio.play();
    } else if (event.key === "w" || event.key === "W") {
      let audio = new Audio(bankOne[1].url);
      audio.play();
    } else if (event.key === "e" || event.key === "E") {
      let audio = new Audio(bankOne[2].url);
      audio.play();
    } else if (event.key === "a" || event.key === "A") {
      let audio = new Audio(bankOne[3].url);
      audio.play();
    } else if (event.key === "s" || event.key === "S") {
      let audio = new Audio(bankOne[4].url);
      audio.play();
    } else if (event.key === "d" || event.key === "D") {
      let audio = new Audio(bankOne[5].url);
      audio.play();
    } else if (event.key === "z" || event.key === "Z") {
      let audio = new Audio(bankOne[6].url);
      audio.play();
    } else if (event.key === "x" || event.key === "X") {
      let audio = new Audio(bankOne[7].url);
      audio.play();
    } else if (event.key === "c" || event.key === "C") {
      let audio = new Audio(bankOne[8].url);
      audio.play();
    }
  };

  const handleClick = (event) => {};

  return (
    <div className="App">
      <div id="drum-machine">
        <div className="drum-pad">
          {bankOne.map((item, index) => (
            <button
              onClick={(event) => handleClick(event)}
              onKeyDown={(event) => handleKeyPress(event)}
              key={index}
              id={item.id}
            >
              {item.keyTrigger}
              <audio id={item.url} className="clip">
                {item.keyTrigger}
                <source
                  src={item.url}
                  type="audio/ogg"
                  id={item.keyTrigger}
                ></source>
                <source src={item.url} type="audio/mpeg"></source>
              </audio>
            </button>
          ))}
        </div>
        <div id="display">
          <div id="render-sound-name">{state}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
