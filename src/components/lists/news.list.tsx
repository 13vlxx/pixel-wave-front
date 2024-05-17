import { LiteNewsDto } from "@stores/news/news.model";

interface NewsListProps {
    title: string
    news: LiteNewsDto[];
}

const NewsList = (props: NewsListProps) => {
    const { title, news } = props;

    return (
        <div className="">
            <h1 className="font-semibold text-lg line-clamp-1 text-ellipsis">{title}</h1>
            {
                news.length ? news.map(x => (
                    <div className="w-full h-min cursor-pointer" key={x.id}>
                        <div className="flex gap-2 hover:bg-neutral">
                            <img className="w-32 h-16 rounded-md" src={x.logo} alt={x.title} />
                            <div className="flex flex-col">
                                {
                                    <>
                                        <p className="text-xs">il y a {x.createdAt}</p>
                                        <p className="text-sm line-clamp-2">{x.title}</p>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="w-full h-px bg-neutral my-2" />
                    </div>
                ))
                    :
                    <span>Aucune actualité pour l'instant</span>
            }
        </div>
    )
}

export default NewsList;