"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import { LayoutDashboard, ShoppingBag, Users, Package, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: <TrendingUp size={20} />, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Total Orders', value: '42', icon: <ShoppingBag size={20} />, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Active Users', value: '1,204', icon: <Users size={20} />, color: 'bg-purple-500/10 text-purple-500' },
    { label: 'In Stock', value: '85', icon: <Package size={20} />, color: 'bg-amber-500/10 text-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-widest uppercase">Admin Control</h1>
            <p className="text-xs opacity-40 font-display tracking-[0.3em] mt-2 uppercase">Orbit 360 Dashboard v1.0</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-white text-black font-display font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-opacity-90 transition-all rounded-full">Add Product</button>
            <button className="px-8 py-3 border border-white/20 font-display uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all rounded-full">Settings</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 p-8 rounded-[30px] flex items-center space-x-6 hover:border-white/20 transition-all group">
              <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-display mb-1">{stat.label}</p>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm">Recent Orders</h3>
            <button className="text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-display border-b border-white/5">
                  <th className="px-8 py-6">Order ID</th>
                  <th className="px-8 py-6">Product</th>
                  <th className="px-8 py-6">Customer</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-display text-sm tracking-widest">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-8 py-6">#ORD-90{i}</td>
                    <td className="px-8 py-6 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10" />
                      <span className="group-hover:text-white transition-colors">Phantom {i}</span>
                    </td>
                    <td className="px-8 py-6 opacity-60">Customer {i}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] opacity-80">Processing</span>
                    </td>
                    <td className="px-8 py-6 font-bold">$349</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
