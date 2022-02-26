import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>{note?.body}</h1>
    </div>
  );
};

export default NotePage;
