import ContentWrapper from "@/components/ContentWrapper";
import Playground from "@/components/Playground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Nunjucks Playground",
  description:
    "Create and test Nunjucks templates in real-time with this online playground. Perfect for developers to debug, prototype, and learn templating easily.",
  keywords: [
    "Nunjucks playground",
    "Online Nunjucks playground",
    "online templating engine",
    "Nunjucks editor",
    "real-time template testing",
    "Nunjucks debugging",
    "template prototyping",
    "Nunjucks",
    "Jinja",
    "Jinja2",
    "Jinja playground",
    "Jinja2 playground",
  ],
  authors: [
    {
      name: "Nikas Praninskas",
      url: "https://nikas.praninskas.com",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <ContentWrapper>
        <div className="mt-16 mb-16 text-center">
          <h1 className="font-bold text-4xl mb-4 text-purple-300">Nunjucks Playground</h1>
          <h2 className="font-semibold">
            Create and test{" "}
            <a
              href="https://mozilla.github.io/nunjucks/"
              target="blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline underline-offset-1"
            >
              Nunjucks
            </a>{" "}
            templates in real-time
          </h2>
        </div>

        <Playground language="nunjucks" />
      </ContentWrapper>
    </main>
  );
}
