import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assests/arrow-left.svg';

const NotePage = ({ match, history }) => {
  let noteId = match.params.id; //match.params will give me the url params. and id is what we specified in the url.
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
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

  let handleSubmit = () => {
    updateNote();
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
      </div>
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
