import { Loader2 } from "lucide-react";

export default function AppLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-paper-dim">
        <Loader2 size={18} className="animate-spin text-ember" />
        Loading…
      </div>
    </div>
  );
}
