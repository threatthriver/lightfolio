import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/workspace/Sidebar';
import PageEditor from '@/components/workspace/PageEditor';
import CollectionView from '@/components/workspace/CollectionView';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Page, Collection, CollectionItem } from '@/lib/types';

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

type ContentType = 'page' | 'collection';
type ContentView = {
  type: ContentType;
  id: string;
};

const Workspace = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [collections, setCollections] = useState<Collection[]>([mockCollection]);
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>(mockCollectionItems);
  const [currentView, setCurrentView] = useState<ContentView>({ type: 'page', id: 'page-1' });
  
  useEffect(() => {
    if (!isLoading && !user) {
      console.log("No user detected in Workspace, redirecting to home");
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please log in to access the workspace",
        variant: "destructive",
      });
    } else if (user) {
      console.log("User authenticated in Workspace:", user.id);
    }
  }, [user, isLoading, navigate, toast]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-lg text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!user && !isLoading) {
    return null;
  }
  
  const currentPage = pages.find(page => page.id === currentView.id);
  const currentCollection = collections.find(col => col.id === currentView.id);
  const currentCollectionItems = collectionItems.filter(
    item => item.collectionId === currentView.id
  );
  
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
  
  const sidebarItems = [...pages];
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        pages={sidebarItems}
        onCreatePage={handleCreatePage}
        onSelectPage={(id) => {
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

export default Workspace;
