import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, BookOpen } from 'lucide-react';

// --- MOCK DATA AND INITIAL SETUP ---

// Initial mock list of subjects
const initialSubjects = [
    { id: 101, name: "Data Structures & Algorithms", code: "CS201", credits: 4 },
    { id: 102, name: "Object-Oriented Programming", code: "CS202", credits: 3 },
    { id: 103, name: "Linear Algebra", code: "MATH103", credits: 3 },
    { id: 104, name: "Thermodynamics", code: "EE310", credits: 4 },
];

// Initial state for a new subject form
const initialFormState = {
    id: null,
    name: '',
    code: '',
    credits: '',
};


// --- MODAL COMPONENT ---

const SubjectModal = ({ isOpen, onClose, subjectData, onSave }) => {
    // Local state for form data, initialized with passed data or empty state
    const [formData, setFormData] = useState(subjectData || initialFormState);

    useEffect(() => {
        // Reset form data when subjectData (editing subject) changes
        setFormData(subjectData || initialFormState);
    }, [subjectData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic type conversion for credits
        const subjectToSave = {
            ...formData,
            credits: parseInt(formData.credits, 10) || 0,
        };
        onSave(subjectToSave);
        onClose();
    };

    const isEditing = formData.id !== null;

    return (
        // Modal Backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4">
            {/* Modal Content */}
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transition-all transform duration-300 scale-100 border border-teal-700">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-teal-700">
                    <h2 className="text-2xl font-bold text-teal-400">
                        {isEditing ? 'Edit Subject' : 'Add New Subject'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body (Form) */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Subject Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Subject Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition"
                            placeholder="e.g., Database Systems"
                        />
                    </div>
                    
                    {/* Subject Code Input */}
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">Course Code</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition"
                            placeholder="e.g., CS405"
                        />
                    </div>

                    {/* Credits Input */}
                    <div>
                        <label htmlFor="credits" className="block text-sm font-medium text-gray-300 mb-1">Credits</label>
                        <input
                            type="number"
                            name="credits"
                            id="credits"
                            value={formData.credits}
                            onChange={handleChange}
                            min="1"
                            max="6"
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition"
                            placeholder="e.g., 3"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150"
                        >
                            {isEditing ? 'Save Changes' : 'Add Subject'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- MAIN SUBJECTS COMPONENT ---

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null); // Holds data of subject being edited

    const openAddModal = () => {
        setEditingSubject(null); // Reset for adding new subject
        setIsModalOpen(true);
    };

    const openEditModal = (subject) => {
        setEditingSubject(subject);
        setIsModalOpen(true);
    };

    const handleSaveSubject = (subjectData) => {
        if (subjectData.id) {
            // Edit existing subject
            setSubjects(subjects.map(s => 
                s.id === subjectData.id ? subjectData : s
            ));
        } else {
            // Add new subject
            const newId = Date.now(); // Simple ID generation for mock data
            setSubjects([...subjects, { ...subjectData, id: newId }]);
        }
    };

    const handleDeleteSubject = (id) => {
        // NOTE: Replacing window.confirm with a console log as per instructions
        console.log(`Attempting to delete subject with ID: ${id}`);
        const confirmed = true; // In a real app, this would be a custom modal confirmation
        
        if (confirmed) {
             setSubjects(subjects.filter(s => s.id !== id));
             // In a real app, you would dispatch a success message here
        }
    };
    
    // Custom Alert/Confirmation Placeholder for consistency
    const confirmDelete = (subject) => {
        if (window.confirm(`Are you sure you want to delete the subject: ${subject.name} (${subject.code})?`)) {
            handleDeleteSubject(subject.id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 font-inter text-white p-4 sm:p-8">
            <header className="max-w-7xl mx-auto mb-8">
                <h1 className="text-4xl font-extrabold text-teal-400 mb-2 flex items-center space-x-3">
                    <BookOpen className="w-8 h-8"/> <span>Subject Catalog</span>
                </h1>
                <p className="text-gray-400">Manage the list of courses offered by the institution.</p>
            </header>

            <main className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-xl shadow-2xl border border-teal-800">
                
                {/* Add Subject Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={openAddModal}
                        className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-150 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Subject</span>
                    </button>
                </div>

                {/* Subjects Table */}
                <div className="overflow-x-auto rounded-lg shadow-xl border border-teal-700/50">
                    <table className="min-w-full divide-y divide-teal-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subject Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Credits</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-teal-900">
                            {subjects.length > 0 ? (
                                subjects.map((subject) => (
                                    <tr key={subject.id} className="hover:bg-gray-700 transition duration-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 hidden sm:table-cell">
                                            {subject.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-300">
                                            {subject.code}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                            {subject.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-yellow-400 hidden sm:table-cell">
                                            {subject.credits}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => openEditModal(subject)}
                                                    className="p-2 text-teal-400 hover:text-teal-300 bg-teal-900/50 hover:bg-teal-900 rounded-full transition"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => confirmDelete(subject)}
                                                    className="p-2 text-red-400 hover:text-red-300 bg-red-900/50 hover:bg-red-900 rounded-full transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                                        No subject records found. Click "Add Subject" to populate the catalog.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            
            {/* The Modal for Adding/Editing */}
            <SubjectModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                subjectData={editingSubject}
                onSave={handleSaveSubject}
            />
        </div>
    );
};

export default SubjectsPage;
