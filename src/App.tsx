import { useState } from 'react';
import { ScreenId } from './types.ts';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { PassInventory } from './components/PassInventory.tsx';
import { QrVerification } from './components/QrVerification.tsx';
import { AllocationOptimizer } from './components/AllocationOptimizer.tsx';
import { EventConflicts } from './components/EventConflicts.tsx';
import { GroupBookings } from './components/GroupBookings.tsx';
import { PriorityQueue } from './components/PriorityQueue.tsx';
import { SellersDirectory } from './components/SellersDirectory.tsx';
import { CustomersDirectory } from './components/CustomersDirectory.tsx';
import { Reports } from './components/Reports.tsx';
import { Settings } from './components/Settings.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={(screen) => setCurrentScreen(screen)} />;

      case 'pass-inventory':
      case 'bookings':
        return <PassInventory />;

      case 'sellers':
        return (
          <SellersDirectory
            onNavigateToOptimizer={() => setCurrentScreen('allocation-optimizer')}
          />
        );

      case 'customers':
        return <CustomersDirectory />;

      case 'qr-verification':
      case 'fraud-detection':
        return <QrVerification />;

      case 'allocation-optimizer':
      case 'sales-intelligence':
        return <AllocationOptimizer />;

      case 'group-booking':
        return <GroupBookings />;

      case 'event-conflicts':
      case 'events':
        return <EventConflicts />;

      case 'performance':
        return <PriorityQueue />;

      case 'reports':
        return <Reports />;

      case 'settings':
        return <Settings />;

      default:
        return <Dashboard onNavigate={(screen) => setCurrentScreen(screen)} />;
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
