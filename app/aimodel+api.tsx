import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(request: Request) {
  const data = await request.json();
  console.log("data from request", data);

  try {
    let output = await replicate.run(data.data.aiModelName, {
      input: {
        prompt: data.data.inputPrompt
          ? data.data.inputPrompt
          : data.data.defaultPrompt,
        main_face_image: data.data.userImageUrl, // transfer, remove background, upscale
        image: data.data.userImageUrl, // remove background
        scale: 4, // upscale
      },
    });

    if (output === null) throw new Error("Error with image");

    if (!Array.isArray(output)) output = [output];

    const url = output[0].url();

    return Response.json({ url });
  } catch (error) {
    return Response.json({ Error: error });
  }
}
