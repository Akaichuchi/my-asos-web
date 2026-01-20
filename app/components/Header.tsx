export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 h-14">
        <h1 className="text-2xl font-bold tracking-tighter">ASOS</h1>
        <div className="flex gap-4">
          <span className="text-sm font-medium">NAM</span>
          <span className="text-sm font-medium text-gray-400">NỮ</span>
        </div>
      </div>
    </header>
  );
}