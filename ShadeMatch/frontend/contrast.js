function adjustContrast(imageData, contrast) {
    const data = imageData.data;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;     // Red
        data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
        data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue
    }
    return imageData;
}

function autoAdjustContrast(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let totalBrightness = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        const brightness = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        totalBrightness += brightness;
    }
    const avgBrightness = totalBrightness / (imageData.data.length / 4);

    let contrastLevel = 0;
    if (avgBrightness > 180) {
        contrastLevel = -50;
    } else if (avgBrightness < 75) {
        contrastLevel = 50;
    }

    if (contrastLevel !== 0) {
        const adjustedImageData = adjustContrast(imageData, contrastLevel);
        ctx.putImageData(adjustedImageData, 0, 0);
    }
}
