"use client";

import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sendVote } from "@/app/actions/send-vote";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

interface IColor {
    id: string;
    value: string[];
    count: number;
}

interface IColorProps {
    data: IColor[];
    ethPrice: string;
}

const Colors = ({ data, ethPrice }: IColorProps) => {
    const { data: hash, sendTransaction } = useSendTransaction();

    const router = useRouter();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const [colorId, setColorId] = useState<string>("");

    const handleVote = (id: string) => {
        setColorId(id);

        sendTransaction({
            to: "0x85C75c50E101623478205E5B7E38e79e982ad6e8",
            value: parseEther(ethPrice),
        });
    };

    useEffect(() => {
        if (isConfirming) {
            toast("Waiting for confirmation...", {
                position: "bottom-right",
                theme: "dark",
                transition: Bounce,
            });
        }
        if (isConfirmed) {
            sendVote({ id: colorId });
            router.refresh();

            toast("Transaction confirmed", {
                position: "bottom-right",
                theme: "dark",
                transition: Bounce,
            });
        }
    }, [isConfirming, isConfirmed, router, colorId]);

    return data.map((color, index) => (
        <div className="vote-card color-palette" key={index}>
            <div className="colors">
                {color.value.map((hex: string, index: number) => (
                    <div className="color" style={{ backgroundColor: hex }} key={index}></div>
                ))}
            </div>
            <div className="color-vote">
                <button className="vote-btn" onClick={() => handleVote(color.id)}>
                    Vote ({color.count})
                </button>
            </div>
        </div>
    ));
};

export default Colors;
