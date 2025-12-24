import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ButtonGroup } from "@/components/ui/button-group";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconClipboardCopy,
  IconClipboardCheck,
  IconMapPin,
  IconClipboardX,
} from "@tabler/icons-react";
import { toast } from "sonner";
import * as DevIco from "developer-icons";

import { A } from "@/lib/utils.tsx";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchRepo } from "@/lib/github";
import { RDFIcon } from "@/assets/rdf.tsx";
import { copyToClipboard } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";

export function Home() {
  return (
    <>
      <div className="flex justify-end p-4">
        <DarkModeToggle />
      </div>
      <main className="flex flex-col gap-8 justify-start min-h-screen py-4 px-4 md:py-10 md:px-10 lg:px-50 xl:px-80">
        <TopCard />
        <LanguagesSection />
        <Separator className="border-t-2" />
        <ProjectSection />
      </main>
      <footer className="flex flex-col gap-4 justify-center items-center py-4 px-4 md:py-10 md:px-10 lg:px-50 xl:px-80">
        <p className="text-muted-foreground text-center text-sm sm:text-base md:text-lg font-medium leading-relaxed">
          &copy; 2025-{new Date().getFullYear()} Vianney Jacquemot. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}

function DarkModeToggle({ ...props }) {
  const [checked, setChecked] = useState(false);
  const { setTheme, theme } = useTheme();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={() => {
        setTheme(checked ? "light" : "dark");
        setChecked(!checked);
      }}
      {...props}
    />
  );
}

function TopCard({ ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center">
          <h1 className="flex-1 leading-normal font-medium">Vianney</h1>
          <ButtonGroup className="flex-nowrap">
            <CopyButton
              onCopy={() => toast("Email saved to clipboard.")}
              variant="outline"
            >
              vianney.jcmt@gmail.com
            </CopyButton>
            <Button asChild variant="outline" className="aspect-square">
              <A href="https://www.linkedin.com/in/vianney-jacquemot/?locale=en_US">
                <IconBrandLinkedin />
              </A>
            </Button>
            <Button asChild variant="outline" className="aspect-square">
              <A href="https://github.com/vainnye">
                <IconBrandGithub />
              </A>
            </Button>
          </ButtonGroup>
        </CardTitle>
        <CardDescription>
          <p>
            <IconMapPin size="1em" className="inline align-sub" /> currently in
            Chicoutimi, QC, Canada
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          I'm a 20 year old <strong>backend developer</strong> and{" "}
          <strong>data scientist</strong> from France. Currently pursuing a
          double bachelor's degree with{" "}
          <A href="https://www.universite-paris-saclay.fr/en">
            Paris-Saclay University
          </A>{" "}
          and <A href="https://www.uqac.ca/">Chicoutimi University (UQAC)</A>.
        </p>
      </CardContent>
    </Card>
  );
}

function CopyButton({
  children,
  onCopy,
  ...props
}: React.ComponentProps<typeof Button> & { onCopy?: () => void }) {
  const [success, setSuccess] = useState(null as boolean | null);

  async function handleCopy() {
    const text = typeof children === "string" ? children.trim() : "";

    const copied = await copyToClipboard(text);
    setSuccess(copied);
    if (copied && typeof onCopy === "function") {
      onCopy();
    }
    setTimeout(() => setSuccess(null), 1500);
  }

  return (
    <Button className="select-text" onClick={handleCopy} {...props}>
      {children}
      {success === true ? (
        <IconClipboardCheck className="text-success" />
      ) : success === false ? (
        <IconClipboardX className="text-destructive" />
      ) : (
        <IconClipboardCopy />
      )}
    </Button>
  );
}

function LanguagesSection({ ...props }) {
  return (
    <section {...props}>
      <h2 className="text-center mb-4">Languages</h2>
      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">
          <DevIco.Java /> Java
        </Badge>
        <Badge variant="secondary">
          <DevIco.Python /> Python
        </Badge>
        <Badge variant="secondary">
          <DevIco.Go /> Go
        </Badge>
        <Badge variant="secondary">
          <DevIco.R /> R
        </Badge>
        <Badge variant="secondary">
          <DevIco.PHP /> PHP
        </Badge>
        <Badge variant="secondary">
          <DevIco.CPlusPlus /> C++
        </Badge>
        <Badge variant="secondary">
          <DevIco.CSharp /> C#
        </Badge>
        <Badge variant="secondary">
          <DevIco.HTML5 /> HTML <DevIco.CSS3 /> CSS <DevIco.JavaScript />{" "}
          JavaScript
        </Badge>
        <Badge variant="secondary">
          <DevIco.MongoDB /> MongoDb
        </Badge>
        <Badge variant="secondary">
          <DevIco.Oracle /> Oracle Ex <DevIco.MySQL /> Mysql <DevIco.MariaDB />{" "}
          MariaDb
        </Badge>
        <Badge variant="secondary">
          <RDFIcon /> SPARQL & RDF
        </Badge>
      </div>
    </section>
  );
}

function ProjectSection({ ...props }) {
  const projects = [
    { repo: "git-dirs", name: "`git dirs`" },
    { repo: "bf-lingua-franca", name: "bf lingua franca" },
    { repo: "stud-2025-proj-dps3-php", name: "voting as a social network" },
    { repo: "stud-2025-proj-lampe-magique", name: "smart bulb remote" },
  ];

  return (
    <section {...props}>
      <h2 className="text-center mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(({ repo, name }) => (
          <ProjectCard key={repo} repo={repo} name={name} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ repo, name }: { repo: string; name: string }) {
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
          <A href={info?.html_url ?? "#"}>
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
