import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import copy from "../src/image/copy.png";

function App() {
  const [travel, setTravel] = useState([]);
  const [inputText, setInputText] = useState("");

  const handlerInputText = (e) => {
    setInputText(e.target.value);
  };

  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    navigator.clipboard.writeText(text);
    alert(text);
    document.body.removeChild(tempInput);
  };

  const getTravel = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4001/trips?keywords=${inputText}`
      );
      setTravel(results.data.data);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getTravel();
  }, [inputText]);

  return (
    <div className="App">
      <h1 id="header" className="text-5xl text-blue-600 p-10 text-center">
        🌍 เที่ยวไหนดี 🌍
      </h1>
      <div
        id="app-wrapper"
        className="flex flex-col justify-center items-center"
      >
        <label className="w-3/5">
          ค้นหาที่เที่ยว
          <input
            id="travel-text"
            name="travel-text"
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            value={inputText}
            onChange={handlerInputText}
            className="w-full h-8 border-b-2 border-solid border-blue-200 text-center"
          />
        </label>
        <div
          id="result-travel-container"
          className="w-3/5 flex flex-col justify-evenly items-center"
        >
          {travel.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-row justify-between items-start mt-10 mb-10"
              >
                <div id="picture-title" className="w-2/5 p-4">
                  <img src={item.photos[0]} className="rounded-3xl h1/4" />
                </div>
                <div
                  id="detail"
                  className="flex flex-col justify-between items-start w-3/5 p-4"
                >
                  {/* <h2 className="text-xl font-bold pb-1">{item.title}</h2> */}
                  <a
                    href={item.url}
                    className="text-xl font-bold pb-1 hover:underline"
                  >
                    {item.title}
                  </a>
                  <p className="text-gray-500 font-bold pb-1">
                    {item.description.length > 100
                      ? item.description.substring(0, 100) + "..."
                      : item.description}
                  </p>
                  <a
                    href={item.url}
                    className="text-md text-blue-400 underline pb-1"
                  >
                    อ่านต่อ
                  </a>
                  <div
                    id="categories"
                    className="flex flex-row justify-between items-start pb-4 text-gray-500"
                  >
                    <p>หมวด</p>
                    {item.tags.slice(0, 3).map((tag) => {
                      return (
                        <button
                          className="ml-2 mr-2 underline"
                          onClick={() => setInputText(tag)}
                        >
                          {tag}
                        </button>
                      );
                    })}
                    <p>และ</p>
                    <button
                      className="ml-2 mr-2 underline"
                      onClick={() => setInputText(item.tags.slice(4))}
                    >
                      {item.tags.slice(4)}
                    </button>
                  </div>
                  <div
                    id="picture"
                    className="flex flex-row justify-start items-center"
                  >
                    {item.photos.slice(1).map((item) => {
                      return (
                        <img
                          src={item}
                          key={item.id}
                          className="w-24 h-24 rounded-md mr-5"
                        />
                      );
                    })}
                  </div>
                </div>
                <div id="copy">
                  <button onClick={() => copyToClipboard(item.url)}>
                    <img src={copy} alt="copy to clipboard" className="mt-60" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
