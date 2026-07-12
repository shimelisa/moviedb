import React from "react";

import { useMyList } from "../../Context/MyListContext";
import MovieCard from "../MovieCard/MovieCard";
import styles from "../DisplayRow/DisplayRow.module.css";

export default function MyListPage() {
  const { myList } = useMyList();

  return (
    <div className={styles.mainWrapper} style={{ paddingTop: "120px" }}>
      <h2 className={styles.title}>My List</h2>

      {myList.length === 0 ? (
        <p style={{ color: "#bbb", padding: "0 24px" }}>
          You haven't added anything yet. Click the + icon on a movie card to
          add it here.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            padding: "0 24px 40px",
          }}
        >
          {myList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
