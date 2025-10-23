import React, { useState, useEffect } from 'react';
import { BookOpen, Users, GraduationCap, Zap, Code, BarChart3, Home } from 'lucide-react';

// Mock data for the user profile and IT journey
const profile = {
  fullName: "Anya Sharma",
  title: "Computer Science Student & Web Developer",
  bio: "Passionate about building scalable applications and solving complex problems with clean code. Currently specializing in front-end development using modern frameworks.",
  image: "https://placehold.co/200x200/4c4c4c/ffffff?text=AS" // Placeholder for the profile picture
};

const journey = [
  {
    year: "Year 1: Foundations",
    icon: <Zap className="text-amber-400 w-6 h-6" />,
    description: "Built a solid foundation in core computer science principles, including discrete mathematics and introductory C++ programming. Discovered a deep interest in algorithms and data structures.",
  },
  {
    year: "Year 2: Web & Data Structures",
    icon: <Code className="text-cyan-400 w-6 h-6" />,
    description: "Dived into object-oriented programming (Java) and professional web development. Started learning React and implemented several personal projects, focusing heavily on responsive UI/UX design.",
  },
  {
    year: "Year 3: Specialization & Internship",
    icon: <GraduationCap className="text-lime-400 w-6 h-6" />,
    description: "Secured a summer internship as a Junior Software Developer. Gained practical experience in a professional Agile environment, working with cloud services (AWS) and advanced database management (PostgreSQL).",
  },
  {
    year: "Year 4: Final Project & Future Focus",
    icon: <BarChart3 className="text-pink-400 w-6 h-6" />,
    description: "Currently leading a team on a final-year project: a real-time analytics dashboard. Focusing on career readiness, optimizing skills in system design, and exploring machine learning applications.",
  },
];

// Navigation links for mock pages
const navLinks = [
    { name: 'Students', href: '#students', icon: Users },
    { name: 'Subjects', href: '#subjects', icon: BookOpen },
    { name: 'Grades', href: '#grades', icon: BarChart3 },
];

const LandingPage = () => {
    // State to handle the active navigation link (optional, for visual feedback)
    const [activeSection, setActiveSection] = useState('home');

    // Simple scroll handler for demonstration purposes
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY < 100) {
                setActiveSection('home');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // Helper component for the navigation links
    const NavItem = ({ link }) => {
        const Icon = link.icon;
        const isActive = activeSection === link.name.toLowerCase();
        return (
            <a
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
                    isActive
                        ? 'bg-indigo-700 text-white shadow-lg'
                        : 'text-indigo-200 hover:bg-indigo-700/50 hover:text-white'
                }`}
                onClick={() => setActiveSection(link.name.toLowerCase())}
            >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
            </a>
        );
    };

    // Helper component for the journey timeline
    const JourneyStep = ({ item, index }) => (
        <div className="flex relative pb-10">
            {/* Timeline Line */}
            {index < journey.length - 1 && (
                <div className="h-full w-0.5 bg-gray-700 absolute inset-0 left-2.5 top-8"></div>
            )}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center relative z-10">
                {item.icon}
            </div>
            <div className="flex-grow pl-6">
                <h3 className="text-xl font-bold text-indigo-300 mb-1">{item.year}</h3>
                <p className="text-gray-300 leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 font-inter text-white">
            
            {/* 1. Sticky Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-indigo-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Home className="text-indigo-400 w-6 h-6" />
                            <span className="text-xl font-extrabold text-white tracking-wider">
                                {profile.fullName.split(' ')[0]}'s Hub
                            </span>
                        </div>
                        <div className="hidden md:flex space-x-4">
                            {navLinks.map((link) => (
                                <NavItem key={link.name} link={link} />
                            ))}
                        </div>
                        <div className="md:hidden">
                            {/* Mobile menu button placeholder */}
                            <button className="text-indigo-200 p-2 rounded-md hover:bg-indigo-700/50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* 2. Profile and Introduction Section (Hero) */}
                <section id="profile" className="mb-16 pt-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-8 rounded-2xl shadow-2xl border border-indigo-800">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                            <img
                                src={profile.image}
                                alt={profile.fullName}
                                className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow-xl transition-transform duration-500 hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null; // prevents infinite loop
                                    e.target.src = 'https://placehold.co/200x200/4c4c4c/ffffff?text=AS'; // fallback
                                }}
                            />
                        </div>

                        {/* Name and Bio */}
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400 mb-2 text-center md:text-left">
                                {profile.fullName}
                            </h1>
                            <p className="text-xl font-semibold text-gray-300 mb-4 text-center md:text-left">
                                {profile.title}
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed text-center md:text-left">
                                {profile.bio}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. IT Journey Section (Timeline) */}
                <section id="journey" className="pt-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-indigo-400 border-b-2 border-indigo-700 pb-3">
                        My IT Journey Timeline
                    </h2>
                    
                    <div className="relative max-w-4xl mx-auto">
                        {journey.map((item, index) => (
                            <JourneyStep key={index} item={item} index={index} />
                        ))}
                    </div>
                </section>

                {/* 4. Mock Links Section */}
                <section id="mock-links" className="mt-16 bg-gray-800 p-8 rounded-xl shadow-inner border border-indigo-800">
                    <h3 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
                        Explore Academics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex flex-col items-center p-6 bg-gray-700 rounded-lg transition duration-300 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/50">
                                <link.icon className="w-10 h-10 text-white mb-3" />
                                <a href={link.href} className="text-xl font-bold text-white hover:underline">
                                    {link.name}
                                </a>
                                <p className="text-sm text-gray-300 mt-1">Go to the {link.name} portal.</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
            
            <footer className="bg-gray-900 border-t border-indigo-900 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {profile.fullName}. Built with React and Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
};

// Default export is required for the component to be rendered
export default LandingPage;
