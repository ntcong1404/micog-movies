import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Service from "../apiService/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";
import { noImage } from "../assets";
import Pagination from "../components/Pagination";

function PeoplePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleClick = (id) => {
    navigate(`/details/person/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.People({ item: slug, page: page })
      .then((res) => {
        setPerson(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [slug, page]);

  return (
    <div className="mb-8">
      <p className="my-4 py-2 px-6 text-center text-4xl font-bold">
        Popular People
      </p>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full flex-col ">
          <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
          <p className="my-4 py-2 text-base text-slate-400">
            fetching data ...
          </p>
        </div>
      ) : (
        <>
          <div className="px-6 grid grid-cols-4 gap-6">
            {person?.results?.map((item, index) => (
              <div
                key={index}
                className="w-full h-full border border-slate-100 shadow-md shadow-slate-300 rounded-lg cursor-pointer relative mb-10 group overflow-hidden "
                onClick={() => handleClick(item?.id)}
              >
                <img
                  className="w-full h-auto shadow-lg shadow-blue-400/70 block rounded-t-lg object-cover group-hover:scale-[101%]  group-hover:shadow-xl "
                  loading="lazy"
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                      : noImage
                  }
                  alt={item.name}
                />
                <p className=" text-sm font-bold text-center py-4 group-hover:text-sky-500 ">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <Pagination page={page} setPage={setPage} data={person} />
    </div>
  );
}

export default PeoplePage;
