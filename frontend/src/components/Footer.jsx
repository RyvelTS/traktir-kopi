export default function Footer() {
  return (
    <footer className="flex justify-center py-4">
      <p>
        © {new Date().getFullYear()} TraktirKopi. Built with Golang, React,
        PostgreSQL & Midtrans.
      </p>
    </footer>
  );
}
