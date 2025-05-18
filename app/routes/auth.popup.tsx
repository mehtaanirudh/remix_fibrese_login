import { useState } from "react";
import { auth } from "~/firebase.client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Popup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential =
        mode === "login"
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);

      const token = await userCredential.user.getIdToken();
      window.opener.postMessage({ token }, "*");
      window.close();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">{mode === "login" ? "Login" : "Create Account"}</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="btn btn-neutral mt-4">{mode === "login" ? "Login" : "Sign Up"}</button>

     
      <p onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ cursor: "pointer" }}>
        {mode === "login" ? "Don't have an account? Sign up here" : "Login instead"}
      </p>
      </fieldset>
    </form>
  );
}