"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Editor } from "./Editor";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function Playground({
  language,
}: {
  language: "nunjucks" | "jinja2";
}) {
  const [template, setTemplate] = useLocalStorage(
    `template-${language}`,
    "" as string
  );
  const debouncedTemplate = useDebounce(template, 300);
  const [output, setOutput] = useState("" as string);
  const [data, setData] = useLocalStorage(`data-${language}`, "" as string);
  const [selectedDataFormat, setSelectedDataFormat] = useLocalStorage<
    "yaml" | "json"
  >(`dataFormat-${language}`, "yaml");

  useEffect(() => {
    setOutput(`Compiled: ${debouncedTemplate}`);
  }, [debouncedTemplate, language]);

  return (
    <div className="grid grid-cols-2">
      <div>
        <h3>Template</h3>

        <Editor language={language} value={template} onChange={setTemplate} />
      </div>

      <div>
        <h3>Output</h3>
        <Editor language={language} value={output} />
      </div>

      <div>
        <h3>Data</h3>

        <Editor language={selectedDataFormat} value={data} onChange={setData} />
      </div>

      <div>
        <h3>Options</h3>
      </div>
    </div>
  );
}
