
const Chat = ({ left, message, sender }: { left: boolean, message: string, sender: string }) => {
    return (
        <div className={` flex flex-col ${left ? "items-start" : "items-end "}`}>

            <div className={` rounded-full flex justify-center items-center h-7 w-7 ${left ? "bg-zinc-700 text-white" : " dark:bg-zinc-200 dark:text-black"} `}>{sender.split(" ").map((word) => word.charAt(0).toUpperCase()).join("")}</div>

            <div className={` ${left === true ? "ml-5 bg-zinc-700 text-white" : "mr-5 bg-green-600 text-white"} max-w-[60%]  py-2 px-4 rounded-xl inline-block`}>{message}</div>
        </div>
    )
}

export default Chat