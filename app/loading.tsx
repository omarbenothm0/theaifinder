export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
      <p className="text-sm font-semibold text-slate-500 animate-pulse">
        Loading AI Tools Directory...
      </p>
    </div>
  );
}
