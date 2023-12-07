import  { useState, FormEvent} from "react"; //useEffect
import "./App.css";


type Task = {
  text: string;
  completed: boolean;
}

const ToDoList = () => {

  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task []>([]);
  


  console.log(tasks)
  
  // useEffect(() => {
  //   localStorage.setItem('myTask', JSON.stringify(tasks));
  // }, [tasks]); 

  // useEffect(() => {
  //   const storedTasks = localStorage.getItem('myTask');
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  // }, []); 


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim() !== "") {
      const newTask: Task = {
        text: input,
        completed: false,
      };

      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      setInput("");
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDelete = (index: number) => {
    const allTasks = [...tasks];
    allTasks.splice(index, 1)
    setTasks(allTasks)
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
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

      <div className="task-table">
        {tasks.map((task, index) => (
          <div 
            key={index}
            className="single-task"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>handleCheckboxChange(index)}
            />
            <span
              style={{textDecoration: task.completed ? "line-through" : "none",
              fontSize: '24px'}}
            >
              {task.text}
            </span>
            <span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                  Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
