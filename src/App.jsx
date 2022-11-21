import React from 'react';
import { db } from './firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject
} from "firebase/storage";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

import { TaskForm, Task, EditTask } from './components/index'

function App() {
  const [visibleEdit, setVisibleEdit] = React.useState(false);
  const [editTask, setEditTask] = React.useState(null);
  const [limit, setLimit] = React.useState([]);
  const [list, setList] = React.useState([]);

  const storage = getStorage();

  React.useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let listArr = [];
      querySnapshot.forEach((doc) => {
        listArr.push({ ...doc.data(), id: doc.id });
      });
      setList(listArr);
    });
    return () => unsubscribe();
  }, []);

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

  const onAddTask = async (obj) => {
    try {
      await addDoc(collection(db, 'todos'), {
        title: obj.title,
        text: obj.text,
        date: obj.date,
        fileUrl: obj.fileUrl,
        fileName: obj.fileName,
        complete: false
      });
    } catch (ex) {
      console.error(ex);
    }

    if (obj.fileUrl !== '') {
      try {
        const fileRef = ref(storage, obj.fileUrl);
        await uploadBytes(fileRef, obj.file);
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  const onRemoveTask = async (id, fileUrl) => {
    if (window.confirm('Выдействительно хотите удалить задачу?')) {
      try {
        const docRef = doc(db, 'todos', id);
        await deleteDoc(docRef);
      } catch (ex) {
        console.error(ex);
      }
      if (fileUrl !== '') {
        try {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
        } catch (ex) {
          console.error(ex);
        }
      }
    }
  }

  const onEditTask = (id) => {
    const obj = list.filter((item) => item.id === id);
    setEditTask(obj[0])
    setVisibleEdit(true);
  }

  const onUpdateTask = async (obj) => {
    const id = editTask.id;
    try {
      const docRef = doc(db, 'todos', id);
      await updateDoc(docRef, {
        title: obj.title,
        text: obj.text,
        date: obj.date,
        fileUrl: obj.fileUrl,
        fileName: obj.fileName
      })
    } catch (ex) {
      console.error(ex);
    }


    if (editTask.fileUrl !== obj.fileUrl) {
      try {
        const newFileRef = ref(storage, obj.fileUrl);
        await uploadBytes(newFileRef, obj.file);

        const oldFileRef = ref(storage, editTask.fileUrl);
        await deleteObject(oldFileRef);
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  const onCompleteTask = async (id, complete) => {
    try {
      const docRef = doc(db, 'todos', id);
      await updateDoc(docRef, {
        complete: complete,
      });
    } catch (ex) {
      console.error(ex);
    }
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

    </div >
  );
}

export default App;
