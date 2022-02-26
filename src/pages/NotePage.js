import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assests/arrow-left.svg';

const NotePage = ({ match }) => {
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
  return (
    <div className='note'>
      <div className='note-header'>
        <Link to='/'>
          <ArrowLeft />
        </Link>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
