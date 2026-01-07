import './App.css'
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function Message(props)
{
  let censoredString = props.message.replaceAll(/fuck|asshole|bastard/gi, (x) => {
  return x.replaceAll(/[^ \n]/g,"*")});
 
  return(
    <div className="message">
      <span className="the-text">{censoredString}</span>
      <span className="timestamp">{props.timestamp}</span>
    </div>
  );
}

function App() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const thatTime = `${ hours% 12 || 12}:${ minutes.toString().padStart(2, "0")} ${hours>11?"pm":"am"}`;
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([{msg:"Hi this is bigfoot", timestamp: thatTime }]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [addtext, setAddtext] = useState("Add new message");
  const [adding, setAdding] = useState(false);

  function handleChange(e) {
    setMsg(e.target.value);
  }

  function showAddBox(){
    if(addtext=="Add new message")
    {
    setAdding(true);
    setAddtext("Hide message box");
    }
    else 
    {
      setAdding(false);
      setAddtext("Add new message");
    }
  }

  function addNewMessage(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const theTime = `${ hours% 12 || 12}:${ minutes.toString().padStart(2, "0")} ${hours>11?"pm":"am"}`;
    setItems(prevItems => [
        ...prevItems,
        ...Array.from([{msg: msg, timestamp: theTime}])]);
  }

  // Load initial data once when component mounts
  useEffect(() => {
    /*setLoading(true);
    // simulate initial fetch
    setTimeout(() => {
      setItems(Array.from({ length: 20 }));
      setLoading(false);
    }, 1000);*/
  }, []);

  const fetchMoreData = () => {
    setLoading(true);
    /*// simulate network call
    setTimeout(() => {
      setItems(prevItems => [
        ...prevItems,
        ...Array.from({ length: 20 })
      ]);
      setLoading(false);
    }, 1500);*/
  };
     
  return (
    <>
      <div className="everything">
        <div className="header">
          <span>Welcome to the anonymous bulletin</span>
          <button onClick={showAddBox}>
          {addtext}
          </button>
        </div>

    <div className="scroll-container">
      {adding? 
      <div className="input-box">
      <input type="text" value={msg} onChange={handleChange}/>
      <button type="button" onClick={addNewMessage}>Add message</button>
        </div>: <div></div>
      }

      {loading && items.length === 0 ? (
        <h4>Loading initial data...</h4>
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>You've reached the end</h4>}
        >
          {items.map((i, index) => (
            <Message message={i.msg} timestamp={i.timestamp}/>
          ))}
        </InfiniteScroll>)}
      </div>
      </div>
    </>
  )
}

export default App
