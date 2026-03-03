import { useEffect, useState } from "react";
import {
  compareStructureAndGetItems,
  type CompareStructureResponse,
} from "./api/items";

const SAME_STRUCTURE_PAYLOAD: [unknown[], unknown[]] = [
  [1, [1, 1]],
  [2, [2, 2]],
];

export function ItemsPage() {
  const [data, setData] = useState<CompareStructureResponse | null>(null);
  const [sameStructure, setSameStructure] = useState(false);
  const [items, setItems] = useState<CompareStructureResponse["items"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { sameStructure, items } = data;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    compareStructureAndGetItems(...SAME_STRUCTURE_PAYLOAD)
      .then((result) => {
        if (!cancelled) {
          const { sameStructure, items } = result;

          setData(result);
          setSameStructure(sameStructure);
          setItems(items || []);

        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (data == null) return <p>No data received.</p>;

  // Frontend expects .items; backend bug returns .itmes → items is undefined and .map throws

  return (
    <div>
      <h1>Items &amp; structure comparison</h1>
      <p>
        Structure match: <strong>{sameStructure ? "Yes" : "No"}</strong>
      </p>
      {sameStructure ? (
        <ul>
          {items!.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Structure does not match. No items to display.</p>
      )}
    </div>
  );
}
