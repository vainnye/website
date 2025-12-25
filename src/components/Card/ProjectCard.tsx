import { fetchRepo } from "@/lib/github";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { A } from "../A";
import config from "@/config";

export function ProjectCard({ repo, name }: { repo: string; name: string }) {
  const [info, setInfo] = useState<{
    html_url: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const res = await fetchRepo(repo, { signal: ac.signal });
        if (!res.ok) {
          setInfo({ html_url: "", description: "" });
        } else {
          const data = await res.json();
          setInfo({
            html_url: data.html_url ?? "",
            description: data.description ?? "",
          });
        }
      } catch (err) {
        // If the fetch was aborted, it's usually a DOMException named "AbortError"
        if (err instanceof DOMException && err.name === "AbortError") {
          // ignore or handle abort-specific logic
          return;
        }

        // handle all other errors
        console.error(err);
        setInfo({ html_url: "", description: "" });
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      ac.abort();
    };
  }, [repo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <A href={info?.html_url ?? config.gh_profile_url + "/" + repo}>
            <h4 className="inline">{name}</h4>
          </A>
        </CardTitle>
        <CardDescription>
          <p>
            {loading ? "Loading..." : (info?.description ?? "No description")}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
