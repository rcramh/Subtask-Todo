import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        subtasks: [],
      });
    },
    addSubtask: (state, action) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.taskId);
      if (taskIndex !== -1) {
        // Ensure Redux detects the state update
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          subtasks: [
            ...state.tasks[taskIndex].subtasks,
            { id: Date.now(), text: action.payload.text },
          ],
        };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    deleteSubtask: (state, action) => {
      state.tasks = state.tasks.map(task => ({
        ...task,
        subtasks: task.subtasks.filter(sub => sub.id !== action.payload),
      }));
    },
  },
});

export const { addTask, addSubtask, deleteTask, deleteSubtask } = todoSlice.actions;
export default todoSlice.reducer;
