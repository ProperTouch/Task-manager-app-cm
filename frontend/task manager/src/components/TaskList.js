import React from 'react'; 

function TaskList({ tasks, onEdit, onDelete }) { // Define with props
  return ( 
    <ul className="bg-white p-6 rounded shadow-md w-full max-w-md"> // List container
      {tasks.map(task => ( // Map over tasks
        <li key={task._id} className="mb-4 p-4 border border-gray-200 rounded"> // List item
          <h2 className="text-xl font-bold">{task.title}</h2> 
          <p>{task.description}</p> 
          <p className={task.completed ? 'text-green-500' : 'text-red-500'}> 
            {task.completed ? 'Completed' : 'Pending'} // Conditional text
          </p>
          <div className="flex justify-end mt-2"> // Buttons container
            <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white p-1 rounded mr-2"> 
              Edit // Text
            </button>
            <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white p-1 rounded"> 
              Delete // Text
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList; 