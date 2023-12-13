import { Hash } from "lucide-react"
import { useSelector } from "react-redux"


function ChatWelcome() {
  const name = useSelector(state=>state.selected.selectedChannel?.name)

  return (
    <div className="space-y-2 px-4 mb-4">
      {/* {type === "channel" && ( */}
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash size={72} className="text-neutral-800 dark:text-pearl-500" />
        </div>
      {/*  )} */}
      <p className="text-3xl font-bold text-neutral-800 dark:text-pearl-800">
        {/* {type === "channel" ? "" */}
        Welcome to #{name}
         {/* " : ""}{name} */}
      </p>
      <p className="text-neutral-700 dark:text-pearl-900">
        {/* {type === "channel" ?  */}
          This is the start of the #{name} channel.
          {/* : `This is the start of your conversation with ${name}` */}
        {/* } */}
      </p>
    </div>
  )
}

export default ChatWelcome