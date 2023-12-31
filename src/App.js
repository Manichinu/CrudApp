// import Counter from "./features/counter/Counter";
import PostList from "./features/posts/postList";
import AddNewPost from "./features/posts/AddPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPost from "./features/posts/EditPost";
import UserList from "./features/users/userList";
import UserItems from "./features/users/userItems";
import NotFound from "./Component/NotFound";
// import Memo from "./Learnings/UseMemo";
// import Context from "./Learnings/UseContext";
import { createContext, useState } from "react";
import Norerender from "./Learnings/UseRef";
import Profile from "./Learnings/HOC/profile";

export const AppContext = createContext("");

function App() {
  const [name, setName] = useState("demo")
  // var myInterval = setInterval(() => {
  //   console.log("This is Redux")
  // }, 1000)
  // setTimeout(() => {
  //   clearInterval(myInterval);
  // }, 3000);

  return (
    <>
      <AppContext.Provider value={{ name, setName }}>
        <Header />
        {/* <Memo /> */}
        {/* <Context /> */}
        {/* <Norerender /> */}
        {/* <Profile /> */}
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="post" >
            <Route index element={<AddNewPost />} />
            <Route path=":postID" element={<SinglePostPage />} />
            <Route path="edit/:editID" element={<EditPost />} />
          </Route>
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<UserItems />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      {/* <Counter /> */}

    </>
  );
}

export default App;
