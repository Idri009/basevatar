import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";
import { getUserImages } from "@basevatar/database";

const Page = async ({ params }: { params: Promise<{ walletId: string }> }) => {
    //
    const { walletId } = await params;

    const images = await getUserImages(walletId);

    return (
        <section className="section-user">
            <div className="container">
                <div className="heading">
                    <h1 className="title">User Images for</h1>
                    <p className="subtitle">
                        <span className="text-amber-500 break-words">{walletId}</span>
                    </p>
                </div>
            </div>
            {images?.length === 0 && (
                <div className="container">
                    <ServerErrorMessage message="No images found for this wallet address." />
                </div>
            )}

            {images && images.length > 0 && (
                <div className="container">
                    <div className="images">
                        {images.map((image) => (
                            <div key={image.id} className="card">
                                <img
                                    src={`https://${process.env.AWS_S3_URL}/${image.url}`}
                                    alt={`Image for ${walletId}`}
                                    width={200}
                                    height={200}
                                />
                                <div className="card-body">
                                    <h2 className="card-title">Day {image.day}</h2>
                                    <p className="card-text">
                                        {image.isSelected
                                            ? "Selected"
                                            : !image.isReviewed
                                            ? "Pending Review"
                                            : "Rejected"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Page;
