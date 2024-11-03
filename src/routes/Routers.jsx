import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { MyProjects } from "../pages/MyProjects";
import ProjectDetails from "../pages/ProjectDetails";
import { EpicDetails } from "../pages/EpicDetails";
import { StoryDetails } from "../pages/StoryDetails";
import { MyStories } from "../pages/MyStories";
import Settings from "../pages/Settings";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/my-projects",
    element: <MyProjects />,
  },
  {
    path: "/my-projects/:projectId",
    element: <ProjectDetails />,
  },
  {
    path: "/my-projects/:projectId/:epicId",
    element: <EpicDetails />,
  },
  {
    path: "/my-projects/:projectId/:epicId/:storyId",
    element: <StoryDetails />,
  },
  {
    path: "/my-stories",
    element: <MyStories />,
  },
  {
    path: "/my-stories/:storyId",
    element: <StoryDetails />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;