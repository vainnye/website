export type Lng = (typeof config.lngs)[number];

export const config = {
  lngs: ["fr", "en"] as const,
  default_lng: "en" as const,
  gh_username: "vainnye",
  gh_pinedd_repos: [
    { repo: "git-dirs", name: "`git dirs`" },
    { repo: "bf-lingua-franca", name: "bf lingua franca" },
    { repo: "stud-2025-proj-dps3-php", name: "voting as a social network" },
    { repo: "stud-2025-proj-lampe-magique", name: "smart bulb remote" },
  ],
  content: {
    switch_lang: {
      fr: "switch to english",
      en: "passer en français",
    },
    location: {
      en: "currently in Chicoutimi, QC, Canada",
      fr: "actuellement à Chicoutimi (Québec)",
    },
    bio: {
      en: `I'm a 20 year old **backend developer** and **data scientist** from France. Currently pursuing a double bachelor's degree with [Paris-Saclay University](https://www.universite-paris-saclay.fr/en) and [Chicoutimi University (UQAC)](https://www.uqac.ca/).`,
      fr: `Bonjour ! Je suis **développeur backend** et **data scientist** français. Je poursuis actuellement un double diplôme BUT + Baccalauréat Québécois avec [l'Université Paris-Saclay](https://www.universite-paris-saclay.fr/) et [l'Université du Québec à Chicoutimi (UQAC)](https://www.uqac.ca/).`,
    },
    url_linkedin: {
      en: "https://www.linkedin.com/in/vianney-jacquemot/?locale=en_US",
      fr: "https://www.linkedin.com/in/vianney-jacquemot/?locale=fr_FR",
    },
    copyright: {
      fr: `© 2025-${new Date().getFullYear()} Vianney Jacquemot. Tous droits réservés`,
      en: `© 2025-${new Date().getFullYear()} Vianney Jacquemot. All rights reserved.`,
    },
  },
};

export default config;
