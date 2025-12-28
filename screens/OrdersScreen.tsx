import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Clock, Calendar, CheckCircle2, FileText, AlertCircle, Camera } from 'lucide-react';
import { Order, MOCK_ORDERS } from '../types';

const OrdersScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="flex h-full w-full flex-col bg-stone-50 dark:bg-stone-950">
      <header className="px-6 py-6 pt-12 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-white">Orders</h1>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
        {MOCK_ORDERS.map(order => (
          <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
        ))}
        {MOCK_ORDERS.length === 0 && (
            <div className="text-center py-20 text-stone-400">No active orders</div>
        )}
      </main>
    </div>
  );
};

const OrderCard: React.FC<{ order: Order; onClick: () => void }> = ({ order, onClick }) => {
  const isLive = order.status === 'live';
  return (
    <div onClick={onClick} className="bg-white dark:bg-stone-900 p-5 rounded-sm border border-stone-200 dark:border-stone-800 active:bg-stone-50 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium uppercase tracking-wide text-stone-400">{order.spaceType}</span>
        <StatusPill status={order.status} />
      </div>
      <h3 className="text-base font-medium text-stone-900 dark:text-white mb-1">{order.productType}</h3>
      <p className="text-sm text-stone-500 mb-4 truncate">{order.address}</p>
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {isLive ? `Ends ${order.removalDate}` : `Starts ${order.installDate}`}
        </span>
        <ChevronRight className="w-4 h-4 text-stone-300" />
      </div>
    </div>
  );
};

const OrderDetail = ({ order, onBack }: { order: Order; onBack: () => void }) => {
  return (
    <div className="flex h-full w-full flex-col bg-stone-50 dark:bg-stone-950">
      <header className="px-6 py-6 pt-12 border-b border-stone-200 dark:border-stone-800 flex items-center bg-white dark:bg-stone-900 sticky top-0 z-10">
        <button onClick={onBack} className="-ml-2 p-2 mr-2 text-stone-500">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="text-xs text-stone-400 uppercase tracking-wide">{order.id}</div>
          <h1 className="text-base font-medium text-stone-900 dark:text-white truncate pr-4">{order.address}</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-12">
        {/* Timeline Section */}
        <div className="bg-white dark:bg-stone-900 p-6 border-b border-stone-200 dark:border-stone-800">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-white mb-6">Status</h3>
          <Timeline status={order.status} />
        </div>

        {/* Key Dates */}
        <div className="p-6 grid grid-cols-2 gap-6 border-b border-stone-200 dark:border-stone-800">
            <div>
                <div className="text-xs text-stone-400 mb-1">Installation</div>
                <div className="text-sm font-medium text-stone-900 dark:text-white">{order.installDate}</div>
            </div>
            <div>
                <div className="text-xs text-stone-400 mb-1">Removal</div>
                <div className="text-sm font-medium text-stone-900 dark:text-white">{order.removalDate}</div>
            </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">
            <ActionButton icon={<Camera className="w-4 h-4" />} label="View install photos" />
            <ActionButton icon={<FileText className="w-4 h-4" />} label="Agreement & Documents" />
            <div className="pt-6">
                <button className="w-full py-4 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-sm transition-colors flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Report an issue
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

const Timeline = ({ status }: { status: string }) => {
    const steps = ['Submitted', 'Verified', 'Scheduled', 'Installed', 'Live'];
    const currentIdx = steps.findIndex(s => s.toLowerCase() === status.toLowerCase()) || 2; // Mock logic

    return (
        <div className="relative pl-2 space-y-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-800" />
            {steps.map((step, idx) => {
                const isComplete = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                return (
                    <div key={step} className="relative flex items-center gap-4">
                        <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white dark:bg-stone-900 ${isComplete ? 'border-stone-900 dark:border-stone-100' : 'border-stone-200 dark:border-stone-800'}`}>
                            {isComplete && <div className="w-2 h-2 rounded-full bg-stone-900 dark:bg-stone-100" />}
                        </div>
                        <span className={`text-sm ${isCurrent ? 'font-medium text-stone-900 dark:text-white' : 'text-stone-400'}`}>{step}</span>
                    </div>
                )
            })}
        </div>
    )
}

const ActionButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
        <div className="flex items-center gap-3 text-stone-900 dark:text-white">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-300" />
    </button>
)

const StatusPill = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    live: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    verified: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    submitted: 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${styles[status] || styles.submitted}`}>
      {status}
    </span>
  );
};

export default OrdersScreen;