import {BrowserRouter as Router, Routes, Route} from "react-router";
import LandingPage from "./pages/LandingPage";
import StudentPage from "./pages/StudentPage";
import SubjectPage from "./pages/SubjectPage";
import GradePage from "./pages/GradePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/grades" element={<GradePage />} />
      </Routes>
    </Router>
  );
}  