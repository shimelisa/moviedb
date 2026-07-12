import React, { createContext, useContext, useEffect, useState } from "react";

const MyListContext = createContext(null);
const STORAGE_KEY = "netflix-clone:my-list";

function loadInitialList() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not read My List from localStorage:", err);
    return [];
  }
}

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState(loadInitialList);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(myList));
    } catch (err) {
      console.warn("Could not save My List to localStorage:", err);
    }
  }, [myList]);

  const isInList = (movie) =>
    myList.some((m) => m.id === movie.id);

  const addToList = (movie) => {
    setMyList((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromList = (movie) => {
    setMyList((prev) => prev.filter((m) => m.id !== movie.id));
  };

  const toggleInList = (movie) => {
    isInList(movie) ? removeFromList(movie) : addToList(movie);
  };

  return (
    <MyListContext.Provider
      value={{ myList, isInList, addToList, removeFromList, toggleInList }}
    >
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const ctx = useContext(MyListContext);
  if (!ctx) {
    throw new Error("useMyList must be used within a <MyListProvider>");
  }
  return ctx;
}
