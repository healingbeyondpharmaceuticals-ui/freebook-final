import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { VirtualizedNewsFeed } from './VirtualizedNewsFeed';
import { MessagingSystem } from './MessagingSystem';
import { GroupsManager } from './GroupsManager';
import { CreatePost } from './CreatePost';
import { AdManager } from './AdManager';
import { useAuth } from '@/contexts/AuthContext';

import { Dialog, DialogContent } from './ui/dialog';
export const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showAdManager, setShowAdManager] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessagingSystem />;
      case 'groups':
        return <GroupsManager />;
      case 'create':
        return <CreatePost />;
      default:
        return <VirtualizedNewsFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onAdvertiseClick={() => setShowAdManager(true)} />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onAdvertiseClick={() => setShowAdManager(true)}
        />
        
        <main className="flex-1 max-w-4xl mx-auto">
          {renderContent()}
        </main>
        
        <RightPanel />
      </div>
      
      {/* Ad Manager Modal */}
      <Dialog open={showAdManager} onOpenChange={setShowAdManager}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
          <AdManager />
        </DialogContent>
      </Dialog>
      

    </div>
  );
};

export default AppLayout;