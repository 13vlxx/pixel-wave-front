import { fieldsValidation } from "@/_utils/yup.utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { AdviceDto, GameDto } from "@/stores/game/game.model";
import GameRequest from "@/stores/game/game.request";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface CreateUpdateAdviceFormProps {
  game: GameDto;
  advice: AdviceDto | null;
  closeModal: (advice: AdviceDto) => void;
}

const AdviceSchema = object().shape({
  advice: fieldsValidation.REQUIRED_STRING,
  note: fieldsValidation.REQUIRED_NUMBER,
});

export type AdviceValidationType = InferType<typeof AdviceSchema>;

export const CreateUpdateAdviceForm = (props: CreateUpdateAdviceFormProps) => {
  const { game, advice, closeModal } = props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<AdviceValidationType>({
    resolver: yupResolver(AdviceSchema),
    mode: "all",
    defaultValues: {
      advice: advice?.advice,
      note: advice?.note ?? 3,
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (advice)
      return GameRequest.updateAdvice(formData, game.id).then((x) => {
        toast.success("Avis modifié avec succès");
        closeModal(x);
      });
    GameRequest.createAdvice(formData, game.id).then((x) => {
      toast.success("Avis ajouté avec succès");
      closeModal(x);
    });
  });

  return (
    <section className="flex flex-col space-y-4">
      <form className="space-y-4">
        <h1 className="text-lg font-semibold">{advice ? "Modification de mon avis" : "Création de mon avis"}</h1>
        <div className="grid w-full gap-5">
          <div>
            <Label htmlFor="advice">
              Mon avis sur <span className="capitalize">{game.name}</span>
            </Label>
            <Textarea rows={4} className="resize-none" placeholder="..." id="advice" {...register("advice")} />
            <p className="text-sm text-muted-foreground">Une fois publié, il vous sera impossible de supprimer votre avis.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mark">A quel point j'ai aimé le jeu ?</Label>
            <Slider defaultValue={[getValues("note")]} {...register("note")} id="mark" min={0} max={5} step={1} />
          </div>
        </div>
        <div className="h-2"></div>
        <Button disabled={!isValid} className="w-full" type="submit" size={"sm"} onClick={onSubmit}>
          {advice ? "Modifier" : "Commenter"}
        </Button>
      </form>
    </section>
  );
};
