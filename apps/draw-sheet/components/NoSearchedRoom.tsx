import { FiSearch, FiStar, FiClock, FiUsers } from "react-icons/fi";

type NoSearchedRoomProps = {
  type: "search" | "favorites" | "recent" | "all";
};

const NoSearchedRoom = ({ type }: NoSearchedRoomProps) => {
  const contentMap = {
    search: {
      icon: <FiSearch />,
      title: "No Rooms Found",
      description:
        "We couldn’t find any rooms matching your search. Try different keywords or filters.",
    },
    favorites: {
      icon: <FiStar />,
      title: "No Favorite Rooms",
      description:
        "You haven’t added any rooms to your favorites yet. Mark rooms you like for quick access here.",
    },
    recent: {
      icon: <FiClock />,
      title: "No Recent Rooms",
      description:
        "You haven’t joined or created any rooms recently. Start collaborating and your recent rooms will show up here.",
    },
    all: {
      icon: <FiUsers />,
      title: "No Collaboration Rooms",
      description:
        "There are no rooms available right now. Create a new one or join an existing collaboration.",
    },
  } as const;

  const { icon, title, description } = contentMap[type];

  return (
    <div
      className="w-full border border-zinc-800 gap-3 rounded-xl flex-col flex items-center justify-center"
      style={{ paddingInline: "1.7rem", paddingBlock: "2.5rem" }}
    >
      <div
        className="bg-zinc-800 text-2xl rounded-full text-zinc-400"
        style={{ padding: "0.6rem" }}
      >
        {icon}
      </div>
      <div className="flex flex-col sm:w-[25%] gap-1 text-center items-center justify-center">
        <div className="flex justify-center font-semibold items-center gap-2 text-xl">
          {title}
        </div>
        <div className="text-zinc-400 text-sm">{description}</div>
      </div>
    </div>
  );
};

export default NoSearchedRoom;
