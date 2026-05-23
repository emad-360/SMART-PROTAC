import GlassCard from '../components/GlassCard';

export default function About() {
  const teamMembers = [
    {
      name: 'Emad',
      image: 'public/images/profile.png',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Shreeyanth',
      image: 'public/images/profile.png',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Rushikesh',
      image: 'public/images/profile.png',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Aishwarya',
      image: 'public/images/profile.png',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Karthikeya',
      image: 'public/images/profile.png',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-purple-400 dark:to-purple-600">
            About Us
          </h1>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Meet the team behind SMART PROTAC
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <GlassCard 
              key={index} 
              className="text-center transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/50 transition-all duration-300 dark:hover:shadow-purple-900/30"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg dark:border-purple-500/30">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 dark:text-gray-200">
                {member.name}
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-500/20 hover:bg-purple-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <img
                    src="public/images/linkedin.png"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-500/20 hover:bg-purple-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <img
                    src="public/images/github.png"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
