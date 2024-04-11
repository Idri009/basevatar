import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function checkAdmin(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session || !session.address || session.address !== process.env.ADMIN_WALLET_ADDRESS) {
        return false;
    }
    return true;
}

export async function checkSession(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session?.address) {
        return false;
    }
    return true;
}

export async function getWalletAddress(): Promise<string> {
    const session = await getServerSession(authOptions);
    if (!session?.address) {
        throw new Error("Wallet address not found.");
    }
    return session?.address;
}
