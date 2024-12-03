import Playground from "@/components/Playground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Nunjucks Playground",
  description:
    "Explore and test Nunjucks templates in real-time with this online playground. Perfect for developers to debug, prototype, and learn templating easily.",
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
      <h1>Nunjucks Playground</h1>
      <h2>Explore and test Nunjucks templates in real-time</h2>

      <Playground language="nunjucks" />
    </main>
  );
}
