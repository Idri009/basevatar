"use client";

import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sendVote } from "@/app/actions/send-vote";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

interface ISubject {
    id: string;
    value: string[];
    count: number;
}

interface ISubjectProps {
    data: ISubject[];
    ethPrice: string;
}

const Subjects = ({ data, ethPrice }: ISubjectProps) => {
    const { data: hash, sendTransaction } = useSendTransaction();

    const [subjects, setSubjects] = useState<ISubject[]>(data);

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const [subjectId, setSubjectId] = useState<string>("");

    const handleVote = (id: string) => {
        setSubjectId(id);

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
            sendVote({ id: subjectId }).then((val) => {
                setSubjects((prev) =>
                    prev.map((subject) => {
                        if (subject.id === val.id) {
                            return {
                                ...subject,
                                count: val.count,
                            };
                        }
                        return subject;
                    })
                );
            });

            toast("Transaction confirmed", {
                position: "bottom-right",
                theme: "dark",
                transition: Bounce,
            });
        }
    }, [isConfirming, isConfirmed, subjectId]);

    return (
        <>
            {subjects.map((subject, index) => (
                <div className="vote-card subject" key={index}>
                    <div className="title">Theme: {subject.value[0]}</div>
                    <div className="subject-vote">
                        <button
                            className="vote-btn"
                            onClick={() => {
                                handleVote(subject.id);
                            }}
                        >
                            Vote ({subject.count})
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Subjects;
