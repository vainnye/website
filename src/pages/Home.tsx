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
import { Badge } from "@/components/ui/badge";
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
