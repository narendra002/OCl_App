import React, { useState, useEffect, useCallback } from 'react';
import { createTask, deleteTask, getAllTasks, updateTask } from './AxiosApiCaller';
import { toast } from 'react-toastify';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');
  const [editTodo, setEditTodo] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const response = await getAllTasks();
      setTodos(response);
    } catch (error) {
      console.error('Error loading tasks:', error);
      // Handle error, e.g., display an error message to the user
    }
  }, []);

  useEffect(() => {
    loadTasks();
    setEditTodo(false);
  }, [loadTasks, editTodo]);

  const handleAdd = async () => {
    if (addTodo === '') {
      return;
    }
   
    try {
      const response = await createTask({ taskName: addTodo });
      setTodos([...todos, response]);
      setAddTodo('');
      toast.success('Task Added Successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error, e.g., display an error message to the user
      toast.error('Error Adding task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(todos[id]._id);
      setTodos((prev) => prev.filter((_, idx) => idx !== id));
      toast.success('Deleted Successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error, e.g., display an error message to the user
      toast.error('Error Deleting task');
    }
  };

  const handleEdit = async (id) => {
    const val = window.prompt('Enter Edited Value:', todos[id].taskName);
    if (val === null) {
      return;
    }
    if (val === '') {
      handleDelete(id);
    } else {
      try {
        const response = await updateTask(todos[id]._id, { taskName: val });
        const updatedTask = response.data;
        const updatedTodos = [...todos];
        updatedTodos[id] = updatedTask;
        setEditTodo(true); 
        setTodos(updatedTodos);
        toast.success('Edited Successfully');
      } catch (error) {
        console.error('Error updating task:', error);
       toast.error('Error updating task');
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg shadow-sm">
      <div className="text-4xl font-bold text-center py-8">Todo List</div>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
        <div className="flex">
          <input
            className="flex-grow outline-none p-2 rounded-md mr-2"
            placeholder="Add Items..."
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
        <ul className="mt-4">
          { todos?.map((item, id) => (
            <li key={id} className="flex justify-between items-center p-2 bg-slate-200 font-semibold mb-2 rounded-lg shadow-sm">
              <span className="text-lg">{item?.taskName}</span>
              <div className="space-x-2 ">
                <button
                  onClick={() => handleDelete(id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
