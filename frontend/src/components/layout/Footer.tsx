export default function Footer() {
  return (
    <footer className="h-12 bg-white border-t flex items-center justify-center text-sm text-gray-500">
      © {new Date().getFullYear()} DashStack. All rights reserved.
    </footer>
  );
}