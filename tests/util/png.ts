import sharp from "sharp";

/**
 * Options for scaling an image
 */
interface ScaleImageOptions {
  /** The path to the input image file */
  inputPath: string;
  /** The path where the scaled image will be saved */
  outputPath: string;
  /** The scaling factor to apply ('half' or 'double') */
  scale: "half" | "double" | "same";
}

/**
 * Reads an image file, scales it according to the specified scale, and saves it to the output path.
 * Note: This function requires the 'sharp' library to be installed.
 * Run: npm install sharp
 *
 * @param options - The options object containing inputPath, outputPath, and scale
 * @returns Promise that resolves when the operation is complete
 */
export async function scaleImage(options: ScaleImageOptions): Promise<void> {
  const { inputPath, outputPath, scale } = options;

  // Get the image metadata to determine original dimensions
  const metadata = await sharp(inputPath).metadata();

  // Calculate scaling factor based on the scale option
  const scaleFactor = scale === "double" ? 2 : scale === "same" ? 1 : 0.5;

  // Scale the image according to the specified scale
  await sharp(inputPath)
    .resize({
      width: Math.round(metadata.width * scaleFactor),
      height: Math.round(metadata.height * scaleFactor),
      fit: "fill",
      kernel: "nearest",
    })
    .toFile(outputPath);

  console.log(
    `Successfully scaled image from ${inputPath} to ${outputPath} (scale: ${scale})`,
  );
}
