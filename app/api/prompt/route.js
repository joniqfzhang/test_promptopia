import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Adding the revalidate = 0 to the route.js ensure that a layout or page is always redner dynamically?
export const revalidate = 0 ;

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 
