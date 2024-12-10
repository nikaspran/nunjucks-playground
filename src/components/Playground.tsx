"use client";
import nunjucks from "nunjucks/browser/nunjucks";
import set from "lodash/set";
import useLocalStorage from "@/hooks/useLocalStorage";
import jsYaml from "js-yaml";
import { Editor } from "./Editor";
import { Fragment, ReactNode, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

class NunjucksLoader implements nunjucks.ILoader {
  getSource(name: string): nunjucks.LoaderSource {
    throw new Error(`Template loading not supported: ${name}`);
  }
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#21202e] border-slate-600 border rounded overflow-hidden shadow-md">
      {children}
    </div>
  );
}

function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3
      className={cn(
        "border-b-slate-600 border-b px-2 py-1 font-bold",
        className
      )}
    >
      {children}
    </h3>
  );
}

const DATA_FORMATS = ["yaml", "json"] as const;

const DEFAULT_OPTIONS = {
  autoescape: true,
  throwOnUndefined: false,
  trimBlocks: false,
  lstripBlocks: false,
  tags: {
    blockStart: "{%",
    blockEnd: "%}",
    variableStart: "{{",
    variableEnd: "}}",
    commentStart: "{#",
    commentEnd: "#}",
  },
} as nunjucks.ConfigureOptions;

function parseOptions(serialized: string) {
  const parsed = JSON.parse(serialized);
  return {
    autoescape: parsed.autoescape,
    throwOnUndefined: parsed.throwOnUndefined,
    trimBlocks: parsed.trimBlocks,
    lstripBlocks: parsed.lstripBlocks,
    tags: {
      blockStart: parsed.tags?.blockStart,
      blockEnd: parsed.tags?.blockEnd,
      variableStart: parsed.tags?.variableStart,
      variableEnd: parsed.tags?.variableEnd,
      commentStart: parsed.tags?.commentStart,
      commentEnd: parsed.tags?.commentEnd,
    },
  } as nunjucks.ConfigureOptions;
}

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
  const [selectedDataFormat, setSelectedDataFormat] = useLocalStorage<
    (typeof DATA_FORMATS)[number]
  >(`dataFormat-${language}`, DATA_FORMATS[0]);
  const [data, setData] = useLocalStorage(
    `data-${language}-${selectedDataFormat}`,
    "" as string
  );
  const [options, setOptions] = useLocalStorage(
    `options-${language}`,
    JSON.stringify(DEFAULT_OPTIONS)
  );

  const parsedOptions = options ? parseOptions(options) : DEFAULT_OPTIONS;

  function setOption(path: string, value: unknown) {
    const copy = JSON.parse(JSON.stringify(parsedOptions));
    set(copy, path, value);
    setOptions(JSON.stringify(copy));
  }

  useEffect(() => {
    const env = new nunjucks.Environment(new NunjucksLoader(), parsedOptions);
    try {
      const parsedData = data
        ? selectedDataFormat === "json"
          ? JSON.parse(data)
          : jsYaml.load(data)
        : {};

      const newOutput = env.renderString(debouncedTemplate || "", parsedData);
      setOutput(newOutput);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setOutput(error.toString());
    }
  }, [debouncedTemplate, language, data, selectedDataFormat, options]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>Template</CardHeader>

        <div className="min-h-[300px]">
          <Editor
            language={language}
            value={template || ""}
            onChange={setTemplate}
            height="300px"
          />
        </div>
      </Card>

      <Card>
        <CardHeader>Output</CardHeader>
        <div className="min-h-[300px]">
          <Editor language={language} value={output} height="300px" />
        </div>
      </Card>

      <Card>
        <CardHeader className="flex justify-between">
          <span>Data</span>
          <span>
            {DATA_FORMATS.map((format, index) => (
              <Fragment key={format}>
                <button
                  className={cn(
                    "text-sm cursor-pointer hover:underline underline-offset-2",
                    format === selectedDataFormat
                      ? "text-slate-200"
                      : "text-slate-400"
                  )}
                  onClick={() => setSelectedDataFormat(format)}
                >
                  {format}
                </button>
                {index < DATA_FORMATS.length - 1 ? (
                  <span className="px-1">/</span>
                ) : null}
              </Fragment>
            ))}
          </span>
        </CardHeader>

        <div className="min-h-[300px]">
          <Editor
            language={selectedDataFormat || "yaml"}
            value={data || ""}
            onChange={setData}
            height="300px"
          />
        </div>
      </Card>

      <Card>
        <CardHeader>Options</CardHeader>

        <div className="min-h-[300px] flex flex-col">
          <div className="py-2 px-4 ">
            <div className="grid grid-cols-2 gap-1 gap-x-4">
              {(
                [
                  "autoescape",
                  "throwOnUndefined",
                  "trimBlocks",
                  "lstripBlocks",
                ] as const
              ).map((booleanOption) => (
                <div key={booleanOption}>
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    id={booleanOption}
                    checked={parsedOptions[booleanOption]}
                    onChange={(event) =>
                      setOption(booleanOption, event.target.value)
                    }
                  />
                  <label
                    className="pl-1 cursor-pointer"
                    htmlFor={booleanOption}
                  >
                    {booleanOption}
                  </label>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-1 gap-x-4 pt-2">
              {(
                [
                  "blockStart",
                  "blockEnd",
                  "variableStart",
                  "variableEnd",
                  "commentStart",
                  "commentEnd",
                ] as const
              ).map((tagOption) => (
                <div key={tagOption} className="flex flex-col">
                  <input
                    type="text"
                    className="text-slate-800"
                    id={tagOption}
                    value={parsedOptions?.tags?.[tagOption]}
                    onChange={(event) =>
                      setOption(`tags.${tagOption}`, event.target.value)
                    }
                  />
                  <label className="pl-1 cursor-pointer" htmlFor={tagOption}>
                    {tagOption}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex justify-center border-t border-t-slate-600 p-2">
            <span>
              Made with 💻 by{" "}
              <a
                href="https://nikas.praninskas.com/about/"
                className="font-bold hover:underline underline-offset-1"
              >
                Nikas Praninskas
              </a>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
