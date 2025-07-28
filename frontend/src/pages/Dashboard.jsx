import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRef } from 'react';
import { 
  getTasks,
  createTask,
  updateTask,
  deleteTask, 
 } from '../services/tasks';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../services/notes';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [newTask, setNewTask] = useState({ description: '', status: 'pending' });

  const fetchData = async () => {
    if (activeTab === 'notes') {
      const data = await getNotes();
      setNotes(data);
    } else {
      const data = await getTasks();
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

const handleAddOrUpdate = async () => {
  const isNote = activeTab === 'notes';

  try {
    if (isNote) {
      if (!newNote.title.trim() || !newNote.content.trim()) {
        alert("Title and Content are required");
        return;
      }

      if (editId) {
        await updateNote(editId, newNote);
      } else {
        await createNote(newNote);
      }

      setNewNote({ title: '', content: '' });

    } else {
      if (!newTask.description.trim()) {
        alert("Task description is required");
        return;
      }

      if (editId) {
        await updateTask(editId, newTask);
      } else {
        await createTask(newTask);
      }

      setNewTask({ description: '', status: 'pending' });
    }

    setShowForm(false);
    setEditId(null);
    fetchData();
  } catch (error) {
    console.error("Error saving:", error);
    alert("Something went wrong while saving. Please try again.");
  }
};

const handleDelete = async (id) => {
  try {
    if (activeTab === 'notes') {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } else {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    }
  } catch (error) {
    console.error("Failed to delete:", error);
    alert("Error deleting item.");
  }
};

  const handleEdit = (item) => {
    setShowForm(true);
    setEditId(item.id);
    if (activeTab === 'notes') {
      setNewNote({ title: item.title, content: item.content });
    } else {
      setNewTask({ description: item.description, status: item.status });
    }
  };

  const formRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
      setEditId(null);
    }
  };

  if (showForm) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showForm]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-800 text-black dark:text-white border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">
          {activeTab === 'notes' ? '📝 Notes' : '✅ Tasks'}
        </h2>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium hover:underline">
          + Add {activeTab === 'notes' ? 'Notes' : 'Tasks'}
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="p-6 space-y-2 text-gray-800 dark:text-gray-200 border rounded shadow">
        <div className="p-6 space-y-2">
          {activeTab === 'notes' ? (
            <>
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"

              />
              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"

              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"

              />
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"

              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </>
          )}
          <button onClick={handleAddOrUpdate} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
            {editId ? 'Update' : 'Save'}
          </button>
        </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        {activeTab === 'notes' ? (
          notes.length === 0 ? (
            <p className="text-gray-500">Add a note</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow border dark:border-gray-700">
                <h3 className="text-lg font-bold">{note.title}</h3>
                <p>{note.content}</p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => handleEdit(note)} className="cursor-pointer text-blue-500">Update</button>
                  <button onClick={() => handleDelete(note.id)} className="cursor-pointer text-red-500">Delete</button>
                </div>
              </div>
            ))
          )
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">Add a task</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow border dark:border-gray-700">
              <p className="text-md">{task.description}</p>
              <p className="text-xs text-gray-500">Status: {task.status}</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEdit(task)} className="text-blue-500">Update</button>
                <button onClick={() => handleDelete(task.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;