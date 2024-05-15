import { LiteNewsDto } from "@stores/news/news.model";

interface NewsListProps {
    title: string
    news: LiteNewsDto[];
}

const NewsList = (props: NewsListProps) => {
    const { title, news } = props;

    return (
        <div className="overflow-hidden">
            <h1 className="font-semibold text-lg line-clamp-1 text-ellipsis">{title}</h1>
            {
                news.map(x => (
                    <div className="w-screen" key={x.id}>
                        <div className="flex gap-2 hover:bg-neutral">
                            <img className="w-32 rounded-md" src={x.logo} alt={x.title} />
                            <div className="flex flex-col">
                                {
                                    <>
                                        <p className="text-xs">il y a {x.createdAt}</p>
                                        <p className="text-sm w-2/3 line-clamp-2">{x.title}</p>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="w-full h-px bg-neutral my-2" />
                    </div>
                ))
            }
        </div>
    )
}

export default NewsList;