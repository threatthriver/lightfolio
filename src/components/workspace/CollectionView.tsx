
import { useState } from 'react';
import { Collection, CollectionItem, ViewType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, KanbanSquare, CalendarDays, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollectionViewProps {
  collection: Collection;
  items: CollectionItem[];
  onUpdateCollection: (updates: Partial<Collection>) => void;
  onAddItem: (item: Partial<CollectionItem>) => void;
  onUpdateItem: (id: string, updates: Partial<CollectionItem>) => void;
}

const CollectionView = ({ collection, items, onUpdateCollection, onAddItem, onUpdateItem }: CollectionViewProps) => {
  const [name, setName] = useState(collection.name);
  const [viewType, setViewType] = useState<ViewType>(collection.viewType);

  const changeViewType = (type: ViewType) => {
    setViewType(type);
    onUpdateCollection({ viewType: type });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    // Debounce update
    const timeoutId = setTimeout(() => {
      onUpdateCollection({ name: newName });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const renderViewSwitch = () => (
    <div className="flex items-center border rounded-md p-0.5 bg-card">
      <Button
        variant={viewType === 'table' ? 'secondary' : 'ghost'}
        size="sm"
        className="px-2.5 h-8"
        onClick={() => changeViewType('table')}
      >
        <Table className="h-4 w-4 mr-1" />
        <span className="text-xs">Table</span>
      </Button>
      <Button
        variant={viewType === 'board' ? 'secondary' : 'ghost'}
        size="sm"
        className="px-2.5 h-8"
        onClick={() => changeViewType('board')}
      >
        <KanbanSquare className="h-4 w-4 mr-1" />
        <span className="text-xs">Board</span>
      </Button>
      <Button
        variant={viewType === 'calendar' ? 'secondary' : 'ghost'}
        size="sm"
        className="px-2.5 h-8"
        onClick={() => changeViewType('calendar')}
      >
        <CalendarDays className="h-4 w-4 mr-1" />
        <span className="text-xs">Calendar</span>
      </Button>
      <Button
        variant={viewType === 'list' ? 'secondary' : 'ghost'}
        size="sm"
        className="px-2.5 h-8"
        onClick={() => changeViewType('list')}
      >
        <List className="h-4 w-4 mr-1" />
        <span className="text-xs">List</span>
      </Button>
    </div>
  );

  const renderTableView = () => {
    const schemaKeys = Object.keys(collection.schema);
    
    return (
      <div className="w-full overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              {schemaKeys.map(key => (
                <th key={key} className="px-4 py-2 text-sm font-medium text-left border-b border-border">
                  {collection.schema[key].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="hover:bg-muted/30">
                {schemaKeys.map(key => (
                  <td key={`${item.id}-${key}`} className="px-4 py-2 text-sm border-b border-border">
                    {renderCellContent(item, key)}
                  </td>
                ))}
              </tr>
            ))}
            {/* Empty row for new item */}
            <tr>
              {schemaKeys.map((key, index) => (
                <td key={`new-item-${key}`} className="px-4 py-2 text-sm border-b border-border">
                  {index === 0 ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground"
                      onClick={() => onAddItem({ collectionId: collection.id, properties: {} })}
                    >
                      + New
                    </Button>
                  ) : null}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderBoardView = () => {
    // Find the status field for grouping
    const statusKey = Object.keys(collection.schema).find(
      key => collection.schema[key].type === 'select'
    );
    
    if (!statusKey) {
      return (
        <div className="p-4 text-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Board view needs a Select field to group items.</p>
        </div>
      );
    }
    
    // Get all possible status values
    const statusField = collection.schema[statusKey];
    const statuses = statusField.options || ['To Do', 'In Progress', 'Done'];
    
    return (
      <div className="flex gap-4 overflow-x-auto p-2">
        {statuses.map(status => {
          const statusItems = items.filter(
            item => item.properties[statusKey] === status
          );
          
          return (
            <div key={status} className="flex-shrink-0 w-72">
              <div className="bg-muted/30 rounded-md p-2">
                <h3 className="font-medium px-2 py-1 mb-2">{status}</h3>
                <div className="space-y-2">
                  {statusItems.map(item => (
                    <div key={item.id} className="bg-card rounded-md p-3 border border-border shadow-sm">
                      {/* Show the first text field as the card title */}
                      {Object.keys(collection.schema)
                        .filter(key => collection.schema[key].type === 'text')
                        .slice(0, 1)
                        .map(key => (
                          <div key={key} className="font-medium">
                            {item.properties[key] || 'Untitled'}
                          </div>
                        ))
                      }
                      {/* Show other fields */}
                      <div className="mt-2 space-y-1">
                        {Object.keys(collection.schema)
                          .filter(key => key !== statusKey && collection.schema[key].type !== 'text')
                          .map(key => (
                            <div key={key} className="flex items-center text-xs">
                              <span className="text-muted-foreground mr-2">{collection.schema[key].name}:</span>
                              <span>{item.properties[key] || '-'}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-muted-foreground"
                    onClick={() => onAddItem({ 
                      collectionId: collection.id, 
                      properties: { [statusKey]: status } 
                    })}
                  >
                    + Add item
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="space-y-1 p-2">
        {items.map(item => {
          // Find the title field (first text field)
          const titleKey = Object.keys(collection.schema).find(
            key => collection.schema[key].type === 'text'
          );
          
          const title = titleKey ? (item.properties[titleKey] || 'Untitled') : 'Untitled';
          
          return (
            <div key={item.id} className="flex items-center p-2 rounded-md hover:bg-muted/30">
              <span className="flex-grow">{title}</span>
            </div>
          );
        })}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-muted-foreground mt-2"
          onClick={() => onAddItem({ collectionId: collection.id, properties: {} })}
        >
          + Add item
        </Button>
      </div>
    );
  };

  const renderCalendarView = () => {
    return (
      <div className="p-4 text-center bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Calendar view is coming soon.</p>
      </div>
    );
  };

  const renderCellContent = (item: CollectionItem, key: string) => {
    const value = item.properties[key];
    const schemaItem = collection.schema[key];
    
    switch (schemaItem.type) {
      case 'checkbox':
        return value ? '✓' : '○';
      case 'select':
        return (
          <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
            {value || 'Not set'}
          </span>
        );
      default:
        return value || '';
    }
  };

  const renderViewContent = () => {
    switch (viewType) {
      case 'table':
        return renderTableView();
      case 'board':
        return renderBoardView();
      case 'list':
        return renderListView();
      case 'calendar':
        return renderCalendarView();
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-3 border-b border-border flex items-center">
        <Input
          value={name}
          onChange={handleNameChange}
          className="text-xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto max-w-xs"
          placeholder="Untitled Database"
        />
        
        <div className="ml-auto flex items-center space-x-2">
          {renderViewSwitch()}
        </div>
      </div>
      
      <div className={cn(
        "flex-grow overflow-auto p-4",
        viewType === 'board' ? 'pb-16' : 'p-4'
      )}>
        {renderViewContent()}
      </div>
    </div>
  );
};

export default CollectionView;
