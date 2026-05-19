import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { DrizzleLedgerRepository } from "@/core/ledger/infrastructure/drizzle-ledger.repository";
import { GetLedger } from "@/core/ledger/application/get-ledger";
import { SetupLedgerClient } from "./components/setup-ledger-client";

export default async function SetupLedgerPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const ledgers = await new GetLedger({
    repository: new DrizzleLedgerRepository(),
  }).byUserId(session.user.id);

  if (ledgers.length > 0) redirect("/dashboard");

  return <SetupLedgerClient defaultName={session.user.name} />;
}
