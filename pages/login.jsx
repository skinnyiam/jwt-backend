import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("login succes");
      location.href = "/quote";
    } else {
      alert("check the credientials");
    }
  }

  return (
    <div className=" h-screen flex-col">
      <h1 className=""> Login </h1>{" "}
      <form className="flex" onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input type="submit" value="submit" />
      </form>{" "}
    </div>
  );
}
