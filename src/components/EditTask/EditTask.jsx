import React from 'react'
import PropTypes from 'prop-types'

const EditTask = ({ onUpdateTask, setVisibleEdit, editTask }) => {
  const [title, setTitle] = React.useState(editTask.title);
  const [text, setText] = React.useState(editTask.text);
  const [date, setDate] = React.useState(editTask.date);
  const [file, setFile] = React.useState();
  const [fileUrl, setFileUrl] = React.useState(editTask.fileUrl);
  const [fileName, setFileName] = React.useState(editTask.fileName);

  /**
   * Функция-обработчик.
   * Сохраняет данные для работы с файлом.
   * @param {*} e 
   */
  const saveFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const fileElem = e.target.files[0];
      setFile(fileElem);

      const url = `/files/${fileElem.name}`;
      setFileUrl(url);

      const name = fileElem.name;
      setFileName(name);
    }
  }

  /**
   * Очищает input-ы
   */
  const clearInputs = () => {
    setTitle('');
    setText('');
    setDate('');
    setFile();
    setFileUrl('')
  }

  /**
   * Функция-обработчик.
   * Обрабатывает изменения задачи. Сохроняет новые данные.
   * @param {*} e - событие 
   */
  const onEditTask = (e) => {
    e.preventDefault();

    const obj = {
      title,
      text,
      date,
      file,
      fileUrl,
      fileName
    }
    clearInputs();
    onUpdateTask(obj);
    setVisibleEdit(false);
  }

  /**
   * Функция-обработчик.
   * Отменяет изменения задачи.
   */
  const onEditCancel = () => {
    clearInputs();
    setVisibleEdit(false);
  }

  return (
    <div className='todo__edit'>
      <form
        className='todo__form'
        onSubmit={(e) => { onEditTask(e) }}
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
              id='file1'
              type='file'
              onChange={(e) => saveFile(e)}
            />

            <label htmlFor='file1'>
              <span>Загрузить файл</span>
            </label>
          </div>
        </div>

        <textarea
          className='textarea todo__textarea'
          rows="5"
          cols="40"
          placeholder='Описание'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div>
          <button
            className='button'
            type='submit'
          >
            Ок
          </button>
          <button
            className='button'
            onClick={onEditCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

EditTask.propTypes = {
  onUpdateTask: PropTypes.func,
  setVisibleEdit: PropTypes.func,
  editTask: PropTypes.object
}

export default EditTask
