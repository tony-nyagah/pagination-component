import { useState, useMemo } from "react";
import { Pagination } from "./components/Pagination";
import { CodeBlock } from "./components/CodeBlock";

// Generate 50 dummy records
const DUMMY_DATA = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  name: `System User ${i + 1}`,
  role: i % 3 === 0 ? "Admin" : "Developer",
  status: i % 5 === 0 ? "Offline" : "Active",
}));

const explanationCode = `ARCHITECTURE & LOGIC SUMMARY

1. State Management
   - The parent component owns the currentPage state.
   - Slices the data array using: start = (page - 1) * size.

2. Ellipsis Logic
   - Renders neighbors around the current page.
   - Bookends with ellipses when far from the edges.

3. Accessibility
   - Keyboard navigation via onKeyDown (Left/Right arrows).
   - aria-current and aria-disabled attributes standard.`;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const total = DUMMY_DATA.length;

  // Calculate the slice of data to show based on the current page
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return DUMMY_DATA.slice(start, end);
  }, [currentPage, pageSize]);

  return (
    <div className="min-h-screen bg-pink-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase tracking-tight">
            Access Logs
          </h1>
        </div>

        {/* Data Table */}
        <div className="bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cyan-300 border-b-4 border-black text-lg">
                <th className="p-4 border-r-4 border-black font-black">ID</th>
                <th className="p-4 border-r-4 border-black font-black">Name</th>
                <th className="p-4 border-r-4 border-black font-black">Role</th>
                <th className="p-4 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-2 border-black last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4 border-r-2 border-black font-bold">
                    #{row.id}
                  </td>
                  <td className="p-4 border-r-2 border-black">{row.name}</td>
                  <td className="p-4 border-r-2 border-black">
                    <span
                      className={`px-2 py-1 text-sm font-bold border-2 border-black ${row.role === "Admin" ? "bg-pink-300" : "bg-green-300"}`}
                    >
                      {row.role}
                    </span>
                  </td>
                  <td className="p-4 font-bold">
                    {row.status === "Active" ? "🟢 Active" : "🔴 Offline"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Container */}
        <div className="flex justify-between items-center bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <p className="font-bold text-lg">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, total)} of {total}
          </p>
          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </div>

        <CodeBlock code={explanationCode} language="plaintext" />
      </div>
    </div>
  );
}
