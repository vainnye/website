import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { A } from "@/components/A";

export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown
      // enable GFM features (tables, strike, autolinks)
      remarkPlugins={[remarkGfm]}
      // sanitize HTML output (prevents XSS). We are not enabling raw HTML parsing here.
      rehypePlugins={[rehypeSanitize]}
      // map anchor tags to your app's <A> component for consistent behavior
      components={{
        a: ({ href, children, ...props }) => (
          <A href={href ?? "#"} {...props}>
            {children}
          </A>
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
