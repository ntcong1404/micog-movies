import * as Service from "../apiService/Service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Like from "./Like";
import AddList from "./AddList";
import PuffLoader from "react-spinners/PuffLoader";
import dayjs from "dayjs";
import { noImage } from "../assets";

function TvDetail({ id }) {
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePlayer = (id) => {
    navigate(`/player/tv/${id}`);
  };
  const handleClickCast = (id) => {
    navigate(`/details/person/${id}`);
  };
  const handleClickEpisodes = (id, number) => {
    navigate(`/tv/${id}/season/${number}`);
  };

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Details({ type: "tv", id: id })
      .then((res) => {
        setDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({ type: "tv", id: id, option: "credits" })
      .then((res) => {
        setCast(res?.cast);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({
      type: "tv",
      id: id,
      option: "similar",
      page: 1,
    })
      .then((res) => {
        setSimilar(res?.results);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({
      type: "tv",
      id: id,
      option: "videos",
      page: 1,
    })
      .then((res) => {
        setVideos(res?.results);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12 relative">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full flex-col ">
            <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
            <p className="my-4 py-2 text-base text-slate-400">
              fetching data ...
            </p>
          </div>
        ) : (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full "
            />
            <div className="flex max-w-md w-full overflow-hidden ">
              <div className="overflow-hidden relative duration-500 shadow-lg movie-item text-white movie-card">
                <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-r from-neutral-900 to-transparent "></div>
                <div className="relative z-10 px-10 pt-10 space-y-6 movie_info">
                  <div className=" align-self-end w-full">
                    <div className="h-20"></div>
                    <div className="space-y-6 ">
                      <div className="flex flex-col py-2 space-y-2">
                        {/* button play movie */}
                        <div
                          onClick={() => handlePlayer(detail?.id)}
                          className="relative mb-10 flex items-center cursor-pointer w-min p-1 text-center text-white bg-red-500 rounded-full hover:bg-red-700 group "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-16 h-16"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <div className="absolute w-[150px] transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-2xl font-bold text-white ">
                            Play show
                          </div>
                        </div>

                        <div className="flex items-center">
                          {/* name movie */}
                          <h3 className="text-3xl font-bold text-white mr-10">
                            {detail?.name}
                          </h3>
                          {/* like */}
                          <Like slug="tv" detail={detail} />
                          {/* list */}
                          <AddList slug="tv" detail={detail} />
                        </div>

                        {/* genres */}
                        <div className="flex text-sm text-gray-400 ">
                          {detail?.genres?.map((genre, index) => (
                            <a
                              href={`/genre/${genre.id}/${genre.name}/tv`}
                              key={index}
                              className="mr-3 py-1 cursor-pointer hover:text-slate-200"
                            >
                              {genre.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row py-2 justify-between items-center">
                        <>
                          <div className="flex items-center">
                            <div className="flex items-center justify-center overflow-hidden bg-slate-900 rounded-full">
                              <svg
                                className="w-14 h-14 transform translate-x-1 translate-y-1"
                                aria-hidden="true"
                              >
                                <circle
                                  className="text-gray-300"
                                  strokeWidth="5"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="20"
                                  cx="24"
                                  cy="24"
                                />
                                <circle
                                  className={
                                    `font-semibold text-sm ` +
                                    `${
                                      Math.round(
                                        (detail?.vote_average +
                                          Number.EPSILON) *
                                          10
                                      ) /
                                        10 <=
                                      5
                                        ? `text-red-400`
                                        : 7 >=
                                          Math.round(
                                            (detail?.vote_average +
                                              Number.EPSILON) *
                                              10
                                          ) /
                                            10
                                        ? `text-orange-600`
                                        : 10 >=
                                          Math.round(
                                            (detail?.vote_average +
                                              Number.EPSILON) *
                                              10
                                          ) /
                                            10
                                        ? `text-green-500`
                                        : ""
                                    }`
                                  }
                                  strokeWidth="5"
                                  strokeDasharray={20 * 2 * Math.PI}
                                  strokeDashoffset={
                                    20 * 2 * Math.PI -
                                    (Math.round(
                                      (detail?.vote_average + Number.EPSILON) *
                                        10
                                    ) /
                                      10 /
                                      10) *
                                      (20 * 2 * Math.PI)
                                  }
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="20"
                                  cx="24"
                                  cy="24"
                                />
                              </svg>
                              <span className="absolute text-xs font-semibold text-white">{`${Math.round(
                                (detail?.vote_average + Number.EPSILON) * 10
                              )}%`}</span>
                            </div>
                            <div className="text-sm ml-2">
                              <p>User</p> <p>Score</p>
                            </div>
                          </div>
                          <div className="flex flex-col ">
                            <div className="">{detail?.popularity}</div>
                            <div className="text-sm text-gray-400">
                              Popularity:
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="">
                              {dayjs(detail?.first_air_date).year()}
                            </div>
                            <div className="text-sm text-gray-400">
                              First air date:
                            </div>
                          </div>
                        </>
                      </div>
                      <div className="flex flex-col py-2 ">
                        <div className="text-sm text-gray-400 mb-2">
                          Overview:
                        </div>
                        <p className="text-xs text-gray-100 mb-6 h-[150px] overflow-y-auto">
                          {detail?.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="col-span-8 px-6">
        {videos?.length !== 0 ? (
          <div className=" border-b-2 border-slate-200 ">
            <div className="text-3xl font-bold ">Trailer</div>
            {videos?.map(
              (video, index) =>
                video.type === "Trailer" && (
                  <iframe
                    className="my-6"
                    key={index}
                    width="820"
                    height="515"
                    src={`https://www.youtube.com/embed/${video.key}?controls=1`}
                  ></iframe>
                )
            )}
          </div>
        ) : (
          <></>
        )}

        {/* Series Cast */}
        <div>
          <div className=" my-6 text-3xl font-bold ">Cast</div>
          <div className=" flex items-center overflow-x-auto border-b-2 border-slate-200 ">
            {cast?.map((cast, index) => (
              <div
                onClick={() => handleClickCast(cast.id)}
                key={index}
                className="relative flex flex-col text-center mr-2 mb-6 cursor-pointer group "
              >
                <div className="w-[140px] h-auto ">
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                        : noImage
                    }
                    className="w-full h-full rounded-md group-hover:blur-[2px]"
                  />
                </div>
                <div className="absolute hidden bottom-0 right-0 left-0 group-hover:block ">
                  <p className="text-sky-900 font-semibold ">{cast.name}</p>
                  <p className="text-sky-100">{cast.known_for_department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* seasons */}
        {detail?.last_episode_to_air ? (
          <div>
            <div className=" my-6 text-3xl font-bold ">Season</div>
            <div className=" border-b-2 border-slate-200 ">
              <div className="relative mr-2 mb-6 py-20 shadow-lg shadow-slate-300">
                <img
                  src={`https://image.tmdb.org/t/p/original/${detail?.last_episode_to_air?.still_path}`}
                  className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-md object-cover object-top"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 rounded-md  bg-gradient-to-b from-slate-950 to-transparent"></div>
                <div className="relative text-center">
                  <p className="text-slate-50 py-2 my-1 text-3xl font-bold ">
                    {`Season ${detail?.last_episode_to_air?.season_number} : ${detail?.last_episode_to_air?.name}`}
                  </p>
                  <p className="text-slate-200 py-2 mb-2 text-base  ">
                    {`${detail?.last_episode_to_air?.episode_number} Episodes`}
                  </p>
                  <a
                    onClick={() =>
                      handleClickEpisodes(
                        detail?.id,
                        detail?.last_episode_to_air?.season_number
                      )
                    }
                    className="text-slate-100 text-lg px-4 py-3 mx-2 rounded-2xl bg-black cursor-pointer hover:bg-slate-900"
                  >
                    {`View all episodes in season ${detail?.last_episode_to_air?.season_number}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="col-span-4 px-6">
        <p className="text-center text-2xl font-semibold py-2 ">
          You May Also Like
        </p>
        <div className="my-2 grid grid-cols-2 gap-2 ">
          {similar?.map((movie, index) => (
            <a
              key={index}
              className="flex flex-col items-center p-1 mb-2 cursor-pointer rounded-md group shadow-md shadow-slate-200"
              href={`/details/tv/${movie?.id}`}
            >
              <div className="w-full h-[260px]">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : noImage
                  }
                  className="w-full h-full object-cover rounded-md mr-4 group-hover:scale-[102%]"
                />
              </div>
              <p className="group-hover:translate-y-1 p-2 text-center font-semibold">
                {movie.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TvDetail;
