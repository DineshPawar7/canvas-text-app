import React, { useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import { GrRedo, GrUndo } from "react-icons/gr";
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiAlignCenter } from "react-icons/fi";




import "./App.css";

const App = () => {
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontMenuVisible, setFontMenuVisible] = useState(false);

  const addText = () => {
    const newText = {
      id: `text-${texts.length + 1}`,
      x: 50,
      y: 50,
      text: "New Text",
      fontSize: 20,
      fontStyle: "normal",
      fontFamily: fontFamily,
      isDragging: false,
    };
    setTexts([...texts, newText]);
  };

  const handleDragStart = (id) => {
    setSelectedId(id);
    setTexts(
      texts.map((text) =>
        text.id === id ? { ...text, isDragging: true } : text
      )
    );
  };

  const handleDragEnd = (id, e) => {
    setTexts(
      texts.map((text) =>
        text.id === id
          ? { ...text, isDragging: false, x: e.target.x(), y: e.target.y() }
          : text
      )
    );
  };

  const updateTextStyle = (property, value) => {
    if (selectedId) {
      setTexts(
        texts.map((text) =>
          text.id === selectedId ? { ...text, [property]: value } : text
        )
      );
    }
  };

  const toggleFontMenu = () => {
    setFontMenuVisible(!fontMenuVisible);
  };

  const selectFontFamily = (family) => {
    setFontFamily(family);
    setFontMenuVisible(false);
  };

  const undo = () => {
    if (texts.length > 0) {
      setTexts(texts.slice(0, -1));
    }
  };

  return (
    <div className="App">
      <div className="top-toolbar-wrapper">
        <div className="top-toolbar">
          <button onClick={undo} className="toolbar-button">
            <GrUndo />
            <span>Undo</span>
          </button>
          <button className="toolbar-button">
            <GrRedo />
            <span>Redo</span>
          </button>
        </div>
      </div>

      <div className="canvas-wrapper">
        <Stage
          className="canvas"
          width={window.innerWidth - 100}
          height={400}
          style={{ border: "1px solid black" }}
        >
          <Layer>
            {texts.map((text) => (
              <Text
                key={text.id}
                x={text.x}
                y={text.y}
                text={text.text}
                fontSize={text.fontSize}
                fontStyle={text.fontStyle}
                fontFamily={text.fontFamily}
                draggable
                onDragStart={() => handleDragStart(text.id)}
                onDragEnd={(e) => handleDragEnd(text.id, e)}
              />
            ))}
          </Layer>
        </Stage>

        <div id="more-features">
          
          <div className="bottom-toolbar">
            <div className="font-family-dropdown">
              <div className="font-family-button" onClick={toggleFontMenu}>
                <span></span>Font <span><RiArrowDropDownLine /></span>
              </div>
              <ul className={`font-family-list ${fontMenuVisible ? "visible" : ""}`}>
                {["Arial", "Verdana", "Times New Roman", "Georgia"].map((font) => (
                  <li key={font} onClick={() => selectFontFamily(font)}>
                    {font}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => updateTextStyle("fontSize", 24)}><FaPlus/></button>
            <button onClick={() => updateTextStyle("fontSize", 16)}><FaMinus/></button>
            <button onClick={() => updateTextStyle("fontStyle", "bold")}>
              <AiOutlineBold />
            </button>
            <button onClick={() => updateTextStyle("fontStyle", "italic")}>
              <AiOutlineItalic />
            </button>
            <button onClick={() => updateTextStyle("textDecoration", "underline")}>
              <AiOutlineUnderline />
            </button>
            <button onClick={() => updateTextStyle("textDecoration", "lineSpacing")}>
              <FiAlignCenter />
            </button>
          </div>
          <div className="add-text-button">
            <button onClick={addText}><FaPlus/> Add Text</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
