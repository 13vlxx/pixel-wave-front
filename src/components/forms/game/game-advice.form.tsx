import { yupResolver } from "@hookform/resolvers/yup";
import { AdviceDto, GameDto } from "@stores/game/game.model";
import GameRequest from "@stores/game/game.request";
import { useResponsive } from "@utils/useResponsive";
import { fieldsValidation } from "@utils/yup.utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface GameAdviceFormProps {
    advice?: AdviceDto | null;
    isForUpdate?: boolean;
    game: GameDto;
    handleClose: () => void;

}

const NewAdviceSchema = object().shape({

    advice: fieldsValidation.REQUIRED_STRING,
    note: fieldsValidation.REQUIRED_NUMBER
})

export type NewAdviceValidationType = InferType<typeof NewAdviceSchema>;

const GameAdviceForm = (props: GameAdviceFormProps) => {
    const { game, handleClose, advice } = props;
    const [note, setNote] = useState(advice?.note || 1);
    const { isMobile } = useResponsive();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<NewAdviceValidationType>({
        resolver: yupResolver(NewAdviceSchema), mode: "all", defaultValues: {
            advice: advice?.advice,
            note: advice?.note
        }
    })

    const notes = Array.from({ length: 5 }, (_, i) => i + 1);

    const handleSetNote = (note: number) => {
        setValue("note", note)
        setNote(note)
    }

    const onSubmit = handleSubmit((formData) => {
        if (advice) return GameRequest.updateAdvice(formData, game.id).then(() => toast.success("Avis modifié avec succès")).then(handleClose)
        GameRequest.createAdvice(formData, game.id).then(() => toast.success("Avis ajouté avec succès"))
        handleClose();
    })

    if (isMobile)
        return (
            <>
                <h1 className="text-center text-lg font-bold">{advice ? "Modification de votre avis" : "Donnez votre avis"}</h1>
                <div className="h-full flex flex-col justify-center gap-2">
                    <textarea {...register("advice")} placeholder={`Que pensez vous de ${game.name}`} className="p-2 flex-1 textarea textarea-lg textarea-bordered w-full border-secondary resize-none"></textarea>
                    <p className="font-bold">Donnez une note :</p>
                    <div className="grid grid-cols-10 gap-2">
                        {
                            notes.map((x) => (
                                <kbd key={x} onClick={() => handleSetNote(x)} className={`kbd cursor-pointer ${note >= x && "bg-yellow-400"} mask mask-star-2`}></kbd>
                            ))
                        }
                    </div>
                    <div>
                        <button onClick={onSubmit} disabled={!isValid} className="btn btn-outline btn-sm btn-accent w-full">Envoyer</button>
                    </div>
                    <span
                        className="underline flex items-center gap-2 cursor-pointer"
                        onClick={handleClose}>
                        <FaArrowLeftLong /> Retour
                    </span>
                    <input className="hidden" {...register("note")} type="number" value={note} />
                </div>
            </>
        )

    return (
        <>
            <h1 className="text-lg font-bold">{advice ? "Modification de votre avis" : "Donnez votre avis"}</h1>
            <div className="h-full flex flex-col justify-center gap-2">
                <textarea {...register("advice")} placeholder={`Que pensez vous de ${game.name}`} className="p-2 h-full textarea textarea-lg textarea-bordered w-full border-secondary resize-none"></textarea>
                <p className="font-bold">Donnez une note :</p>
                <div className="grid grid-cols-10 gap-2">
                    {
                        notes.map((x) => (
                            <kbd key={x} onClick={() => handleSetNote(x)} className={`kbd cursor-pointer ${note >= x && "bg-yellow-400"} mask mask-star-2`}></kbd>
                        ))
                    }
                </div>
                <div>
                    <button onClick={onSubmit} disabled={!isValid} className="btn btn-outline btn-sm btn-accent w-full">Envoyer</button>
                </div>
                <span
                    className="underline flex items-center gap-2 cursor-pointer"
                    onClick={handleClose}>
                    <FaArrowLeftLong /> Retour
                </span>
                <input className="hidden" {...register("note")} type="number" value={note} />
            </div>
        </>
    );
}

export default GameAdviceForm;