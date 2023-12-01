import { useState, FormEvent } from "react";
import "./App.css";

const ToDoList = () => {

  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: input, completed: false },
      ]);
      setInput("");
    }
  };

  const handleCheckboxChange = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a to-do"
          className="todo-input"
          value={input}
          onChange={(event) => {setInput(event.target.value);}}
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <span style={{textDecoration: task.completed ? "line-through" : "none",}}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ToDoList;
