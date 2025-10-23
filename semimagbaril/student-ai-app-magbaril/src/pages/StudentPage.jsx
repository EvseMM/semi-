import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
  const [currentStudent, setCurrentStudent] = useState({
    id: null,
    student_number: '',
    first_name: '',
    last_name: '',
    course: '',
    year_level: ''
  });

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('student_number', { ascending: true });
    if (error) {
      console.error('Error fetching students:', error);
    } else {
      setStudents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Open modal for create
  const openCreateModal = () => {
    setModalMode('create');
    setCurrentStudent({
      id: null,
      student_number: '',
      first_name: '',
      last_name: '',
      course: '',
      year_level: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for update
  const openUpdateModal = (student) => {
    setModalMode('update');
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalMode === 'create') {
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            student_number: currentStudent.student_number,
            first_name: currentStudent.first_name,
            last_name: currentStudent.last_name,
            course: currentStudent.course,
            year_level: Number(currentStudent.year_level)
          }
        ]);
      if (error) {
        console.error('Insert error:', error);
      } else {
        fetchStudents();
        setIsModalOpen(false);
      }
    } else if (modalMode === 'update') {
      const { data, error } = await supabase
        .from('students')
        .update({
          student_number: currentStudent.student_number,
          first_name: currentStudent.first_name,
          last_name: currentStudent.last_name,
          course: currentStudent.course,
          year_level: Number(currentStudent.year_level)
        })
        .eq('id', currentStudent.id);
      if (error) {
        console.error('Update error:', error);
      } else {
        fetchStudents();
        setIsModalOpen(false);
      }
    }
  };

  // Handle delete
  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.first_name} ${student.last_name}?`)) return;
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', student.id);
    if (error) {
      console.error('Delete error:', error);
    } else {
      fetchStudents();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={openCreateModal}
      >
        Add Student
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Student No.</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Year Level</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id} className="border-t">
                <td className="px-4 py-2">{stu.id}</td>
                <td className="px-4 py-2">{stu.student_number}</td>
                <td className="px-4 py-2">{stu.first_name}</td>
                <td className="px-4 py-2">{stu.last_name}</td>
                <td className="px-4 py-2">{stu.course}</td>
                <td className="px-4 py-2">{stu.year_level}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => openUpdateModal(stu)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(stu)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {modalMode === 'create' ? 'Add New Student' : 'Update Student'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Student Number</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="text"
                  name="student_number"
                  value={currentStudent.student_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="text"
                  name="first_name"
                  value={currentStudent.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="text"
                  name="last_name"
                  value={currentStudent.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Course</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="text"
                  name="course"
                  value={currentStudent.course}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Year Level</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="number"
                  name="year_level"
                  value={currentStudent.year_level}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {modalMode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
