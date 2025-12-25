export type Lng = (typeof config.lngs)[number];

export const config = {
  lngs: ["fr", "en"] as const,
  default_lng: "en" as const,
  gh_username: "vainnye",
  gh_profile_url: "https://github.com/vainnye",
  gh_pined_repos: [
    { repo: "git-dirs", name: "`git dirs`" },
    { repo: "bf-lingua-franca", name: "bf lingua franca" },
    { repo: "stud-2025-proj-dps3-php", name: "voting as a social network" },
    { repo: "stud-2025-proj-lampe-magique", name: "smart bulb remote" },
  ],
  content: {
    switch_lang: {
      fr: "switch to English",
      en: "passer en français",
    },
    anim_line_1: {
      en: "Hi I'm Vianney!",
      fr: "Bonjour !",
    },
    anim_line_2: {
      en: 'call me "V N A"',
      fr: "moi c'est Vianney",
    },
    anim_line_3: {
      en: "hiring an intern?",
      fr: "recherche stage",
    },
    anim_line_4: {
      en: "reach me out!",
      fr: "contactez moi !",
    },
    anim_line_5: {
      en: "Vianney",
      fr: "Vianney",
    },
    location: {
      en: "currently in Chicoutimi, QC, Canada",
      fr: "actuellement à Chicoutimi (Québec)",
    },
    bio: {
      en: `I'm a 20-year-old **backend developer** and **data scientist** from France. Currently pursuing a double bachelor's degree with [Paris-Saclay University](https://www.universite-paris-saclay.fr/en) and [Chicoutimi University (UQAC)](https://www.uqac.ca/).`,
      fr: `Bonjour ! Je suis **développeur backend** et **data scientist** français. Je poursuis actuellement un double diplôme BUT + Baccalauréat Québécois avec [l'Université Paris-Saclay](https://www.universite-paris-saclay.fr/) et [l'Université du Québec à Chicoutimi (UQAC)](https://www.uqac.ca/).`,
    },
    url_linkedin: {
      en: "https://www.linkedin.com/in/vianney-jacquemot/?locale=en_US",
      fr: "https://www.linkedin.com/in/vianney-jacquemot/?locale=fr_FR",
    },
    email_saved_to_clipboard: {
      en: "Email saved to clipboard.",
      fr: "Email copiée dans le presse-papiers.",
    },
    prog_languages: {
      en: "Programming Languages",
      fr: "Langages de programmation",
    },
    projects: {
      en: "Projects",
      fr: "Projets",
    },
    copyright: {
      fr: `© 2025-${new Date().getFullYear()} Vianney Jacquemot. Tous droits réservés. Dernière mise à jour le ${new Intl.DateTimeFormat("fr-FR").format(new Date())}.`,
      en: `© 2025-${new Date().getFullYear()} Vianney Jacquemot. All rights reserved. Last updated ${new Intl.DateTimeFormat("en-CA").format(new Date())}.`,
    },
  },
};

export default config;
