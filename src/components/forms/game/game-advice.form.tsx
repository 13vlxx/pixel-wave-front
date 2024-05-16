import { yupResolver } from "@hookform/resolvers/yup";
import { AdviceDto, GameDto } from "@stores/game/game.model";
import GameRequest from "@stores/game/game.request";
import { fieldsValidation } from "@utils/yup.utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import { InferType, object } from "yup";

interface GameAdviceFormProps {
    advice: AdviceDto | null;
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
    const [note, setNote] = useState(1);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<NewAdviceValidationType>({
        resolver: yupResolver(NewAdviceSchema), mode: "all"
    })

    const notes = Array.from({ length: 5 }, (_, i) => i + 1);

    const handleSetNote = (note: number) => {
        setValue("note", note)
        setNote(note)
    }

    const onSubmit = handleSubmit((formData) => {
        GameRequest.createAdvice(formData, game.id).then(() => toast.success("Avis ajouté avec succès"))
        handleClose();
    })

    if (advice)
        return (
            <>
                <div key={advice.user.id + advice.game.id}
                    className="ml-4 overflow-scroll carousel-item text-center bg-neutral w-full flex flex-col max-h-[200px] items-center rounded-md p-2 justify-center">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-ellipsis font-bold">{advice.user.pseudo}</p>
                        <p className="text-sm text-ellipsis">{advice.note}/5</p>
                        <p className="text-[12px] text-ellipsis line-clamp-2">{advice.advice}</p>
                    </div>
                </div>
                <span
                    className="underline flex items-center gap-2 cursor-pointer"
                    onClick={handleClose}>
                    <FaArrowLeftLong /> Retour
                </span>
            </>
        )

    return (
        <>
            <h1 className="text-lg font-bold">Donnez votre avis</h1>
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
                <button onClick={onSubmit} disabled={!isValid} className="btn btn-outline btn-sm btn-accent w-full">Envoyer</button>
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