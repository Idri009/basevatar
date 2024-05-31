import { IFaq } from "@/app/types";
import Faq from "../../../components/Faq/Faq";

const Page = async () => {
    const items: IFaq[] = [
        {
            title: "What is Lorem Ipsum?",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit Veritatis, exercitationem deserunt nemo ab praesentium.",
        },
    ];

    return (
        <section className="py-8">
            <div className="container">
                <div className="row">
                    <div className="heading">
                        <h1 className="title">FAQ</h1>
                        <p className="subtitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt
                            nemo ab praesentium.
                        </p>
                    </div>
                    <Faq data={items ?? {}} />
                </div>
            </div>
        </section>
    );
};

export default Page;
