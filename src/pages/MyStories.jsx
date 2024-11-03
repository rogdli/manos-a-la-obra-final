import Navbar from "../components/Navbar/Navbar";
import "../styles/styles.css";
import { useFetchUserStories } from '../hooks/useFetchUserStories';
import { MyStoryJ } from '../components/MyStoryJ/MyStoryJ';

export const MyStories = () => {
    const { data: stories, loading: loadingStories, error } = useFetchUserStories();

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>My Stories</h2>
                <div>
                    {loadingStories ? (
                        <p>Loading stories...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : stories && stories.length > 0 ? (
                        stories.map((story) => (
                            <MyStoryJ key={story._id} story={story} />
                        ))
                    ) : (
                        <p>No stories assigned to you</p>
                    )}
                </div>
            </div>
        </>
    );
};
