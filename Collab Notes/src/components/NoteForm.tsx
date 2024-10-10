import React, { useState, useEffect } from 'react';
import { User, Note } from '../types';

interface NoteFormProps {
  currentUser: User;
  onAddOrUpdateNote: (content: string) => void;
  existingNote: Note | undefined;
}

const NoteForm: React.FC<NoteFormProps> = ({ currentUser, onAddOrUpdateNote, existingNote }) => {
  const [content, setContent] = useState(existingNote?.content || '');

  useEffect(() => {
    if (existingNote) {
      setContent(existingNote.content);
    }
  }, [existingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddOrUpdateNote(content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {existingNote ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;