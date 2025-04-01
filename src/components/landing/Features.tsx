
import { FileText, Database, CalendarDays, Layers, Users, Lock } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard = ({ icon, title, description, delay = '0ms' }: FeatureCardProps) => (
  <div 
    className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-200 animate-fade-in" 
    style={{ animationDelay: delay }}
  >
    <div className="p-2 rounded-lg bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need in one place</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lightfolio combines documents, wikis, and planning tools in one connected workspace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText size={24} />}
            title="Rich Document Editor"
            description="Create beautiful, functional documents with our powerful editor that supports markdown, code blocks, and embeds."
            delay="100ms"
          />
          
          <FeatureCard
            icon={<Database size={24} />}
            title="Flexible Databases"
            description="Organize information your way with customizable databases that can be viewed as tables, boards, lists, or calendars."
            delay="200ms"
          />
          
          <FeatureCard
            icon={<CalendarDays size={24} />}
            title="Calendar View"
            description="Plan your schedule and visualize time-based information with our intuitive calendar integration."
            delay="300ms"
          />
          
          <FeatureCard
            icon={<Layers size={24} />}
            title="Hierarchical Organization"
            description="Nest pages within pages to create a logical structure that grows with your knowledge base."
            delay="400ms"
          />
          
          <FeatureCard
            icon={<Users size={24} />}
            title="Collaboration Ready"
            description="Share your workspace with team members and collaborate in real-time on shared documents and databases."
            delay="500ms"
          />
          
          <FeatureCard
            icon={<Lock size={24} />}
            title="Secure & Private"
            description="Your data is safe with end-to-end encryption and granular permission controls for shared content."
            delay="600ms"
          />
        </div>
        
        {/* Feature Preview */}
        <div className="mt-20 bg-background rounded-xl border border-border p-6 md:p-8 overflow-hidden shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">See Lightfolio in action</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore how Lightfolio's flexible interface adapts to your workflow
            </p>
          </div>
          
          <div className="relative aspect-video bg-accent/30 rounded-lg">
            {/* App interface mockup */}
            <div className="absolute inset-0 flex flex-col p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <Database className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Project Tracker</span>
              </div>
              
              <div className="flex border-b border-border mb-4">
                <div className="px-4 py-2 border-b-2 border-primary font-medium">Table View</div>
                <div className="px-4 py-2 text-muted-foreground">Board View</div>
                <div className="px-4 py-2 text-muted-foreground">Calendar</div>
              </div>
              
              <div className="flex-1 grid grid-cols-4 gap-2 opacity-80">
                <div className="col-span-1 p-2 bg-background border border-border rounded">Title</div>
                <div className="col-span-1 p-2 bg-background border border-border rounded">Status</div>
                <div className="col-span-1 p-2 bg-background border border-border rounded">Priority</div>
                <div className="col-span-1 p-2 bg-background border border-border rounded">Due Date</div>
                
                {/* Table rows */}
                {[1, 2, 3, 4].map((row) => (
                  <React.Fragment key={row}>
                    <div className="col-span-1 p-2 bg-card border border-border/50 rounded">Task {row}</div>
                    <div className="col-span-1 p-2 bg-card border border-border/50 rounded">
                      <div className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full w-fit">
                        In Progress
                      </div>
                    </div>
                    <div className="col-span-1 p-2 bg-card border border-border/50 rounded">Medium</div>
                    <div className="col-span-1 p-2 bg-card border border-border/50 rounded">Next Week</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
