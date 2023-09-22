import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  console.log(user);

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      likeLists: [],
    });
  };

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(user, {
      displayName,
      photoURL,
    });
  };

  const updateUserPassword = (password) => {
    return updatePassword(user, password);
  };

  const signInGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        setUser(result.user);
        setDoc(doc(db, "users", result?.user?.email), {
          likeLists: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => console.log(error));
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle firebase auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        console.log("user is not registered");
      }
      setUser(currentUser);
      const token = await currentUser?.getIdToken();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        updateUserProfile,
        logOut,
        signIn,
        signInGoogle,
        updateUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
