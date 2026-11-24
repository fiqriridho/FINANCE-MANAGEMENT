export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <p>
          Finance Management &copy; {new Date().getFullYear()} &bull; TaskFlow Architecture Blueprint
        </p>
      </div>
    </footer>
  );
}
