import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination className="mt-2 w-full">
      <PaginationContent>
        <PaginationItem>
          <Button disabled={currentPage === 1} variant="ghost" size="sm" onClick={() => onPageChange(currentPage - 1)}>
            Précédent
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <Button variant={currentPage === page ? "default" : "ghost"} size="sm" onClick={() => onPageChange(page)}>
              {page}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button disabled={currentPage === totalPages} variant="ghost" size="sm" onClick={() => onPageChange(currentPage + 1)}>
            Suivant
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
