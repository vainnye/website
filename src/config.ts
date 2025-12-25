export type Lng = (typeof config.lngs)[number];

// TODO: use a i18n library to not only store strings but also more complex data structures
// For example, you might want to store the display duration for each anim_line_X to be used in the morph animation

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
      en: "Hi, I'm Vianney!",
      fr: "Bonjour !",
    },
    anim_line_2: {
      en: "pronounced V-N-A",
      fr: "moi c'est Vianney",
    },
    anim_line_3: {
      en: "Looking for an intern?",
      fr: "Besoin d'un stagiaire ?",
    },
    anim_line_4: {
      en: "Let's get in touch!",
      fr: "Contactez-moi !",
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
      en: `I'm a 20-year-old **full-stack developer** and **data scientist** from France. Currently pursuing a double bachelor's degree with [Paris-Saclay University](https://www.universite-paris-saclay.fr/en) and the [University of Quebec at Chicoutimi (UQAC)](https://www.uqac.ca/).`,
      fr: `Je suis un **développeur full-stack** et **data scientist** de 20 ans, originaire de France. Je prépare actuellement un double diplôme (BUT & Bachelor) avec [l'Université Paris-Saclay](https://www.universite-paris-saclay.fr/) et [l'Université du Québec à Chicoutimi (UQAC)](https://www.uqac.ca/).`,
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
