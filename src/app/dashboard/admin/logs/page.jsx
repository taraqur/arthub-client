"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logs`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Review system changes and administrative actions.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden p-6">
        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No audit logs found.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log._id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-900">{log.action}</h4>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Admin <span className="font-semibold text-gray-900">{log.adminName || log.adminId}</span> performed an action on <span className="font-semibold text-gray-900">{log.targetModel}</span>.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-700 font-mono">
                    {log.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
