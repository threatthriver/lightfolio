
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/workspace/Sidebar';
import PageEditor from '@/components/workspace/PageEditor';
import CollectionView from '@/components/workspace/CollectionView';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Page, Collection, CollectionItem } from '@/lib/types';

// Mock data for initial state
const mockPages: Page[] = [
  {
    id: 'page-1',
    title: 'Getting Started',
    content: 'Welcome to Lightfolio! This is your first page. Start writing or create a new page from the sidebar.',
    createdAt: new Date(),
    updatedAt: new Date(),
    pinned: true,
  },
  {
    id: 'page-2',
    title: 'Project Ideas',
    content: 'Use this page to brainstorm your project ideas.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockCollection: Collection = {
  id: 'collection-1',
  name: 'Task Tracker',
  schema: {
    title: { type: 'text', name: 'Task' },
    status: { type: 'select', name: 'Status', options: ['To Do', 'In Progress', 'Done'] },
    priority: { type: 'select', name: 'Priority', options: ['Low', 'Medium', 'High'] },
    dueDate: { type: 'date', name: 'Due Date' },
    completed: { type: 'checkbox', name: 'Completed' },
  },
  viewType: 'table',
};

const mockCollectionItems: CollectionItem[] = [
  {
    id: 'item-1',
    collectionId: 'collection-1',
    properties: {
      title: 'Create project plan',
      status: 'To Do',
      priority: 'High',
      dueDate: '2023-06-15',
      completed: false,
    },
  },
  {
    id: 'item-2',
    collectionId: 'collection-1',
    properties: {
      title: 'Research competitors',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2023-06-10',
      completed: false,
    },
  },
  {
    id: 'item-3',
    collectionId: 'collection-1',
    properties: {
      title: 'Define MVP features',
      status: 'Done',
      priority: 'High',
      dueDate: '2023-06-01',
      completed: true,
    },
  },
];

// Types for content view
type ContentType = 'page' | 'collection';
type ContentView = {
  type: ContentType;
  id: string;
};

const WorkspaceContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [collections, setCollections] = useState<Collection[]>([mockCollection]);
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>(mockCollectionItems);
  const [currentView, setCurrentView] = useState<ContentView>({ type: 'page', id: 'page-1' });
  
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please log in to access the workspace",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast]);
  
  // Current content being viewed
  const currentPage = pages.find(page => page.id === currentView.id);
  const currentCollection = collections.find(col => col.id === currentView.id);
  const currentCollectionItems = collectionItems.filter(
    item => item.collectionId === currentView.id
  );
  
  // Handlers
  const handleCreatePage = (pageData: Partial<Page>) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: pageData.title || 'Untitled',
      content: pageData.content || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      pinned: pageData.pinned || false,
    };
    
    setPages(prev => [newPage, ...prev]);
    setCurrentView({ type: 'page', id: newPage.id });
    
    toast({
      title: "Page created",
      description: `"${newPage.title}" has been created successfully.`,
    });
  };
  
  const handleUpdatePage = (id: string, updates: Partial<Page>) => {
    setPages(prev => prev.map(page => {
      if (page.id === id) {
        return { ...page, ...updates, updatedAt: new Date() };
      }
      return page;
    }));
  };
  
  const handleCreateCollection = (collectionData: Partial<Collection>) => {
    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      name: collectionData.name || 'Untitled Database',
      schema: collectionData.schema || {
        title: { type: 'text', name: 'Title' },
        status: { type: 'select', name: 'Status', options: ['To Do', 'In Progress', 'Done'] },
      },
      viewType: collectionData.viewType || 'table',
    };
    
    setCollections(prev => [newCollection, ...prev]);
    setCurrentView({ type: 'collection', id: newCollection.id });
    
    toast({
      title: "Collection created",
      description: `"${newCollection.name}" has been created successfully.`,
    });
  };
  
  const handleUpdateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(prev => prev.map(collection => {
      if (collection.id === id) {
        return { ...collection, ...updates };
      }
      return collection;
    }));
  };
  
  const handleAddCollectionItem = (itemData: Partial<CollectionItem>) => {
    if (!itemData.collectionId) return;
    
    const newItem: CollectionItem = {
      id: `item-${Date.now()}`,
      collectionId: itemData.collectionId,
      properties: itemData.properties || {},
    };
    
    setCollectionItems(prev => [...prev, newItem]);
  };
  
  const handleUpdateCollectionItem = (id: string, updates: Partial<CollectionItem>) => {
    setCollectionItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };
  
  // Sidebar items combine pages and collections
  const sidebarItems = [...pages];
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        pages={sidebarItems}
        onCreatePage={handleCreatePage}
        onSelectPage={(id) => {
          // Determine if this is a page or collection
          const page = pages.find(p => p.id === id);
          if (page) {
            setCurrentView({ type: 'page', id });
          } else {
            setCurrentView({ type: 'collection', id });
          }
        }}
        selectedPageId={currentView.id}
      />
      
      <div className="flex-grow overflow-hidden">
        {currentView.type === 'page' && currentPage && (
          <PageEditor
            page={currentPage}
            onUpdate={handleUpdatePage}
          />
        )}
        
        {currentView.type === 'collection' && currentCollection && (
          <CollectionView
            collection={currentCollection}
            items={currentCollectionItems}
            onUpdateCollection={(updates) => handleUpdateCollection(currentCollection.id, updates)}
            onAddItem={handleAddCollectionItem}
            onUpdateItem={handleUpdateCollectionItem}
          />
        )}
      </div>
    </div>
  );
};

const Workspace = () => (
  <AuthProvider>
    <WorkspaceContent />
  </AuthProvider>
);

export default Workspace;
