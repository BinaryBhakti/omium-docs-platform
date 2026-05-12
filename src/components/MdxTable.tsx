export function MdxTable({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="not-prose my-5 rounded-card bg-bg-elevated overflow-hidden overflow-x-auto">
      <table className="w-full text-[13.5px] text-text-secondary">
        <thead>
          <tr className="bg-bg-card">
            {head.map((h, i) => (
              <th
                key={i}
                className="text-left font-mono text-meta uppercase text-text-tertiary font-medium px-4 py-3 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-bg-hover/30 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 align-top [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-bg [&_code]:px-1 [&_code]:py-[1px] [&_code]:rounded [&_code]:text-text [&_strong]:text-text [&_strong]:font-semibold"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
