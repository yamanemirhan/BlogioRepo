import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { RegisterRequest } from "@/types/auth";
import { authService } from "@/services/authService";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created") {
      try {
        const userData = evt.data as any;

        const registerRequest: RegisterRequest = {
          ClerkId: userData.id || "",
          Username:
            userData.username ||
            userData.first_name ||
            userData.email_addresses?.[0]?.email_address?.split("@")[0] ||
            "user",
          Email: userData.email_addresses?.[0]?.email_address || "",
        };

        const response = await authService.register(registerRequest);

        console.log("Webhook: isSuccess", response.isSuccess);
      } catch (error: any) {
        console.error(
          "Webhook: Backend error:",
          error.response?.data || error.message
        );
      }
    } else if (eventType === "user.updated") {
    } else if (eventType === "user.deleted") {
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
