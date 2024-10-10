import React from 'react';
import { Trash2 } from 'lucide-react';
import { Note, User } from '../types';

interface NoteItemProps {
  note: Note;
  currentUser: User;
  onDelete: (id: string) => void;
  onEdit: (content: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, currentUser, onDelete, onEdit }) => {
  const isOwner = currentUser.name === note.author;

  return (
    <div
      className="p-4 rounded-md shadow-md relative overflow-hidden h-full flex flex-col"
      style={{ backgroundColor: note.color }}
    >
      <p className="mb-2 text-white flex-grow">{note.content}</p>
      <div className="flex justify-between items-center text-sm text-white mt-2">
        <span>{note.author}</span>
        <span>{new Date(note.createdAt).toLocaleString()}</span>
      </div>
      {isOwner && (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onDelete(note.id)}
            className="text-white hover:text-red-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteItem;