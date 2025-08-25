'use client';

import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import Button from '@/components/common/Button';
import { validateNotes } from '@/utils/validation';

interface NoteEditorProps {
  initialNotes: string;
  onSave: (notes: string) => Promise<void>;
  onCancel: () => void;
  maxLength?: number;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  initialNotes,
  onSave,
  onCancel,
  maxLength = 5000,
}) => {
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const validation = validateNotes(notes);
    
    if (!validation.valid) {
      setError(validation.errors[0]);
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await onSave(notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    setError(null);
  };

  const remainingChars = maxLength - notes.length;

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="notes" className="block text-lg font-cinzel font-semibold text-lunar-glow mb-3">
          Your Reflections
        </label>
        <p className="text-lunar-glow opacity-70 text-sm mb-4">
          Capture your thoughts, feelings, and insights about today's card. What resonates with you?
        </p>
        
        <textarea
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="What does this card mean to you today? How does it relate to your current situation or mindset?"
          className="input w-full min-h-[200px] resize-y"
          maxLength={maxLength}
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm">
            {error && (
              <span className="text-crimson-stain">{error}</span>
            )}
          </div>
          <div className="text-sm text-lunar-glow opacity-70">
            {remainingChars} characters remaining
          </div>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="card bg-opacity-30">
        <h4 className="text-lg font-cinzel font-semibold text-astral-gold mb-3">
          Reflection Prompts
        </h4>
        <ul className="text-sm text-lunar-glow opacity-80 space-y-1">
          <li>• How does this card relate to your current situation?</li>
          <li>• What emotions or thoughts does it evoke?</li>
          <li>• What action or mindset might this card be suggesting?</li>
          <li>• Does this card remind you of any recent events or decisions?</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={saving}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          loading={saving}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Notes
        </Button>
      </div>
    </div>
  );
};

export default NoteEditor;