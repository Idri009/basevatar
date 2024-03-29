import { Link } from "@remix-run/react";
import srcSampleImg1 from "../assets/img/sample-img-1.png";
import srcSampleImg2 from "../assets/img/sample-img-2.png";
import srcSampleImg3 from "../assets/img/sample-img-3.png";
import srcSampleImg4 from "../assets/img/sample-img-4.png";
import srcSampleImg5 from "../assets/img/sample-img-5.png";
import srcSampleImg6 from "../assets/img/sample-img-6.png";

const Index = () => {
    return (
        <section className="section-intro">
            <div className="container">
                <div className="row">
                    <div className="md:col-6 intro">
                        <p>
                            <span className="text-orange-300 font-semibold">Lorem ipsum dolor</span> <br />
                            sit amet consectetur, adipisicing elit.{" "}
                            <span className="text-blue-400 font-semibold"> Nobis eligendi nam laborum</span> debitis
                            voluptate, placeat aliquam{" "}
                            <span className="text-amber-500 font-semibold">cum soluta minima</span>, et, ut blanditiis
                            totam delectus ipsa consequatur est{" "}
                            <span className="text-red-400 font-semibold">deserunt ex officia?</span>
                        </p>
                        <div className="mt-8 links">
                            <Link to="/draw">Start Drawing</Link>
                            <Link to="/learn">Learn More</Link>
                        </div>
                    </div>
                    <div className="md:col-6">
                        <div className="images">
                            <div>
                                <img src={srcSampleImg1} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg2} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg3} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg4} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg5} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg6} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg6} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg3} alt="" />
                            </div>
                            <div>
                                <img src={srcSampleImg1} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
