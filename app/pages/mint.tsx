import srcIntroImg1 from "../assets/img/intro-img-4.png";

const Mint = () => {
    return (
        <section className="section-mint">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={srcIntroImg1} alt="intro-img-1" className="rounded" />
                    </div>
                    <div className="col-6 mint">
                        <h3 className="mint-title">DAY #1: The Dinasour</h3>
                        <div className="color-palette">
                            <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                            <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                        </div>
                        <div className="contributors">
                            <div className="title">Contributors</div>
                            <p>
                                cryptomoogle.eth, deanharvey.eth, 0x4241…38a0, judebuffum.eth, olotus.eth,
                                bombadilus.eth, numo.eth, notoriousman.eth, trombopoline.eth, 0xbheem.eth, ...{" "}
                                <span className="text-amber-500">489 total artists</span>
                            </p>
                        </div>
                        <div className="countdown-timer">
                            <div className="countdown-item">
                                <div className="countdown-number">02</div>
                                <div className="countdown-text">Hours</div>
                            </div>
                            <div className="countdown-item">
                                <div className="countdown-number">23</div>
                                <div className="countdown-text">Minutes</div>
                            </div>
                            <div className="countdown-item">
                                <div className="countdown-number">52</div>
                                <div className="countdown-text">Seconds</div>
                            </div>
                        </div>
                        <div className="mint-button">
                            <button className="btn btn-primary">MINT</button>
                            <span>0.0026 ETH • 468 MINTED</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mint;
