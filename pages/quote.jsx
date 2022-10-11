import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [temp, setTemp] = useState("");
  async function populateQuote() {
    const req = await fetch("http://localhost:1337/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        populateQuote();
      }
    }
  }, []);
  async function updateQuote(e) {
    e.preventDefault();
    const req = await fetch("http://localhost:1337/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: temp,
      }),
    });
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
        setQuote(temp);
      setTemp("");
      
    } else {
      alert(data.error);
    }
  }
  return (
    <div>
      {" "}
      <h1>{quote || "no quote"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="quote"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
        <input type="submit" value="update quote" />
      </form>
    </div>
  );
};
export default Quote;
