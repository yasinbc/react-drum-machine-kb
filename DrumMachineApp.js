import "./App.css";
import React from "react";

// function App() {
//   const bankOne = [
//     {keyCode: 81, keyTrigger: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
//     {keyCode: 87, keyTrigger: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
//     {keyCode: 69, keyTrigger: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
//     {keyCode: 65, keyTrigger: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
//     {keyCode: 83, keyTrigger: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
//     {keyCode: 68, keyTrigger: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
//     {keyCode: 90, keyTrigger: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
//     {keyCode: 88, keyTrigger: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
//     {keyCode: 67, keyTrigger: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
//     },
//   ];

//   return (
//     <div className="App">
//       <div id="drum-machine">
//         <div className="drum-pad">
//           {bankOne.map((item, index) => (
//             <button key={index} id={item.id}>
//               {item.keyTrigger}
//               <audio id={item.url} className="clip">
//                 {item.keyTrigger}
//                 <source src={item.url}></source>
//               </audio>
//             </button>
//           ))}
//         </div>
//         <div id="display">
//           <div id="render-sound-name"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

const bank1 = {
  Q: {
    name: "Heater 1",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  W: {
    name: "Heater 2",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  E: {
    name: "Heater 4",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  A: {
    name: "Heater 3",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  S: {
    name: "Clap",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  D: {
    name: "Open Hi-Hat",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  Z: {
    name: "Kick n Hat",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  X: {
    name: "Kick",
    source: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  C: {
    name: "Closed Hi-Hat",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
};

function ControlScreen({ power, setPower, vol, setVol }) {
  return (
    <div id="control-screen">
      <label id="label-power">
        <input
          type="checkbox"
          id="power"
          checked={power}
          onChange={() => setPower(!power)}
        />
        <span className="checkmark">{power ? "OFF" : "ON"}</span>
      </label>
      <label id="label-volume">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          id="volume"
          defaultValue={vol}
          onChange={(e) => setVol(Number(e.target.value))}
        />
        <span id="volume-display">Volume : {Math.round(vol * 100)}</span>
      </label>
    </div>
  );
}

function Pad({ handleClick, power, backgroundStyle, element }) {
  return (
    <button
      type="button"
      className="drum-pad"
      onClick={handleClick}
      id={bank1[element]}
      disabled={!power}
      style={{ background: `${backgroundStyle}` }}
    >
      {element}
      <audio id={element} src={bank1[element].source} className="clip"></audio>
    </button>
  );
}

// need to refactor the way pads work
function Pads({ power, vol }) {
  const keypadCode = Object.keys(bank1);
  const [display, setDisplay] = React.useState("");
  const buttonBackground = "";
  const backgroundRef = React.useRef();

  const playSound = (e) => {
    const keyboardKey = e.key ? e.key.toUpperCase() : e.target.childNodes[1].id;
    if (e.key && !keypadCode.includes(keyboardKey)) return;
    setDisplay(bank1[keyboardKey].name);
    const audio = document.getElementById(keyboardKey);
    if (e.key) {
      const button = audio.parentElement;
      button.style.background = "coral";
      backgroundRef.current = setTimeout(
        () => (button.style.background = buttonBackground),
        100
      );
    }
    audio.volume = vol;
    audio.play();
  };

  React.useEffect(() => {
    if (!power) {
      return;
    } else {
      window.addEventListener("keydown", playSound);
    }
    return () => window.removeEventListener("keydown", playSound);
  }, [power, vol]);
  React.useEffect(() => {
    return () => clearTimeout(backgroundRef.current);
  }, []);

  return (
    <div id="div-pads">
      {keypadCode.map((pad, idx) => {
        return (
          <Pad
            key={pad + idx}
            handleClick={playSound}
            power={power}
            backgroundStyle={buttonBackground}
            element={pad}
          />
        );
      })}
      <div id="display">{display}</div>
    </div>
  );
}

function App() {
  const [power, setPower] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  return (
    <div id="drum-machine">
      <Pads power={power} vol={volume} />
      <ControlScreen
        power={power}
        vol={volume}
        setPower={setPower}
        setVol={setVolume}
      />
    </div>
  );
}

export default App;
