// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
