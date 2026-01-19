import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug[0] || "All";
  const formattedFilter =
    filterName.charAt(0).toUpperCase() + filterName.slice(1);

  return {
    title: `Notes: ${formattedFilter} | NoteHub`,
    description: `Explore all your ${formattedFilter} notes in one place.`,
    openGraph: {
      title: `Notes: ${formattedFilter} | NoteHub`,
      description: `Manage and view your ${formattedFilter} notes.`,
      url: `https://notehub-hw.vercel.app/notes/filter/${filterName}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function MainNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugValue = slug?.[0];

  const activeTag = slugValue === "all" || !slugValue ? undefined : slugValue;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotes(1, "", activeTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={css.app}>
        <NotesClient activeTag={activeTag} />
      </div>
    </HydrationBoundary>
  );
}
