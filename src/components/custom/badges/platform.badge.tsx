import { Badge } from "@/components/ui/badge";

interface PlatformBadgeProps {
  platformName: string;
}

export const PlatformBadge = (props: PlatformBadgeProps) => {
  const { platformName } = props;

  return <Badge variant={"secondary"}>{platformName}</Badge>;
};
