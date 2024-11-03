import Navbar from "../components/Navbar/Navbar"
import { HomeContent }from "../pages/HomeContent";
import "../styles/styles.css"


function Home() {
    return (
        <>
            <Navbar />
            <HomeContent />
        </>
    )
}

export default Home