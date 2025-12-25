import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RDFIcon } from "@/assets/rdf.tsx";
import { A } from "@/components/A";
import { CopyButton } from "@/components/Button/CopyButton";
import { ProjectCard } from "@/components/Card/ProjectCard";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import Markdown from "@/components/Markdown";
import MorphText from "@/components/MorphText";
import { Badge as UIBadge } from "@/components/ui/badge";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import config from "@/config";
import { useLocale } from "@/contexts/LocaleContext";
import { useTranslation } from "@/lib/i18n";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMapPin,
} from "@tabler/icons-react";
import * as DevIco from "developer-icons";
import { useState } from "react";
import { toast } from "sonner";

export function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 justify-start min-h-screen py-4 px-4 md:py-10 md:px-10 lg:px-50 xl:px-80">
        <TopCard />
        <LanguagesSection />
        <Separator className="border-t-2" />
        <ProjectSection />
      </main>
      <Footer />
    </>
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
    <Card {...props} className="gap-4">
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
          <ContactButtonGroup />
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

function ContactButtonGroup() {
  const t = useTranslation();

  return (
    <ButtonGroup className="flex-nowrap">
      <CopyButton
        onCopy={() => toast(t.email_saved_to_clipboard)}
        className="text-foreground transition-colors hover:text-primary"
        variant="outline"
      >
        vianney.jcmt@gmail.com
      </CopyButton>
      <Button
        asChild
        variant="outline"
        className="text-foreground transition-colors hover:text-blue-500"
      >
        <A href={t.url_linkedin}>
          <IconBrandLinkedin />
        </A>
      </Button>
      <Button
        asChild
        variant="outline"
        className="text-foreground transition-colors hover:text-yellow-400"
      >
        <A href="https://github.com/vainnye">
          <IconBrandGithub />
        </A>
      </Button>
    </ButtonGroup>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <UIBadge
      className="h-6 py-1 px-2 lg:h-10 lg:py-2 lg:px-3 text-md gap-2 [&>svg]:size-full!"
      variant="secondary"
    >
      {children}
    </UIBadge>
  );
}

function LanguagesSection({ ...props }) {
  const t = useTranslation();

  return (
    <section id="programming-languages" {...props}>
      <h2 className="text-center mb-4">{t.prog_languages}</h2>
      <div className="flex flex-wrap justify-center gap-2">
        <Badge>
          <DevIco.Java /> Java
        </Badge>
        <Badge>
          <DevIco.Python /> Python
        </Badge>
        <Badge>
          <DevIco.Go /> Go
        </Badge>
        <Badge>
          <DevIco.R /> R
        </Badge>
        <Badge>
          <DevIco.PHP /> PHP
        </Badge>
        <Badge>
          <DevIco.CPlusPlus /> C++
        </Badge>
        <Badge>
          <DevIco.CSharp /> C#
        </Badge>
        <Badge>
          <DevIco.HTML5 /> HTML <DevIco.CSS3 /> CSS <DevIco.TypeScript />{" "}
          TypeScript
        </Badge>
        <Badge>
          <DevIco.MongoDB /> MongoDb
        </Badge>
        <Badge>
          <DevIco.Oracle /> Oracle Ex <DevIco.MySQL /> Mysql <DevIco.MariaDB />{" "}
          MariaDb
        </Badge>
        <Badge>
          <RDFIcon /> SPARQL &amp; RDF
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
