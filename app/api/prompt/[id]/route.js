// GET
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Reaponse('Prompt not found', { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch the prompt", { status: 500 });
    }
};

// PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const existPrompt = await Prompt.findById(params.id);
        if (!existPrompt) {
            return new Reaponse('Prompt not found', { status: 404 });
        }
        existPrompt.prompt = prompt;
        existPrompt.tag = tag;
        await existPrompt.save();
        return new Response(JSON.stringify(existPrompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to update prompt", { status: 500 });
    }
};

// DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        // Find the prompt by ID and remove it, below is author's code
        // await Prompt.findByIdAndRemove(params.id);
        return new Response('Prompt deleted successfully', { status: 2000 });
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
};