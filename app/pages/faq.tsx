import { LucideChevronDown } from "lucide-react";

const FAQ_CONTENT = [
    {
        title: "What is Lorem Ipsum?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt nemo ab praesentium.",
    },
    {
        title: "Why do we use it?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, sit. Maiores cumque sint placeat recusandae odit! Harum consequuntur nesciunt exercitationem corrupti distinctio, cumque animi molestias, quis minima asperiores possimus? Officia!",
    },
    {
        title: "Where does it come from?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt nemo ab praesentium.",
    },
    {
        title: "Where can I get some?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt nemo ab praesentium.",
    },
];

const FAQ = () => {
    return (
        <section className="section-faq">
            <div className="container">
                <div className="row">
                    <div className="heading">
                        <h1 className="title">FAQ</h1>
                        <p className="subtitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt
                            nemo ab praesentium.
                        </p>
                    </div>

                    <div className="accordion">
                        {FAQ_CONTENT.map((faq, index) => (
                            <div key={index} className="accordion-item">
                                <button
                                    className="accordion-title"
                                    onClick={(e) =>
                                        (e.currentTarget.parentNode as HTMLElement)?.classList.toggle("active")
                                    }
                                >
                                    {faq.title}
                                    <LucideChevronDown size={20} />
                                </button>
                                <div
                                    className="accordion-content"
                                    dangerouslySetInnerHTML={{ __html: faq.content }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
