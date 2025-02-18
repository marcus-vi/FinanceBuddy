import { useState } from "react";
import { Home, Search, User, Settings, LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templates = [
  "Business Presentation",
  "Social Media Post",
  "Flyer Design",
  "Infographic",
  "Resume Template",
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
        <nav className="space-y-3">
          <Button variant="ghost" className="flex items-center gap-3">
            <Home size={20} /> Home
          </Button>
          <Button variant="ghost" className="flex items-center gap-3">
            <Search size={20} /> Explore
          </Button>
          <Button variant="ghost" className="flex items-center gap-3">
            <LayoutDashboard size={20} /> My Designs
          </Button>
          <Button variant="ghost" className="flex items-center gap-3">
            <User size={20} /> Profile
          </Button>
          <Button variant="ghost" className="flex items-center gap-3">
            <Settings size={20} /> Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Start a New Design</h2>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedTemplate(template)}
            >
              <CardContent className="p-5 text-center font-medium">
                {template}
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedTemplate && (
          <p className="mt-4 text-lg text-gray-700">
            You selected: {selectedTemplate}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;