import { useCallback, memo } from 'react';
import { FileData } from '../types/FileTypes'; // Corrected import
import { Plus, X, FileText, Eye } from 'lucide-react';
import CopyButton from './CopyButton';

interface FileCardComponentProps {
  file: FileData;
  isSelected: boolean;
  toggleSelection: (path: string) => void;
  onPreview: (filePath: string) => void; // Add onPreview prop
}

const FileCard = ({ file, isSelected, toggleSelection, onPreview }: FileCardComponentProps) => {
  const { name, path: filePath, tokenCount } = file;

  // Format token count for display
  const formattedTokens = tokenCount.toLocaleString();

  // Memoize event handlers to prevent unnecessary re-renders
  const handleToggleSelection = useCallback(() => {
    toggleSelection(filePath);
  }, [toggleSelection, filePath]);

  const handlePreview = useCallback(() => {
    onPreview(filePath);
  }, [onPreview, filePath]);

  return (
    <div className={`file-card ${isSelected ? 'selected' : ''}`}>
      <div className="file-card-header">
        <div className="file-card-icon">
          <FileText size={16} />
        </div>
        <div className="file-card-name monospace">{name}</div>
      </div>
      <div className="file-card-info">
        <div className="file-card-tokens">~{formattedTokens} tokens</div>
      </div>

      <div className="file-card-actions">
        <button
          className="file-card-action"
          onClick={handleToggleSelection}
          title={isSelected ? 'Remove from selection' : 'Add to selection'}
        >
          {isSelected ? <X size={16} /> : <Plus size={16} />}
        </button>
        <button className="file-card-action" onClick={handlePreview} title="Preview File">
          <Eye size={16} />
        </button>
        <CopyButton text={file.content} className="file-card-action">
          {''}
        </CopyButton>
      </div>
    </div>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
export default memo(FileCard);
