
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star, StarOff, MoreHorizontal } from 'lucide-react';

interface PageEditorProps {
  page: Page;
  onUpdate: (id: string, updates: Partial<Page>) => void;
}

const PageEditor = ({ page, onUpdate }: PageEditorProps) => {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [isPinned, setIsPinned] = useState(!!page.pinned);

  // Update local state when page prop changes
  useEffect(() => {
    setTitle(page.title);
    setContent(page.content);
    setIsPinned(!!page.pinned);
  }, [page]);

  // Update page when title or content changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Debounce update to reduce API calls
    const timeoutId = setTimeout(() => {
      onUpdate(page.id, { title: newTitle });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    // Debounce update to reduce API calls
    const timeoutId = setTimeout(() => {
      onUpdate(page.id, { content: newContent });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const togglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    onUpdate(page.id, { pinned: newPinnedState });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-3 border-b border-border flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePin}
          title={isPinned ? "Unpin page" : "Pin page"}
          className="mr-2"
        >
          {isPinned ? (
            <Star className="h-4 w-4 text-primary" />
          ) : (
            <StarOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
        
        <Input
          value={title}
          onChange={handleTitleChange}
          className="text-xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto"
          placeholder="Untitled"
        />
        
        <div className="ml-auto">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-grow p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <textarea
            value={content}
            onChange={handleContentChange}
            className={cn(
              "w-full min-h-[calc(100vh-180px)] resize-none border-none",
              "bg-transparent focus:outline-none",
              "text-foreground placeholder:text-muted-foreground"
            )}
            placeholder="Start writing here..."
          />
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
