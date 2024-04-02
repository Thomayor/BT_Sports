import React, { useState, FormEvent } from 'react';

interface SendMessageModalProps {
  onClose: () => void;
  onSubmit: (data: { content: string }) => void;
}

export default function SendMessageModal({
  onClose,
  onSubmit,
}: SendMessageModalProps) {
  const [content, setContent] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ content });
    setContent('');
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 min-h-screen">
      <div className="bg-white p-8 rounded-md  sm:w-3/6">
        <h2 className="text-2xl font-semibold mb-4">Composez votre message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              Message:
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                rows={4}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-sky-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-secondary"
          >
            Envoyer
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Fermer
          </button>
        </form>
      </div>
    </div>
  );
}
