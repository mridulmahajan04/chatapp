import { useSocketContext } from "../../context/SocketContext";
import useConversations from "../../zustand/useConversations";
import daisyui from "daisyui";
const Conversation = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } = useConversations();
	const {onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	const isSelected = selectedConversation?._id === conversation._id;
	console.log("User is online")
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
				onClick={() => setSelectedConversation(conversation)}
			>

				<div className={`avatar ${isOnline? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>🎃</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;