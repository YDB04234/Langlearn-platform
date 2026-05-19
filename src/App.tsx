import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LearningHub from './pages/LearningHub';
import VocabularyModule from './pages/VocabularyModule';
import GrammarModule from './pages/GrammarModule';
import SpeakingModule from './pages/SpeakingModule';
import ListeningModule from './pages/ListeningModule';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Achievements from './pages/Achievements';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/learn" element={<LearningHub />} />
            <Route path="/learn/:language/:courseId" element={<LearningHub />} />
            <Route path="/module/vocabulary" element={<VocabularyModule />} />
            <Route path="/module/grammar" element={<GrammarModule />} />
            <Route path="/module/speaking" element={<SpeakingModule />} />
            <Route path="/module/listening" element={<ListeningModule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
