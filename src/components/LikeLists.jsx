import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

function LikeLists() {
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState("movie");
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.likeLists);
    });
  }, [user?.email]);

  const movieID = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieID, {
        likeLists: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 my-2">
      <div className="flex text-xl font-bold py-2 my-4">
        <div
          onClick={() => setActive("movie")}
          className={`${
            active === "movie"
              ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
              : "px-2 mx-4 cursor-pointer hover:text-red-700"
          }`}
        >
          Movies
        </div>
        <div
          onClick={() => setActive("tv")}
          className={`${
            active === "tv"
              ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
              : "px-2 mx-4 cursor-pointer hover:text-red-700"
          }`}
        >
          TV Series
        </div>
      </div>
      <div className="relative flex items-center ">
        <div className="grid grid-cols-4 gap-1">
          {movies
            ?.filter((item) => item.type === active)
            ?.map((item) => (
              <div key={item.id} className="relative cursor-pointer group">
                <a href={`/details/${item.type}/${item.id}`}>
                  <div className="w-full h-[200px] p-2 ">
                    <img
                      className="w-full h-full rounded object-cover"
                      src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                      alt={item?.title}
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded bg-black/50 opacity-0 group-hover:opacity-100 text-white">
                      <p className="text-base font-bold flex justify-center items-center h-full text-center">
                        {item?.title}
                      </p>
                    </div>
                  </div>
                </a>
                <p
                  onClick={() => deleteShow(item?.id)}
                  className="absolute text-gray-300 top-4 right-4 cursor-pointer opacity-0 group-hover:opacity-100 "
                >
                  <FontAwesomeIcon
                    className=" hover:bg-slate-800 hover:scale-125 w-4 h-4 p-1 rounded-full"
                    icon={faClose}
                  />
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LikeLists;
