import { useState } from "react";

export default function Home() {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")

  const [email,setEmail]=useState("")
  async function handleResgister(e){
    e.preventDefault()
  const response= await fetch("http://localhost:1337/api/register",{
    method:"POST",
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({
        name,email,password,
      }),
    })

    const data = await response.json();
    console.log(data)
    if(data.status==='ok'){
      location.href='/login'
    }
  }

  return (
    <div className=" h-screen flex-col">
      <h1 className=""> register </h1>{" "}
      <form className="flex" onSubmit={handleResgister}>
        <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input type="submit" value="submit" />
      </form>{" "}
    </div>
  );
}
