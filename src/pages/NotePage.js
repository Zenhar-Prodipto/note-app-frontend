import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assests/arrow-left.svg';

const NotePage = ({ match, history }) => {
  let noteId = match.params.id; //match.params will give me the url params. and id is what we specified in the url.
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let createNote = async () => {
    fetch(`/api/notes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  let getNote = async () => {
    if (noteId === 'new') return;
    let response = await fetch(`/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    fetch(`/api/notes/update/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/delete/${noteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  let handleSubmit = () => {
    if ((noteId !== 'new') & !note.body) {
      deleteNote();
    } else if (noteId !== 'new') {
      updateNote();
    } else if (noteId === 'new' && note !== null) createNote();
    history.push('/');
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log('Handle Change:', note);
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <Link to='/'>
          <ArrowLeft onClick={handleSubmit} />
        </Link>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      <h1>{note?.title}</h1>

      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
