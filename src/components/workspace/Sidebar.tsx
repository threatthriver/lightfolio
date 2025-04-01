
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import CreateMenu from '@/components/ui/CreateMenu';
import { Page } from '@/lib/types';
import { PlusCircle, Search, ChevronDown, ChevronRight, Hash, FileText, MoreHorizontal, Star, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SidebarProps {
  pages: Page[];
  onCreatePage: (page: Partial<Page>) => void;
  onSelectPage: (pageId: string) => void;
  selectedPageId?: string;
}

const Sidebar = ({ pages, onCreatePage, onSelectPage, selectedPageId }: SidebarProps) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');

  const filteredPages = searchQuery
    ? pages.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pages;

  const pinnedPages = filteredPages.filter(page => page.pinned);
  const unpinnedPages = filteredPages.filter(page => !page.pinned);

  const handleCreatePage = () => {
    setIsCreateModalOpen(false);
    if (newPageTitle.trim()) {
      onCreatePage({
        title: newPageTitle,
        content: '',
      });
      setNewPageTitle('');
    }
  };

  return (
    <div className="w-64 h-screen flex flex-col border-r border-border bg-card">
      <div className="p-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <span className="font-semibold ml-2 text-card-foreground">Lightfolio</span>
        </div>
        <CreateMenu 
          onCreatePage={() => setIsCreateModalOpen(true)}
          onCreateCollection={(viewType) => console.log('Create collection with view:', viewType)}
        />
      </div>
      
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-full pl-9 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-grow overflow-auto">
        <div className="px-3 py-2">
          {/* Pinned Pages */}
          {pinnedPages.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center text-xs text-muted-foreground font-medium mb-1 px-2">
                <ChevronDown className="h-4 w-4 mr-1" />
                <span>PINNED</span>
              </div>
              <ul className="space-y-1">
                {pinnedPages.map(page => (
                  <li key={page.id}>
                    <button
                      className={cn(
                        "w-full flex items-center px-2 py-1.5 text-sm rounded-md group hover:bg-accent",
                        selectedPageId === page.id ? "bg-accent/50" : ""
                      )}
                      onClick={() => onSelectPage(page.id)}
                    >
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="flex-grow text-left truncate">{page.title}</span>
                      <Star className="h-3.5 w-3.5 text-primary opacity-100 flex-shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Regular Pages */}
          <div>
            <div className="flex items-center text-xs text-muted-foreground font-medium mb-1 px-2">
              <ChevronDown className="h-4 w-4 mr-1" />
              <span>PAGES</span>
            </div>
            {unpinnedPages.length > 0 ? (
              <ul className="space-y-1">
                {unpinnedPages.map(page => (
                  <li key={page.id}>
                    <button
                      className={cn(
                        "w-full flex items-center px-2 py-1.5 text-sm rounded-md group hover:bg-accent",
                        selectedPageId === page.id ? "bg-accent/50" : ""
                      )}
                      onClick={() => onSelectPage(page.id)}
                    >
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="flex-grow text-left truncate">{page.title}</span>
                      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                        <button className="p-1 rounded-md hover:bg-accent-foreground/10">
                          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-3 text-center">
                <p className="text-sm text-muted-foreground mb-2">No pages found</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Page
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
      
      <div className="mt-auto p-3 border-t border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-2">
            <span className="text-sm font-medium">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Create Page Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a new page"
      >
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page title</Label>
            <Input
              id="title"
              placeholder="Untitled"
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePage}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
