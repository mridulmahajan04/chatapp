import Conversation from "../sidebar/Conversation";
import useGetConversations from "../../hooks/useGetConversations";
const Conversations = () => {
	const { loading, conversation } = useGetConversations();
	console.log(conversation)
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversation.map((conversation) => (
			<Conversation
				key={conversation._id}
				conversation={conversation}
			/>
			))}
		</div>
	);
};
export default Conversations; 