import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubtask, deleteTask, deleteSubtask } from "./todoSlice";

const TaskItem = ({ task }) => {
  const [subtaskText, setSubtaskText] = useState("");
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid black"}}>
      <div>
        <b>{task.text}</b>
        <button onClick={() => dispatch(deleteTask(task.id))}>Delete Task</button>
      </div>

      <div>
        <input
          type="text"
          value={subtaskText}
          onChange={(e) => setSubtaskText(e.target.value)}
          placeholder="New Subtask"
        />
        <button onClick={() => {
          if (subtaskText.trim()) {
            dispatch(addSubtask({ taskId: task.id, text: subtaskText }));
            setSubtaskText("");
          }
        }}>Add New Subtask</button>
      </div>

      <ul>
        {task.subtasks.map(sub => (
          <li key={sub.id} >
            {sub.text}
            <button onClick={() => dispatch(deleteSubtask(sub.id))}>Delete Subtask</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskItem;
