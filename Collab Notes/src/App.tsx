import React, { useState, useEffect } from 'react';
import { StickyNote, Share2 } from 'lucide-react';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';
import { Note, User } from './types';
import { getStoredNotes, setStoredNotes, getStoredUser, setStoredUser, generateUsername, generateColorFromName } from './utils/storage';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedNotes = getStoredNotes();
    setNotes(storedNotes);

    let user = getStoredUser();
    if (!user) {
      user = { id: Date.now().toString(), name: generateUsername() };
      setStoredUser(user);
    }
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    setStoredNotes(notes);
  }, [notes]);

  const addOrUpdateNote = (content: string) => {
    if (!currentUser) return;
    const existingNoteIndex = notes.findIndex(note => note.author === currentUser.name);
    const newNote: Note = {
      id: existingNoteIndex !== -1 ? notes[existingNoteIndex].id : Date.now().toString(),
      content,
      author: currentUser.name,
      createdAt: new Date().toISOString(),
      color: generateColorFromName(currentUser.name)
    };

    if (existingNoteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = newNote;
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, newNote]);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out our collaborative note space: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!currentUser) return null;

  const userNote = notes.find(note => note.author === currentUser.name);

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <StickyNote className="mr-2" size={24} />
            One Note
          </h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">You: {currentUser.name}</span>
            <button
              onClick={shareToWhatsApp}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              title="Share to WhatsApp"
            >
              <Share2 size={18} />
            </button>
          </div>
        </header>
        <main>
          <div className="mb-6">
            <NoteForm
              currentUser={currentUser}
              onAddOrUpdateNote={addOrUpdateNote}
              existingNote={userNote}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                currentUser={currentUser}
                onDelete={deleteNote}
                onEdit={addOrUpdateNote}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;