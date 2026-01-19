import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "Sorry, the page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "The requested page was not found.",
    url: "https://notehub-hw.vercel.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Not Found</h1>
      <p>This page strictly does not exist.</p>
      <Link href="/notes/filter/all">Back to Home</Link>
    </div>
  );
}
