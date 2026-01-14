import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { useMedia } from "react-use";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(text: string) {
  // using a textarea for mobiles
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    // fallback to navigator.clipboard
  }
  if (!copied) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }
  document.body.removeChild(textarea);
  return copied;
}

export function isIPAddress(str: string) {
  // Regex simple pour IPv4 : 4 groupes de chiffres séparés par des points
  const regexIPv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  // (Optionnel) Regex pour IPv6 si nécessaire
  const regexIPv6 = /^[a-fA-F0-9:]+$/;

  return regexIPv4.test(str) || regexIPv6.test(str);
}

export function useIsSmall() {
  return useMedia("(min-width: 640px)");
}
