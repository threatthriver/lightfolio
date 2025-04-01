
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, FileText, Database, CalendarDays, Table, KanbanSquare } from 'lucide-react';

interface CreateMenuProps {
  onCreatePage?: () => void;
  onCreateCollection?: (viewType: 'table' | 'board' | 'calendar') => void;
}

const CreateMenu = ({ onCreatePage, onCreateCollection }: CreateMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Plus className="h-4 w-4" />
          <span>New</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onCreatePage} className="gap-2">
          <FileText className="h-4 w-4" />
          <span>Page</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => onCreateCollection?.('table')}
          className="gap-2"
        >
          <Table className="h-4 w-4" />
          <span>Table</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => onCreateCollection?.('board')}
          className="gap-2"
        >
          <KanbanSquare className="h-4 w-4" />
          <span>Board</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => onCreateCollection?.('calendar')}
          className="gap-2"
        >
          <CalendarDays className="h-4 w-4" />
          <span>Calendar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateMenu;
