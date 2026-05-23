import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl shadow-2xl shadow-purple-400/50 mb-6 animate-bounce-slow">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent animate-gradient dark:from-purple-400 dark:via-purple-500 dark:to-purple-600">
            SMART PROTAC
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed dark:text-gray-300">
            Advanced deep learning for predicting PROTAC-mediated protein degradation with state-of-the-art accuracy
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/run-model">
            <Button className="text-lg px-8 py-4">
              Run Model
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </Link>
          <Link to="/architecture">
            <Button variant="secondary" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
