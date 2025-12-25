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

import { A } from "@/components/A";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchRepo } from "@/lib/github";
import { RDFIcon } from "@/assets/rdf.tsx";
import { copyToClipboard } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";
import config from "@/config";
import { useTranslation } from "@/lib/i18n";
import { useLocale } from "@/contexts/locale-context";
import Markdown from "@/components/Markdown";
import MorphText from "@/components/MorphText";

export function Home() {
  const t = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center w-full p-4">
        <LanguageToggle />
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
          {t.copyright}
        </p>
      </footer>
    </>
  );
}

function DarkModeToggle({ ...props }) {
  const { setTheme, theme } = useTheme();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      {...props}
    />
  );
}

function LanguageToggle({ ...props }) {
  const { locale, setLocale } = useLocale();
  const t = useTranslation();

  let flag;
  switch (locale) {
    case "fr":
      flag = "em em-us";
      break;
    case "en":
      flag = "em em-fr";
      break;
    default:
      flag = "em em-pirate_flag";
  }

  return (
    <Button
      aria-label="Toggle french/english"
      size="sm"
      variant="outline"
      onClick={() => setLocale(locale === "en" ? "fr" : "en")}
      {...props}
    >
      <i className={flag + " mr-1"}></i>
      {t.switch_lang}
    </Button>
  );
}

function TopCard({ ...props }) {
  const t = useTranslation();
  const { locale } = useLocale();

  const headingClassName = "flex-1 p-0 text-nowrap leading-normal";

  // last locale for which the animation finished
  const [playedLocales, setPlayedLocales] = useState<string[]>([]);
  const animationShouldPlay = !playedLocales.includes(locale);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-2 items-center">
          {animationShouldPlay ? (
            <MorphText
              className={headingClassName}
              onFinish={() => setPlayedLocales([...playedLocales, locale])}
              texts={[
                t.anim_line_1,
                t.anim_line_2,
                t.anim_line_3,
                t.anim_line_4,
                t.anim_line_5,
              ]}
            />
          ) : (
            <div className={headingClassName}>
              <h1>{t.anim_line_5}</h1>
            </div>
          )}
          <ButtonGroup className="flex-nowrap">
            <CopyButton
              onCopy={() => toast(t.email_saved_to_clipboard)}
              variant="outline"
            >
              vianney.jcmt@gmail.com
            </CopyButton>
            <Button asChild variant="outline" className="aspect-square">
              <A href={t.url_linkedin}>
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
            <IconMapPin size="1em" className="inline align-sub" /> {t.location}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Markdown source={t.bio} />
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
  const t = useTranslation();

  return (
    <section {...props}>
      <h2 className="text-center mb-4">{t.prog_languages}</h2>
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
          <DevIco.HTML5 /> HTML <DevIco.CSS3 /> CSS <DevIco.TypeScript />{" "}
          TypeScript
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
  const projects = config.gh_pined_repos;
  const t = useTranslation();

  return (
    <section {...props}>
      <h2 className="text-center mb-4">{t.projects}</h2>
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
