import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";

import PlayerMovie from "../components/PlayerMovie";
import PlayerTv from "../components/PlayerTv";

function PlayerPage() {
  const { slug, id } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    Service.Details({ type: slug, id: id })
      .then((res) => {
        setDetail(res);
      })
      .catch((err) => console.log(err));
  }, [slug, id]);

  return (
    <div className="px-6 py-4 grid grid-cols-12 gap-6">
      {slug === "movie" ? (
        <PlayerMovie detail={detail} id={id} />
      ) : slug === "tv" ? (
        <PlayerTv detail={detail} id={id} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default PlayerPage;
