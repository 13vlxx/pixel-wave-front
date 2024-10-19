import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  categoryName: string;
}

export const CategoryBadge = (props: CategoryBadgeProps) => {
  const { categoryName } = props;

  return <Badge variant={"secondary"}>{categoryName}</Badge>;
};
