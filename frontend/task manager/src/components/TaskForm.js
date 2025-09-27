import React, { useState, useEffect } from 'react';                        // Import React and hooks

function TaskForm({ onSubmit, initialData }) {                             // Define TaskForm component with props
  const [title, setTitle] = useState('');                                 
  const [description, setDescription] = useState(''); 
  const [completed, setCompleted] = useState(false); 

  useEffect(() => {                                                        // Effect to set initial data when editing
    if (initialData) {                                                    // If initialData provided
      setTitle(initialData.title); 
      setDescription(initialData.description || '');                     // Set description (handle null)
      setCompleted(initialData.completed); 
    }
  }, [initialData]);                                                   // Dependency on initialData

  const handleSubmit = (e) => {                                      // Submit handler
    e.preventDefault();                                             // Prevent default form submission
    onSubmit({ title, description, completed });                    // Call onSubmit with form data
    setTitle(''); 
    setDescription(''); 
    setCompleted(false); 
  };

  return ( // JSX
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md mb-8"> 
      <div className="mb-4"> // Title field container
        <label className="block text-gray-700">Title</label> // Label
        <input 
          type="text"  
          value={title}                                                        // Bound to state
          onChange={(e) => setTitle(e.target.value)}                          // Update state
          required 
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4"> // Description field
        <label className="block text-gray-700">Description</label> // Label
        <textarea 
          value={description}                                                     // Bound
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>
      <div className="mb-4"> // Completed checkbox
        <label className="flex items-center"> // Label with flex
          <input                                                                // Checkbox
            type="checkbox"                                                   // Checkbox type
            checked={completed}                                              // Bound
            onChange={(e) => setCompleted(e.target.checked)}                // Update
            className="mr-2"                                               // Margin
          />
          Completed // Text
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full"> // Submit button
        {initialData ? 'Update Task' : 'Add Task'} // Conditional text
      </button>
    </form>
  );
}

export default TaskForm; 