import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RunModel from './pages/RunModel';
import Architecture from './pages/Architecture';
import About from './pages/About';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/run-model" element={<RunModel />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}