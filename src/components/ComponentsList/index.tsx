"use client";
import { useRef, useEffect } from "react";

export interface ComponentsListProps {
  components: Component[];
  itemColor: string;
  onSelect: (component: Component) => void;
  onEnd: () => void;
}
interface Component {
  mpn: string;
  name?: string;
  imageUrl?: string;
}

export function ComponentsList({
  components,
  itemColor,
  onSelect,
  onEnd,
}: ComponentsListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        onEnd();
      }
    };
    const ul = listRef.current;
    if (ul) {
      ul.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ul) {
        ul.removeEventListener("scroll", handleScroll);
      }
    };
  }, [components, onEnd]);

  return (
    <ul
      ref={listRef}
      className="overflow-auto"
      style={{
        minHeight: "200px",
        maxHeight: "540px",
        backgroundColor: "var(--surface)",
      }}
    >
      {components.map((component) => (
        <li
          key={component.mpn}
          className="list-none gap-1 mb-2 cursor-pointer"
          style={{ height: "60px" }}
          onClick={() => onSelect(component)}
        >
          <div
            className="flex items-center h-full border rounded-lg p-2 cursor-pointer"
            style={{ backgroundColor: itemColor }}
          >
            <img
              src={component.imageUrl || "/placeholder.svg"}
              alt={component.name || "Component Image"}
              className="w-10 h-10 object-cover mr-3 rounded"
              width={40}
              height={40}
            />
            <span className="text-base font-medium text-white">
              {component.name || "Unknown Component"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
