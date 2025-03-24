import Conversation from "../../components/sidebar/Conversation.jsx";
import LogoutButton from "../../components/sidebar/LogoutButton.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
      <Conversation />
      {/* <LogoutButton /> */}
		</div>
	);
};
export default Home;