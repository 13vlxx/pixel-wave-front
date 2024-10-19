import { Button } from "@/components/ui/button";

export const PostsBanner = () => {
  return (
    <section className="w-full flex justify-center items-center gap-0 flex-col py-4 relative bg-secondary shadow-[0_-2px_5px_rgba(0,0,0,0.25),0_2px_5px_rgba(0,0,0,0.25)]">
      <p>Envie de discuter avec d'autres joueurs ?</p>
      <Button variant={"link"} className="w-min">
        Consulter les posts
      </Button>
    </section>
  );
};
