import InteractionClient from "./InteractionClient";
import { Suspense } from "react";

export async function generateStaticParams() {
  return [{ projectId: "h" }];
}

export default function VaultPage() {
  return (
    <Suspense>
      <InteractionClient />
    </Suspense>
  );
}
