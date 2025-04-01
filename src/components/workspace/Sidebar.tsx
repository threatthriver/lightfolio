
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import CreateMenu from '@/components/ui/CreateMenu';
import { Page } from '@/lib/types';
import { 
  PlusCircle, Search, ChevronDown, ChevronRight, FileText, MoreHorizontal, 
  Star, Plus, Calendar, Clock, Trash, Menu as MenuIcon, Settings, Home,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [collapsed, setCollapsed] = useState(false);
  const [pinnedExpanded, setPinnedExpanded] = useState(true);
  const [pagesExpanded, setPagesExpanded] = useState(true);
  const [quickMenuVisible, setQuickMenuVisible] = useState(false);
  const { toast } = useToast();
  const quickMenuRef = useRef<HTMLDivElement>(null);

  const filteredPages = searchQuery
    ? pages.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pages;

  const pinnedPages = filteredPages.filter(page => page.pinned);
  const unpinnedPages = filteredPages.filter(page => !page.pinned);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickMenuRef.current && !quickMenuRef.current.contains(event.target as Node)) {
        setQuickMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const togglePin = (pageId: string, isPinned: boolean) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      // This would be handled by the parent component
      // We'll just show a toast for now to demonstrate
      toast({
        title: isPinned ? "Page unpinned" : "Page pinned",
        description: `"${page.title}" has been ${isPinned ? "unpinned" : "pinned"}.`
      });
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name.charAt(0).toUpperCase();
  };

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';

  return (
    <div className={`h-screen flex flex-col border-r border-border bg-card transition-all duration-300 ${sidebarWidth}`}>
      {/* Sidebar Header */}
      <div className="p-3 flex items-center justify-between border-b border-border">
        {collapsed ? (
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      
      {/* Quick Create Button (only shown in collapsed state) */}
      {collapsed && (
        <div className="p-2 border-b border-border relative">
          <Button
            onClick={() => setQuickMenuVisible(!quickMenuVisible)}
            variant="ghost"
            size="icon"
            className="w-full"
          >
            <Plus className="h-5 w-5" />
          </Button>
          
          {quickMenuVisible && (
            <div 
              ref={quickMenuRef}
              className="absolute left-full ml-2 top-0 z-10 w-48 rounded-md shadow-lg bg-popover border border-border p-1"
            >
              <button
                className="w-full flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent"
                onClick={() => {
                  setIsCreateModalOpen(true);
                  setQuickMenuVisible(false);
                }}
              >
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>New Page</span>
              </button>
              <button
                className="w-full flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent"
                onClick={() => {
                  console.log('Create collection');
                  setQuickMenuVisible(false);
                }}
              >
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>New Collection</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Search */}
      {!collapsed && (
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
      )}
      
      {/* Main Navigation */}
      <div className="px-2 py-2 mb-2">
        <button 
          className={cn(
            "w-full flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent",
            "transition-colors"
          )}
        >
          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
          {!collapsed && <span>Home</span>}
        </button>
      </div>
      
      {/* Sidebar Content */}
      <ScrollArea className="flex-grow overflow-auto">
        <div className={`px-2 py-2 space-y-${collapsed ? '1' : '4'}`}>
          {/* Pinned Pages */}
          {pinnedPages.length > 0 && (
            <div className="mb-1">
              {!collapsed && (
                <div 
                  className="flex items-center text-xs text-muted-foreground font-medium mb-1 px-2 cursor-pointer"
                  onClick={() => setPinnedExpanded(!pinnedExpanded)}
                >
                  {pinnedExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                  <span>PINNED</span>
                </div>
              )}
              
              {(pinnedExpanded || collapsed) && (
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
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {!collapsed && (
                          <>
                            <span className="ml-2 flex-grow text-left truncate">{page.title}</span>
                            <Star className="h-3.5 w-3.5 text-primary opacity-100 flex-shrink-0" />
                          </>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          {/* Regular Pages */}
          <div>
            {!collapsed && (
              <div 
                className="flex items-center text-xs text-muted-foreground font-medium mb-1 px-2 cursor-pointer"
                onClick={() => setPagesExpanded(!pagesExpanded)}
              >
                {pagesExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                <span>PAGES</span>
              </div>
            )}
            
            {(pagesExpanded || collapsed) && (
              unpinnedPages.length > 0 ? (
                <ul className="space-y-1">
                  {unpinnedPages.map(page => (
                    <li key={page.id}>
                      <div className="relative group">
                        <button
                          className={cn(
                            "w-full flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent",
                            selectedPageId === page.id ? "bg-accent/50" : ""
                          )}
                          onClick={() => onSelectPage(page.id)}
                        >
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {!collapsed && (
                            <span className="ml-2 flex-grow text-left truncate">{page.title}</span>
                          )}
                        </button>
                        
                        {!collapsed && (
                          <div className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => togglePin(page.id, false)}>
                                  <Star className="h-4 w-4 mr-2" />
                                  <span>Pin</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>History</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="h-4 w-4 mr-2" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                !collapsed && (
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
                )
              )
            )}
          </div>
        </div>
      </ScrollArea>
      
      {/* Sidebar Footer */}
      <div className="mt-auto p-3 border-t border-border">
        {collapsed ? (
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(false)} className="w-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-accent text-muted-foreground">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex">
              <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
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
              autoFocus
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
