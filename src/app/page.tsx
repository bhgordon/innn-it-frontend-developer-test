import { UpdateModal } from "@/components/UpdateModal";

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-y-auto bg-black/50 p-4">
      <div className="flex min-h-full items-center justify-center">
        <UpdateModal />
      </div>
    </main>
  );
}
