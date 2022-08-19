// import memesData from "./memesData";
import { useState, useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const memesArray = allMemes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prevState) => ({ ...prevState, randomImage: url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

// <main>
//   <form action="" className="form">
//     <input type="text" className="form--input" placeholder="Shut up" />
//     <input
//       type="text"
//       className="form--input"
//       placeholder="and take my money"
//     />
//     <button className="form--button" onClick={handleClick()}>
//       Get a new meme image
//     </button>
//   </form>
// </main>

// const [memeImage, setMemeImage] = useState("");
// // returns an array with a function: ["memeImage", f()]
// // function used to change the state

// function getMemeImage() {
//   const memesArray = memesData.data.memes;
//   const randNum = Math.floor(Math.random() * memesArray.length);
//   const randUrl = memesArray[randNum].url;
//   setMemeImage(randUrl);
//   // setUrl((oldValue) => oldValue + 1);
//   //never modify state directly, do not use equal signs; use functions
// }
