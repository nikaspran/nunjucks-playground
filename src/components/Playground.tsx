"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Editor } from "./Editor";

const language = "nunjucks";

export default function Playground() {
  const [template, setTemplate] = useLocalStorage(`template-${language}`, "");

  return (
    <div className="grid grid-cols-2">
      <div className="border border-red-500">
        <Editor language={language} value={template} onChange={setTemplate} />
      </div>

      <div className="border border-red-500">Output</div>

      <div className="border border-red-500">Data</div>

      <div className="border border-red-500">Controls</div>
    </div>
  );
}
