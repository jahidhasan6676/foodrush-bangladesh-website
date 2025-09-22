import React from 'react';

const ShopList = () => {
    const recentOrders = [
  {
    id: '#1001',
    customer: 'John Doe',
    item: 'Burger Combo',
    status: 'Delivered',
    amount: '$25.99',
    date: '2025-09-18',
  },
  {
    id: '#1002',
    customer: 'Jane Smith',
    item: 'Pizza Margherita',
    status: 'Pending',
    amount: '$18.50',
    date: '2025-09-19',
  },
  {
    id: '#1003',
    customer: 'Mike Johnson',
    item: 'Salad Bowl',
    status: 'Delivered',
    amount: '$12.99',
    date: '2025-09-19',
  },
  {
    id: '#1004',
    customer: 'Sarah Wilson',
    item: 'Fried Rice',
    status: 'Cancelled',
    amount: '$15.00',
    date: '2025-09-18',
  },
  {
    id: '#1005',
    customer: 'Tom Brown',
    item: 'Tacos',
    status: 'Delivered',
    amount: '$22.50',
    date: '2025-09-19',
  },
];
    return (
          <div className='w-11/12 mx-auto py-10'>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Item
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-indigo-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.item}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <button className="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors">
                        View All Orders →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopList;