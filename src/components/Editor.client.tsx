import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-django";
import "prismjs/themes/prism.css"; //Example style, you can use another

export default function Editor({
  language,
  value,
  onChange,
}: {
  language: "nunjucks" | "jinja2";
  value: string;
  onChange: (value: string) => unknown;
}) {
  language = language === "nunjucks" ? "jinja2" : language;

  return (
    <CodeEditor
      highlight={(code) => highlight(code, languages[language], language)}
      value={value}
      onValueChange={onChange}
    />
  );
}
