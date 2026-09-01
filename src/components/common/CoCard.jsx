export default function CoCard({
  children,
  className = "",
  title,
  action,
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          {title && (
            <h2 className="text-base font-semibold text-slate-800">
              {title}
            </h2>
          )}

          {action && <div>{action}</div>}
        </div>
      )}

      <div className="p-5">{children}</div>
    </section>
  );
}