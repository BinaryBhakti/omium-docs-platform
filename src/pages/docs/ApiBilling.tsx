import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MethodBadge } from "../../components/MethodBadge";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { CreditCard, LayoutDashboard } from "lucide-react";

const toc = [
  { id: "endpoints", label: "Endpoints", depth: 2 as const },
  { id: "balance", label: "Balance", depth: 2 as const },
  { id: "transactions", label: "Transactions", depth: 2 as const },
  { id: "topup", label: "Top-up", depth: 2 as const },
  { id: "subscription", label: "Subscription management", depth: 2 as const },
];

export function ApiBilling() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Billing" },
      ]}
      eyebrow="REST API"
      title="Billing"
      description="Balances, usage, and subscription-related HTTP endpoints."
      toc={toc}
      complexity="intermediate"
      etaMinutes={5}
      prev={{ label: "Failures", to: "/docs/api/failures" }}
      next={{ label: "Python SDK", to: "/docs/sdk/python-sdk" }}
    >
      <p>
        Base URL: <code>https://api.omium.ai/api/v1</code>. Send your API key
        as <code>X-API-Key</code> or as a Bearer token.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <MdxTable
        head={["Method", "Path", "What it does"]}
        rows={[
          [<code>GET</code>, <code>/billing/balance</code>, "Current credit balance"],
          [<code>POST</code>, <code>/billing/topup</code>, "Initiate a top-up (Stripe)"],
          [<code>GET</code>, <code>/billing/transactions</code>, "Transaction history"],
          [<code>POST</code>, <code>/billing/subscriptions/create-checkout</code>, "Subscription checkout"],
          [<code>GET</code>, <code>/billing/subscriptions/status</code>, "Subscription status"],
          [<code>POST</code>, <code>/billing/subscriptions/portal</code>, "Customer portal session"],
          [<code>POST</code>, <code>/billing/subscriptions/cancel</code>, "Cancel subscription"],
        ]}
      />

      <h2 id="balance">Balance</h2>
      <Endpoint method="GET" path="/billing/balance" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/billing/balance" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />
      <CodeBlock
        lang="json"
        filename="response"
        code={`{
  "credits_balance": 10000,
  "balance_usd": 100.0
}`}
      />

      <h2 id="transactions">Transactions</h2>
      <Endpoint method="GET" path="/billing/transactions" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/billing/transactions?page=1&page_size=50" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="topup">Top-up</h2>
      <Endpoint method="POST" path="/billing/topup" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/billing/topup" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "amount_cents": 2000 }'`}
      />

      <h2 id="subscription">Subscription management</h2>
      <p>
        These endpoints are typically used by the dashboard. If you're
        building your own billing UI, start with checkout + portal.
      </p>
      <ul>
        <li>
          <code>POST /billing/subscriptions/create-checkout</code>
        </li>
        <li>
          <code>GET /billing/subscriptions/status</code>
        </li>
        <li>
          <code>POST /billing/subscriptions/portal</code>
        </li>
        <li>
          <code>POST /billing/subscriptions/cancel</code>
        </li>
      </ul>

      <DocCardGrid>
        <DocCard
          title="API keys & billing"
          description="Manage keys and review usage in the dashboard."
          to="/docs/platform/api-keys-billing"
          icon={CreditCard}
        />
        <DocCard
          title="Automations"
          description="See per-run cost and health."
          to="/docs/platform/automations"
          icon={LayoutDashboard}
        />
      </DocCardGrid>
    </DocLayout>
  );
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="not-prose my-3 flex items-center gap-3 rounded-md bg-bg-elevated px-3.5 h-11">
      <MethodBadge method={method} />
      <code className="font-mono text-[13px] text-text">{path}</code>
    </div>
  );
}
