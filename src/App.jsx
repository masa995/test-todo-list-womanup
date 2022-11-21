import React from 'react';
import { TaskForm, Task, EditTask } from './components/index'

function App() {
  const [visibleEdit, setVisibleEdit] = React.useState(false);
  // const [editTaskId, setEditTaskId] = React.useState(null);
  const [editTask, setEditTask] = React.useState(null);

  const [limit, setLimit] = React.useState([])
  const [list, setList] = React.useState([]);
  // console.log(list);

  React.useEffect(() => {
    if (list.length !== 0) {
      const dateNow = new Date().getTime()
      const listNew = list.map((item) => {
        let taskDate = new Date(item.date).getTime();

        if (dateNow > taskDate) {
          return false
        } else {
          return true
        }
      })
      setLimit(listNew)
    }
  }, [list])

  const onAddTask = (obj) => {
    const listNew = [...list, obj];
    setList(listNew);
  }

  const onRemoveTask = (id) => {
    if (window.confirm('Выдействительно хотите удалить задачу?')) {
      const listNew = list.filter((item) => item.id !== id);
      setList(listNew);
    }
  }

  const onEditTask = (id) => {
    const obj = list.filter((item) => item.id === id);
    setEditTask(obj[0])
    setVisibleEdit(true);

  }

  const onUpdateTask = (obj) => {
    console.log(obj);
    const listNew = list.map((item) => {
      for (let key in obj) {
        if (item[key] !== obj[key]) {
          item[key] = obj[key];
        }
      }
      return item
    })
    setList(listNew)
  }

  const onCompleteTask = (id, complete) => {
    const listNew = list.map((item) => {
      if (id === item.id) {
        item.complete = complete
      }
      return item
    })
    setList(listNew)
  }

  return (
    <div className="wrapper todo">
      <TaskForm
        onAddTask={onAddTask}
      />

      <ul className='todo__list'>
        {list && list.map((item, index) =>

          <Task
            key={`task-${item.id}`}
            onRemoveTask={onRemoveTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
            limit={limit[index]}
            {...item}
          />
        )}
      </ul>

      {
        visibleEdit &&
        <EditTask
          onUpdateTask={onUpdateTask}
          setVisibleEdit={setVisibleEdit}
          editTask={editTask}
        />
      }

    </div>
  );
}

export default App;
