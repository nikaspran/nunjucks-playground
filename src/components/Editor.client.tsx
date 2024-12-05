import { langs } from "@uiw/codemirror-extensions-langs";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";

export default function Editor({
  language,
  value,
  onChange,
  height,
}: {
  language: "nunjucks" | "jinja2" | "yaml" | "json";
  value: string;
  onChange?: (value: string) => unknown;
  height: string;
}) {
  language = language === "nunjucks" ? "jinja2" : language;

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={aura}
      height={height}
      extensions={[langs[language]()]}
      basicSetup={{}}
    />
  );
}
