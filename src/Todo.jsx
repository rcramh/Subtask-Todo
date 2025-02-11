import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./todoSlice";
import TaskItem from "./TaskItem";

const Todo = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.todo.tasks);

  return (
    <div>
      <h2>Todo List</h2>

      <div>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={() => {
          if (taskText.trim()) {
            dispatch(addTask({ text: taskText }));
            setTaskText("");
          }
        }}>Add New Task</button>
      </div>

      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Todo;
