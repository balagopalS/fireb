import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/createPost">Create Post</Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <p className="userName">{auth.currentUser?.displayName}</p>
            <img
              src={auth.currentUser?.photoURL || ""}
              width="50"
              height="50"
            />
            <button className="logout" onClick={signUserOut}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
