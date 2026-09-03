import React from "react";

const EvaluationSidePanel = ({ criteria, gradingScale }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 text-lg mb-3">Evaluation Criteria</h2>
        {criteria.map((item) => (
          <div key={item.id} className="py-2 border-b border-gray-50 last:border-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <span className="text-xs text-gray-500">{item.weight}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 text-lg mb-3">Grading Scale</h2>
        {gradingScale.map((row) => (
          <div key={row.grade} className="flex items-center gap-3 py-1.5">
            <span className={`w-6 h-6 rounded-full ${row.color} text-white text-[10px] font-bold flex items-center justify-center`}>
              {row.grade}
            </span>
            <span className="text-sm text-gray-700 w-16">{row.range}</span>
            <span className="text-sm text-gray-500">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EvaluationSidePanel;