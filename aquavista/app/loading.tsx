export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a1128] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#c9a66b]/20 border-t-[#c9a66b] animate-spin" />
        <span className="text-[#c9a66b]/50 text-xs uppercase tracking-widest">Loading</span>
      </div>
    </div>
  );
}
