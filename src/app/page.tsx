import { UpdateModal } from "@/components/UpdateModal";

export default function Home() {
  return (
    <main className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <UpdateModal />
    </main>
  );
}
