import React from 'react'
// import PropTypes from 'prop-types'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [date, setDate] = React.useState('');
  const [file, setFile] = React.useState();

  const clearInputs = () => {
    setTitle('');
    setText('');
    setDate('');
    setFile('');
  }

  const addTask = (e) => {
    e.preventDefault();

    const obj = {
      id: Math.random(),
      title,
      text,
      date,
      file,
      complete: false
    }
    clearInputs();
    onAddTask(obj);
  }

  const saveFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const fileElem = e.target.files[0];
      setFile(fileElem);
    }
  }

  return (
    <form
      className='todo__form'
      onSubmit={(e) => { addTask(e) }}
    >
      <div className='todo__input'>
        <input
          className='field todo__input-title'
          type='text'
          placeholder='Заголовок'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className='field todo__input-date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div className='file'>
          <input
            className='hidden'
            id='file'
            type='file'
            onChange={(e) => saveFile(e)}
          />

          <label htmlFor='file'>
            <span>Загрузить файл</span>
          </label>
        </div>

        <button
          className='button'
          type='submit'
        >
          Добавить
        </button>
      </div>

      <textarea
        className='textarea todo__textarea'
        rows="5"
        cols="40"
        placeholder='Описание'
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </form>
  )
}

// TaskForm.propTypes = {}

export default TaskForm
