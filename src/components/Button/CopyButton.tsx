import {
  IconClipboardCheck,
  IconClipboardCopy,
  IconClipboardX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

export function CopyButton({
  children,
  onCopy,
  className,
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
    <Button
      className={`select-text ${className}`}
      onClick={handleCopy}
      {...props}
    >
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
