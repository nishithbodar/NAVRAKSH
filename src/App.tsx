import { useState } from 'react';
import { ScreenId } from './types.ts';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { DsaVisualizer } from './components/DsaVisualizer.tsx';
import { AllocationOptimizer } from './components/AllocationOptimizer.tsx';
import { QrVerification } from './components/QrVerification.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { PassInventory } from './components/PassInventory.tsx';
import { EventConflicts } from './components/EventConflicts.tsx';
import { Reports } from './components/Reports.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dsa-visualizer');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dsa-visualizer':
      case 'algorithm-engine':
      case 'complexity-analyzer':
      case 'benchmark-lab':
        return <DsaVisualizer />;

      case 'allocation-optimizer':
      case 'sales-intelligence':
      case 'performance':
        return <AllocationOptimizer />;

      case 'reports':
        return <Reports />;

      case 'qr-verification':
      case 'fraud-detection':
        return <QrVerification />;

      case 'dashboard':
      case 'sellers':
      case 'customers':
      case 'events':
        return <Dashboard onNavigate={(screen) => setCurrentScreen(screen)} />;

      case 'pass-inventory':
      case 'bookings':
        return <PassInventory />;

      case 'event-conflicts':
      case 'group-booking':
      case 'settings':
        return <EventConflicts />;

      default:
        return <DsaVisualizer />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-h-screen w-full">
        <Header
          onToggleMobile={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="w-full pt-16 bg-background flex-1">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
