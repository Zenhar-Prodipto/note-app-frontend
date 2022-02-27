import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NoteListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  // Another way of dealing it
  // let getNotes = () => {
  //   fetch('http://127.0.0.1:8000/api/notes/')
  //     .then((response) => response.json())
  //     .then((data) => setNotes(data));
  // };

  let getNotes = async () => {
    let response = await fetch('/api/notes/');
    let data = await response.json();
    setNotes(data);
  };

  function displayNotes() {
    return (
      <div className=''>
        <div className='notes'>
          <div className='notes-header'>
            <h2 className='notes-title'>&#9782; notes</h2>
            <p className='notes-count'>{notes.length}</p>
          </div>
        </div>
        <div className='notes-list'>
          {notes.map((note, index) => (
            <ListItem key={index} note={note} />
          ))}
        </div>
        <AddButton />
      </div>
    );
  }

  return <div>{displayNotes()}</div>;
};

export default NoteListPage;
