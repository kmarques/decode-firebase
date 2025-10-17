import { useCallback } from "react";
import { auth } from "./config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import Input from "./Input";

export default function Login() {
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      );
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="Email" />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        variant="filled"
      />
      <button type="submit">Login</button>
    </form>
  );
}
